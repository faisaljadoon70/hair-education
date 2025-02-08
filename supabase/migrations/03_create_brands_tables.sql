-- Create enum for product types
CREATE TYPE product_type AS ENUM ('permanent', 'semi-permanent', 'demi-permanent', 'temporary');

-- Create brands table
CREATE TABLE brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    country_of_origin TEXT,
    website TEXT,
    logo_url TEXT,
    color_system JSONB, -- Stores level system, mixing rules
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID REFERENCES brands(id),
    name TEXT NOT NULL,
    type product_type NOT NULL,
    levels INTEGER[], -- Array of available levels
    base_color TEXT,
    undertone TEXT,
    mixing_ratio TEXT,
    processing_time JSONB, -- min and max times
    developer_volumes INTEGER[],
    instructions TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert common South Asian brands
INSERT INTO brands (name, country_of_origin, color_system) VALUES
-- Pakistan
('Sabs Professional', 'Pakistan', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5"}'),
('Keune', 'Netherlands', '{"levels": [1,2,3,4,5,6,7,8,9,10,11,12], "mixing_ratio": "1:1"}'),
('Nova Professional', 'Pakistan', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1"}'),

-- India
('Streax Professional', 'India', '{"levels": [1,2,3,4,5,6,7,8,9], "mixing_ratio": "1:1"}'),
('Godrej Professional', 'India', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5"}'),
('Matrix India', 'India', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1"}'),

-- Bangladesh
('Apex Professional', 'Bangladesh', '{"levels": [1,2,3,4,5,6,7,8,9], "mixing_ratio": "1:1"}'),
('JCI Professional', 'Bangladesh', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5"}'),

-- Middle East
('Nazih Professional', 'Lebanon', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5", "special_instructions": "Suitable for resistant hair"}'),
('Beautyline Professional', 'UAE', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1", "special_instructions": "Enhanced with argan oil"}'),
('Al Jamila Professional', 'Saudi Arabia', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5", "special_instructions": "Contains desert herb extracts"}'),
('Rahua Beauty', 'UAE', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1", "special_instructions": "Natural ingredients"}'),
('Kashkha Beauty', 'Kuwait', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5", "special_instructions": "Specialized for Middle Eastern hair types"}'),

-- International brands popular in South Asia and Middle East
('L''Oréal Professionnel', 'France', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1.5"}'),
('Wella Professional', 'Germany', '{"levels": [1,2,3,4,5,6,7,8,9,10], "mixing_ratio": "1:1"}');

-- Add RLS Policies
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Everyone can read brands and products
CREATE POLICY "Everyone can read brands" ON brands
    FOR SELECT USING (true);

CREATE POLICY "Everyone can read products" ON products
    FOR SELECT USING (true);

-- Only authenticated users can insert/update
CREATE POLICY "Authenticated users can insert brands" ON brands
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update brands" ON brands
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert products" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');
