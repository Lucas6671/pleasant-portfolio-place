import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, LogOut, Save } from "lucide-react";

interface UseCase {
  id: string;
  category: string;
  name: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  display_order: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cases, setCases] = useState<UseCase[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/auth");
        return;
      }
      const userId = sessionData.session.user.id;
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast.error("Acesso negado. Esta conta não é administradora.");
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }
      setIsAdmin(true);
      await loadCases();
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const loadCases = async () => {
    const { data, error } = await supabase
      .from("use_cases")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      toast.error("Erro ao carregar casos");
      return;
    }
    setCases(data ?? []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleAdd = async () => {
    const nextOrder = (cases[cases.length - 1]?.display_order ?? 0) + 1;
    const { error } = await supabase.from("use_cases").insert({
      category: "Nova categoria",
      name: "Novo caso de uso",
      description: "Descrição do caso de uso...",
      display_order: nextOrder,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Caso adicionado");
    loadCases();
  };

  const handleDelete = async (id: string, imageUrl: string | null) => {
    if (!confirm("Remover este caso de uso?")) return;
    if (imageUrl) {
      const path = imageUrl.split("/case-images/")[1];
      if (path) await supabase.storage.from("case-images").remove([path]);
    }
    const { error } = await supabase.from("use_cases").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Removido");
    loadCases();
  };

  const handleSave = async (uc: UseCase) => {
    setSavingId(uc.id);
    const { error } = await supabase
      .from("use_cases")
      .update({
        category: uc.category,
        name: uc.name,
        description: uc.description,
        image_alt: uc.image_alt,
        display_order: uc.display_order,
      })
      .eq("id", uc.id);
    setSavingId(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Salvo");
  };

  const handleUpload = async (uc: UseCase, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Arquivo precisa ser uma imagem");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem deve ter menos de 5MB");
      return;
    }
    setUploadingId(uc.id);
    try {
      const ext = file.name.split(".").pop();
      const path = `${uc.id}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("case-images")
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("case-images").getPublicUrl(path);

      // remove imagem antiga se existir
      if (uc.image_url) {
        const oldPath = uc.image_url.split("/case-images/")[1];
        if (oldPath && oldPath !== path) {
          await supabase.storage.from("case-images").remove([oldPath]);
        }
      }

      const { error: updErr } = await supabase
        .from("use_cases")
        .update({ image_url: pub.publicUrl })
        .eq("id", uc.id);
      if (updErr) throw updErr;

      toast.success("Imagem atualizada");
      loadCases();
    } catch (err: any) {
      toast.error(err.message ?? "Erro no upload");
    } finally {
      setUploadingId(null);
    }
  };

  const updateLocal = (id: string, patch: Partial<UseCase>) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Painel Administrativo
            </h1>
            <p className="text-sm text-muted-brand mt-1">
              Gerencie os casos de uso exibidos no site.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAdd} variant="default">
              <Plus className="h-4 w-4 mr-2" /> Novo
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cases.map((uc) => (
            <article
              key={uc.id}
              className="bg-surface border border-border/50 rounded-2xl overflow-hidden"
            >
              <div className="aspect-[16/9] relative bg-surface-2 group">
                {uc.image_url ? (
                  <img
                    src={uc.image_url}
                    alt={uc.image_alt ?? uc.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-faint text-sm">
                    Sem imagem
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  {uploadingId === uc.id ? (
                    <Loader2 className="h-6 w-6 animate-spin text-brand" />
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-medium text-brand">
                      <Upload className="h-4 w-4" /> Trocar imagem
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(uc, f);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Categoria</Label>
                    <Input
                      value={uc.category}
                      onChange={(e) => updateLocal(uc.id, { category: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Ordem</Label>
                    <Input
                      type="number"
                      value={uc.display_order}
                      onChange={(e) =>
                        updateLocal(uc.id, { display_order: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Nome</Label>
                  <Input
                    value={uc.name}
                    onChange={(e) => updateLocal(uc.id, { name: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Descrição</Label>
                  <Textarea
                    rows={3}
                    value={uc.description}
                    onChange={(e) => updateLocal(uc.id, { description: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Texto alternativo da imagem</Label>
                  <Input
                    value={uc.image_alt ?? ""}
                    onChange={(e) => updateLocal(uc.id, { image_alt: e.target.value })}
                    placeholder="Descreva a imagem para acessibilidade"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleSave(uc)}
                    disabled={savingId === uc.id}
                    className="flex-1"
                  >
                    {savingId === uc.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Salvar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(uc.id, uc.image_url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {cases.length === 0 && (
          <div className="text-center py-16 text-muted-brand">
            Nenhum caso de uso ainda. Clique em "Novo" para começar.
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
