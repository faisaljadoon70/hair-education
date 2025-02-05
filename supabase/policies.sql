-- Enable RLS
ALTER TABLE hair_levels ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view hair levels"
ON hair_levels FOR SELECT
TO public
USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage hair levels"
ON hair_levels FOR ALL
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
