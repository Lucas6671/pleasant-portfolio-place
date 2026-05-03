-- Helper: is a given storage object path referenced by a use_cases row?
CREATE OR REPLACE FUNCTION public.is_approved_case_image(_path text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.use_cases
    WHERE image_url IS NOT NULL
      AND (
        image_url = _path
        OR image_url LIKE '%/case-images/' || _path
        OR image_url LIKE '%/case-images/' || _path || '?%'
      )
  )
$$;

REVOKE EXECUTE ON FUNCTION public.is_approved_case_image(text) FROM PUBLIC, anon;

-- Replace the loose public read policy with an approval-gated one
DROP POLICY IF EXISTS "Public can read case images by path" ON storage.objects;

CREATE POLICY "Public can read approved case images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'case-images'
    AND (
      public.is_approved_case_image(name)
      OR public.has_role(auth.uid(), 'admin'::app_role)
    )
  );