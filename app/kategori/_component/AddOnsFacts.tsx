import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AddOnsFacts: React.FC = () => {
  const navigate = useRouter();

  return (
    <section className="relative container md:mt-14 mx-auto w-full ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-0">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Banner Section */}
            <div className="relative w-full h-[260px]">
              <Image
                src="/category/addons.svg"
                alt="Add-ons Banner"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>
            {/* Facts Section */}
            <div className="p-6">
              <h2 className="text-orange-500 text-2xl font-bold mb-2">
                Layanan Jangkauan Wi-Fi Ekstra dari IDPlay
              </h2>
              <p className="text-gray-700 text-base mb-2">
                Nikmati jangkauan Wi-Fi menyeluruh di seluruh rumah tanpa area sinyal lemah senilai
                hingga <span className="text-green-700 font-semibold">Rp1.800.000 per tahun</span>.
              </p>
              <ul className="mb-6 space-y-3">
                {[1, 2, 3].map((_, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    <Check
                      size={20}
                      strokeWidth={3}
                    />
                    <span className="text-gray-700 text-base ml-2">
                      Terintegrasi sempurna dengan IDPlay Wi-Fi Gateway Anda.
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <span className="text-orange-500 text-2xl font-bold">Rp150.000</span>
                <span className="text-orange-500 font-medium">/bulan</span>
              </div>
              <button
                onClick={() => {
                  navigate.push('/entri-prospek');
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span>Subscribe Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddOnsFacts;
