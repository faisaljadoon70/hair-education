import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Brand {
  id: string;
  name: string;
  country_of_origin: string;
  color_system: {
    levels: number[];
    mixing_ratio: string;
    special_instructions?: string;
  };
}

interface BrandSelectorProps {
  onBrandSelect: (brand: Brand) => void;
}

interface GroupedBrands {
  [key: string]: Brand[];
}

export default function BrandSelector({ onBrandSelect }: BrandSelectorProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [groupedBrands, setGroupedBrands] = useState<GroupedBrands>({});
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Group brands by region
  const getRegion = (country: string): string => {
    const southAsia = ['Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'Nepal'];
    const middleEast = ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Lebanon'];
    
    if (southAsia.includes(country)) return 'South Asia';
    if (middleEast.includes(country)) return 'Middle East';
    return 'International';
  };

  useEffect(() => {
    async function loadBrands() {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .order('name');

        if (error) throw error;

        setBrands(data || []);

        // Group brands by region
        const grouped = (data || []).reduce((acc: GroupedBrands, brand: Brand) => {
          const region = getRegion(brand.country_of_origin);
          if (!acc[region]) acc[region] = [];
          acc[region].push(brand);
          return acc;
        }, {});

        setGroupedBrands(grouped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load brands');
      } finally {
        setLoading(false);
      }
    }

    loadBrands();
  }, []);

  const handleBrandChange = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    if (brand) {
      setSelectedBrand(brand);
      onBrandSelect(brand);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading brands: {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Hair Color Brand
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
        onChange={(e) => handleBrandChange(e.target.value)}
        value={selectedBrand?.id || ''}
      >
        <option value="">Choose a brand...</option>
        {Object.entries(groupedBrands).map(([region, regionBrands]) => (
          <optgroup key={region} label={region}>
            {regionBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name} ({brand.country_of_origin})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      
      {selectedBrand && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h4 className="font-medium text-gray-900">{selectedBrand.name}</h4>
          <p className="text-sm text-gray-600 mt-1">
            Country: {selectedBrand.country_of_origin}
          </p>
          <p className="text-sm text-gray-600">
            Color System: {selectedBrand.color_system.levels.length} levels
          </p>
          <p className="text-sm text-gray-600">
            Mixing Ratio: {selectedBrand.color_system.mixing_ratio}
          </p>
          {selectedBrand.color_system.special_instructions && (
            <p className="text-sm text-gray-600 mt-2 p-2 bg-yellow-50 rounded border border-yellow-100">
              Special Instructions: {selectedBrand.color_system.special_instructions}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
