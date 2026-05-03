-- 1. Enum de papéis
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Tabela de papéis de usuário
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Função security definer para checar papéis (evita recursão de RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Policies para user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Tabela use_cases
CREATE TABLE public.use_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  image_alt TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.use_cases ENABLE ROW LEVEL SECURITY;

-- Visível para todos (página pública)
CREATE POLICY "Anyone can view use cases"
  ON public.use_cases FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert use cases"
  ON public.use_cases FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update use cases"
  ON public.use_cases FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete use cases"
  ON public.use_cases FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_use_cases_updated_at
  BEFORE UPDATE ON public.use_cases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Bucket público para imagens
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-images', 'case-images', true);

-- Storage policies
CREATE POLICY "Anyone can view case images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'case-images');

CREATE POLICY "Admins can upload case images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'case-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'case-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'case-images' AND public.has_role(auth.uid(), 'admin'));

-- 8. Seed dos casos de uso atuais
INSERT INTO public.use_cases (category, name, description, display_order) VALUES
  ('Site + SEO', 'Clínica de saúde', 'Site institucional com blog, agendamento online e SEO local pode gerar até +180% de visitas orgânicas em 3 meses.', 1),
  ('Automação + Chatbot', 'Imobiliária', 'Atendimento automatizado via WhatsApp com agente de IA que qualifica leads e agenda visitas — economizando até 4h por dia da equipe.', 2),
  ('Conteúdo + Imagens IA', 'Loja de artesanato', 'Estratégia de conteúdo completa: posts, stories e imagens de produtos gerados com IA podem dobrar engajamento em 45 dias.', 3);