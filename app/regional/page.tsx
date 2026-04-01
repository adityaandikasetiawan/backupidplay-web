'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RegionItem {
  documentId: string;
  region: string;
}

const RegionalPage = () => {
  const router = useRouter();
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [openLetter, setOpenLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/cms/regionals');
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          const uniqueRegions = data.data.map((item: { documentId: string; region: string }) => ({
            documentId: item.documentId,
            region: item.region,
          }));
          setRegions(uniqueRegions);
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const toggleLetter = (letter: string) => {
    setOpenLetter(openLetter === letter ? null : letter);
  };

  const handleRegionSelect = (region: string) => {
    router.push(`/regional/${encodeURIComponent(region)}`);
  };

  const getUniqueLetters = (): string[] => {
    const letters = regions.map(item => item.region.charAt(0).toUpperCase());
    return [...new Set(letters)].sort();
  };

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen space-y-8"> {/* Gap konsisten antar section */}
      {/* Header Section */}
      <div className="relative container mx-auto pt-14">
        <Link href="/entri-prospek" className="block cursor-pointer">
          <Image
            src="/category/67.png"
            width={1000}
            height={400}
            alt="Kategori Rumah"
            className="w-full h-auto object-cover rounded-2xl hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Region Selection Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Pilih Daerah Lokasimu</h2>
        <div className="space-y-4">
          {getUniqueLetters().map((letter) => (
            <div key={letter} className="border-b py-2">
              <button
                onClick={() => toggleLetter(letter)}
                className="w-full text-left text-lg font-medium flex justify-between items-center"
              >
                <span>{letter}</span>
                <span className={`transition-transform ${openLetter === letter ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {openLetter === letter && (
                <div className="mt-2 p-2 bg-gray-50 rounded grid grid-cols-2 md:grid-cols-3 gap-2">
                  {regions
                    .filter((item) => item.region.charAt(0).toUpperCase() === letter)
                    .map((item) => (
                      <button
                        key={item.documentId}
                        onClick={() => handleRegionSelect(item.region)}
                        className="text-left py-2 px-4 bg-white text-gray-800 rounded hover:bg-gray-200 transition-colors"
                      >
                        {item.region}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionalPage;
