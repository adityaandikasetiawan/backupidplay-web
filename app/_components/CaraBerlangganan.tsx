import React from 'react';
import Image from 'next/image';

const CaraBerlangganan: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-500">Cara Berlangganan</h2>
        <div className="flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            <Image
              src="/robot-idplay.gif"
              alt="Robot IdPlay"
              width={384}
              height={384}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaraBerlangganan;