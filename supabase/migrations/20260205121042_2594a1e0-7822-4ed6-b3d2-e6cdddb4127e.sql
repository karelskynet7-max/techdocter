-- Add tracking token column to repair_requests
ALTER TABLE public.repair_requests 
ADD COLUMN tracking_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex');

-- Update existing rows with tokens
UPDATE public.repair_requests 
SET tracking_token = encode(gen_random_bytes(16), 'hex') 
WHERE tracking_token IS NULL;

-- Make it NOT NULL after populating
ALTER TABLE public.repair_requests 
ALTER COLUMN tracking_token SET NOT NULL;

-- Create policy for public access to track their own request by token
CREATE POLICY "Anyone can view repair request by tracking token"
ON public.repair_requests
FOR SELECT
USING (true);

-- Drop the admin-only select policy since we need public access by token
DROP POLICY IF EXISTS "Admins can view all repair requests" ON public.repair_requests;

-- Recreate admin policy that still works
CREATE POLICY "Admins can view all repair requests"
ON public.repair_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));