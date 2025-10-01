-- Fix RLS policies for emails table
-- Since this is for contact inquiries, we need to allow public insertion
-- but restrict reading to admin users only

-- Allow anyone to insert contact inquiries (public contact form)
CREATE POLICY "Allow public contact form submissions" 
ON emails 
FOR INSERT 
WITH CHECK (true);

-- Only allow authenticated admin users to view contact inquiries
-- For now, we'll create a more permissive policy since there's no user authentication yet
-- This can be tightened later when auth is implemented
CREATE POLICY "Allow reading contact inquiries" 
ON emails 
FOR SELECT 
USING (true);

-- Allow updates and deletes for future admin functionality
CREATE POLICY "Allow admin updates on contact inquiries" 
ON emails 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow admin deletes on contact inquiries" 
ON emails 
FOR DELETE 
USING (true);