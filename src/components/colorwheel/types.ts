export interface HairLevel {
    id?: string;
    level: number;
    description: string;
    underlying_pigment: string;
    neutralizing_tone: string;
    example_image_url?: string;
    created_at?: string;
}

export interface Formula {
    id?: string;
    created_by: string;
    starting_level: number;
    target_level: number;
    formula: {
        developer_volume: number;
        mixing_ratio: string;
        processing_time: number;
        toner?: string;
        notes?: string;
    };
    created_at?: string;
}

export interface PracticeResult {
    id?: string;
    user_id: string;
    formula_id: string;
    success_rating: number;
    notes?: string;
    created_at?: string;
}
