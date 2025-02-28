-- Update mobile shade card data for levels 4-8 to match web interface colors
-- This ensures consistency between mobile and web views

-- Level 4
DELETE FROM mobile_shade_card WHERE level = 4;
INSERT INTO mobile_shade_card (
    id, level, primary_tone, name, description, hex_color, 
    rgb_r, rgb_g, rgb_b, series, gray_coverage, lifting_power,
    undertone, is_high_lift, base_color, developer, 
    color_ratio, developer_ratio, processing_time_min, processing_time_max
) VALUES
    ('4.0', 4, 0, 'Natural Medium Brown', 'Pure medium brown', '#3C3C3C',
    60, 60, 60, 'natural', 100, 0, 'Natural', false, '4/0',
    ARRAY[20], 1.0, 1.5, 35, 45),
    -- ... rest of Level 4 values

-- Level 5
DELETE FROM mobile_shade_card WHERE level = 5;
INSERT INTO mobile_shade_card (
    id, level, primary_tone, name, description, hex_color, 
    rgb_r, rgb_g, rgb_b, series, gray_coverage, lifting_power,
    undertone, is_high_lift, base_color, developer, 
    color_ratio, developer_ratio, processing_time_min, processing_time_max
) VALUES
    ('5.0', 5, 0, 'Natural Light Brown', 'Pure light brown', '#4B4B4B',
    75, 75, 75, 'natural', 100, 0, 'Natural', false, '5/0',
    ARRAY[20], 1.0, 1.5, 35, 45),
    -- ... rest of Level 5 values

-- Level 6
DELETE FROM mobile_shade_card WHERE level = 6;
INSERT INTO mobile_shade_card (
    id, level, primary_tone, name, description, hex_color, 
    rgb_r, rgb_g, rgb_b, series, gray_coverage, lifting_power,
    undertone, is_high_lift, base_color, developer, 
    color_ratio, developer_ratio, processing_time_min, processing_time_max
) VALUES
    ('6.0', 6, 0, 'Natural Dark Blonde', 'Pure dark blonde', '#5A5A5A',
    90, 90, 90, 'natural', 100, 0, 'Natural', false, '6/0',
    ARRAY[20], 1.0, 1.5, 35, 45),
    -- ... rest of Level 6 values

-- Level 7
DELETE FROM mobile_shade_card WHERE level = 7;
INSERT INTO mobile_shade_card (
    id, level, primary_tone, name, description, hex_color, 
    rgb_r, rgb_g, rgb_b, series, gray_coverage, lifting_power,
    undertone, is_high_lift, base_color, developer, 
    color_ratio, developer_ratio, processing_time_min, processing_time_max
) VALUES
    ('7.0', 7, 0, 'Natural Medium Blonde', 'Pure medium blonde', '#696969',
    105, 105, 105, 'natural', 100, 0, 'Natural', false, '7/0',
    ARRAY[20], 1.0, 1.5, 35, 45),
    -- ... rest of Level 7 values

-- Level 8
DELETE FROM mobile_shade_card WHERE level = 8;
INSERT INTO mobile_shade_card (
    id, level, primary_tone, name, description, hex_color, 
    rgb_r, rgb_g, rgb_b, series, gray_coverage, lifting_power,
    undertone, is_high_lift, base_color, developer, 
    color_ratio, developer_ratio, processing_time_min, processing_time_max
) VALUES
    ('8.0', 8, 0, 'Natural Light Blonde', 'Pure light blonde', '#787878',
    120, 120, 120, 'natural', 100, 0, 'Natural', false, '8/0',
    ARRAY[20], 1.0, 1.5, 35, 45);
    -- ... rest of Level 8 values
