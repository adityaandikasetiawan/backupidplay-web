import React from 'react';
import Image from 'next/image';

const KeunggulanLayanan: React.FC = () => {
  const services = [
    {
      icon: '/speed-burst.png',
      title: 'Speed Burst',
      description: 'Pengalaman streaming dan gaming super lancar tanpa buffering dengan koneksi cepat dan stabil',
    },
    {
      icon: '/true-unlimited.png',
      title: 'True Unlimited',
      description: 'Tanpa batasan kuota, bebas browsing, streaming, dan gaming sepuasnya tanpa khawatir kuota habis',
    },
    {
      icon: '/support-24.png',
      title: 'Support 24/7',
      description: 'Hadir dengan layanan customer service 24/7 yang responsif untuk pengalaman tanpa hambatan',
    },
    {
      icon: '/fiber-optic.png',
      title: '100% Fiber Optic',
      description: 'Koneksi 100% fiber optic sampai rumah, bikin internet super cepat, super stabil, dan tahan cuaca ekstrem',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-orange-500">Kenapa Memilih IdPlay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-stretch">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full"
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 pb-6">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">{service.description}</p>
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-teal-600 transition-colors">
                Beli Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeunggulanLayanan;