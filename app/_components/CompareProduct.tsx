'use client';

import { Box } from "lucide-react";
import { useRouter } from "next/navigation";

const CompareProduct = () => {
  const router = useRouter();

  return (
    <section className="w-full pt-6 sm:pt-8 md:pt-14 text-black">
      <div className="container mx-auto">
        <div className="mb-4 sm:mb-6">
          <div className="relative text-center">
            <h3 className="text-xl lg:text-3xl md:text-4xl md:leading-[181%] tracking-[-4%] font-semibold">
              Masih belum yakin?
            </h3>
            <p className="text-sm lg:text-base mt-2">
              Apa yang Membuat IDPlay Unggul? Cari Tahu Di Sini.
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="relative flex gap-2 overflow-x-scroll">
          {/* Header */}
          <div className="flex-1 grid grid-rows-10 min-w-max">
            <div className="row-span-3 px-2 py-2 flex items-center justify-center">
              <p className="font-bold text-sm sm:text-base">
                Product comparison
              </p>
            </div>
            <div className="px-2 py-2">Teknologi</div>
            <div className="px-2 py-2">Download vs Upload</div>
            <div className="px-2 py-2">FUP</div>
            <div className="px-2 py-2">Harga Paket</div>
            <div className="px-2 py-2"></div>
          </div>

          {/* IDPlay */}
          <div className="grid grid-rows-10 lg:basis-1/4 bg-orange-100">
            <div className="row-span-3 flex items-center flex-col justify-center px-2">
              <Box className="w-6 h-6" />
              <h3 className="text-sm sm:text-base font-bold mt-1">idPlay</h3>
            </div>
            <div className="px-2 py-2 text-center font-medium">100% FTTH</div>
            <div className="px-2 py-2 flex justify-center items-center">1:1</div>
            <div className="px-2 py-2 flex justify-center items-center">Tanpa Batas</div>
            <div className="px-2 py-2 flex justify-center items-center whitespace-nowrap min-w-[120px]">
              Mulai dari 179rb
            </div>
            <div className="px-2 py-2 flex justify-center items-center">
              <button
                onClick={() => router.push('/entri-prospek')}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-full transition-colors"
              >
                Pilih Paket
              </button>
            </div>
          </div>

          {/* Si Merah */}
          <div className="grid grid-rows-10 lg:basis-1/4">
            <div className="row-span-3 flex items-center flex-col justify-center px-2">
              <Box className="w-6 h-6" />
              <h3 className="text-sm sm:text-base font-bold mt-1">Si Merah</h3>
            </div>
            <div className="px-2 py-2 text-center font-medium">100% FTTH</div>
            <div className="px-2 py-2 flex justify-center items-center">1:3</div>
            <div className="px-2 py-2 flex justify-center items-center">Ada Batasan</div>
            <div className="px-2 py-2 flex justify-center items-center whitespace-nowrap min-w-[120px]">
              Mulai dari 309rb
            </div>
            <div className="px-2 py-2"></div>
          </div>

          {/* Si Ungu */}
          <div className="grid grid-rows-10 lg:basis-1/4">
            <div className="row-span-3 flex items-center flex-col justify-center px-2">
              <Box className="w-6 h-6" />
              <h3 className="text-sm sm:text-base font-bold mt-1">Si Ungu</h3>
            </div>
            <div className="px-2 py-2 text-center font-medium">100% FTTH</div>
            <div className="px-2 py-2 flex justify-center items-center">1:1 dan 2:1</div>
            <div className="px-2 py-2 flex justify-center items-center">Tanpa batas</div>
            <div className="px-2 py-2 flex justify-center items-center whitespace-nowrap min-w-[120px]">
              Mulai dari 260rb
            </div>
            <div className="px-2 py-2"></div>
          </div>

          {/* Si Oranye */}
          <div className="grid grid-rows-10 lg:basis-1/4">
            <div className="row-span-3 flex items-center flex-col justify-center px-2">
              <Box className="w-6 h-6" />
              <h3 className="text-sm sm:text-base font-bold mt-1">Si Oranye</h3>
            </div>
            <div className="px-2 py-2 text-center font-medium whitespace-nowrap">
              Sebagian menggunakan HFC
            </div>
            <div className="px-2 py-2 flex justify-center items-center whitespace-nowrap min-w-[120px]">
              FTTH 1:1 dan HFC 1:1
            </div>
            <div className="px-2 py-2 flex justify-center items-center">Ada batasan</div>
            <div className="px-2 py-2 flex justify-center items-center whitespace-nowrap min-w-[120px]">
              Mulai dari 250rb
            </div>
            <div className="px-2 py-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareProduct;
