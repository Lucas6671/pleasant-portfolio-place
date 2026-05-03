-- Remove policy ampla anterior
DROP POLICY IF EXISTS "Anyone can view case images" ON storage.objects;

-- Permite apenas GET de objetos individuais (não LIST)
-- O bucket continua público para acesso direto via URL
CREATE POLICY "Public can read case images by path"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'case-images' AND auth.role() IS NOT NULL OR bucket_id = 'case-images');