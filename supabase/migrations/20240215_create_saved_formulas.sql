-- Create saved_formulas table
CREATE TABLE saved_formulas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    name TEXT NOT NULL,
    starting_level DECIMAL(3,1) NOT NULL,
    target_level DECIMAL(3,1) NOT NULL,
    developer_volume INTEGER NOT NULL,
    processing_time INTEGER NOT NULL,
    mixing_ratio TEXT NOT NULL,
    is_custom BOOLEAN DEFAULT false,
    original_formula_id UUID REFERENCES saved_formulas(id),
    custom_developer_volume INTEGER,
    custom_processing_time INTEGER,
    custom_mixing_ratio TEXT,
    custom_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    subscription_tier TEXT DEFAULT 'basic'
);

-- Add RLS policies
ALTER TABLE saved_formulas ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read only their own formulas
CREATE POLICY "Users can view own formulas" ON saved_formulas
    FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to insert their own formulas
CREATE POLICY "Users can create own formulas" ON saved_formulas
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own formulas
CREATE POLICY "Users can update own formulas" ON saved_formulas
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own formulas
CREATE POLICY "Users can delete own formulas" ON saved_formulas
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_saved_formulas_updated_at
    BEFORE UPDATE ON saved_formulas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
