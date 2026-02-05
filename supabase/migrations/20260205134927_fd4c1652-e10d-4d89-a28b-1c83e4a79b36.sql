-- Fix #1: PUBLIC_DATA_EXPOSURE - Create secure RPC function for tracking lookup
-- This prevents exposing all customer data by requiring a valid tracking token

CREATE OR REPLACE FUNCTION public.get_repair_by_token(token TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  device_type TEXT,
  problem TEXT,
  status TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
AS $$
  SELECT id, name, device_type, problem, status, notes, created_at, updated_at
  FROM repair_requests
  WHERE tracking_token = token
  LIMIT 1;
$$;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view repair request by tracking token" ON repair_requests;

-- Fix #2: INPUT_VALIDATION - Create secure RPC function for submitting repair requests with validation
CREATE OR REPLACE FUNCTION public.submit_repair_request(
  p_name TEXT,
  p_device_type TEXT,
  p_problem TEXT,
  p_contact_method TEXT,
  p_contact TEXT
)
RETURNS TEXT
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_tracking_token TEXT;
BEGIN
  -- Validate name
  IF p_name IS NULL OR LENGTH(TRIM(p_name)) < 2 THEN
    RAISE EXCEPTION 'Name must be at least 2 characters';
  END IF;
  IF LENGTH(p_name) > 100 THEN
    RAISE EXCEPTION 'Name must be less than 100 characters';
  END IF;
  
  -- Validate device type
  IF p_device_type IS NULL OR LENGTH(TRIM(p_device_type)) < 1 THEN
    RAISE EXCEPTION 'Device type is required';
  END IF;
  IF LENGTH(p_device_type) > 50 THEN
    RAISE EXCEPTION 'Device type must be less than 50 characters';
  END IF;
  
  -- Validate problem description
  IF p_problem IS NULL OR LENGTH(TRIM(p_problem)) < 10 THEN
    RAISE EXCEPTION 'Problem description must be at least 10 characters';
  END IF;
  IF LENGTH(p_problem) > 2000 THEN
    RAISE EXCEPTION 'Problem description must be less than 2000 characters';
  END IF;
  
  -- Validate contact method
  IF p_contact_method NOT IN ('whatsapp', 'email') THEN
    RAISE EXCEPTION 'Contact method must be whatsapp or email';
  END IF;
  
  -- Validate contact info
  IF p_contact IS NULL OR LENGTH(TRIM(p_contact)) < 5 THEN
    RAISE EXCEPTION 'Contact information must be at least 5 characters';
  END IF;
  IF LENGTH(p_contact) > 100 THEN
    RAISE EXCEPTION 'Contact information must be less than 100 characters';
  END IF;
  
  -- Email format validation
  IF p_contact_method = 'email' AND p_contact !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Phone format validation (basic - allows + and digits)
  IF p_contact_method = 'whatsapp' AND p_contact !~ '^\+?[0-9\s-]{8,}$' THEN
    RAISE EXCEPTION 'Invalid phone number format';
  END IF;
  
  -- Insert validated data
  INSERT INTO repair_requests (name, device_type, problem, contact_method, contact)
  VALUES (TRIM(p_name), TRIM(p_device_type), TRIM(p_problem), p_contact_method, TRIM(p_contact))
  RETURNING tracking_token INTO v_tracking_token;
  
  RETURN v_tracking_token;
END;
$$;

-- Drop the old INSERT policy and create a new one that denies direct inserts
-- (All inserts must go through the RPC function now)
DROP POLICY IF EXISTS "Anyone can submit repair requests" ON repair_requests;

-- Create a policy that only allows inserts through the security definer function
-- This effectively blocks direct inserts since regular users can't insert
CREATE POLICY "Only submit through RPC function" 
ON repair_requests 
FOR INSERT 
WITH CHECK (false);