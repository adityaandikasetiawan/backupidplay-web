'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: 'Apa itu idPlay?',
      answer:
        'idPlay adalah layanan internet Broadband berbasis Fiber Optik yang dirancang untuk memenuhi kebutuhan internet yang #CepatHematHebat dengan harga terjangkau'
    },
    {
      question: 'Apa Saja layanan idPlay',
      answer:
        'Terdapat 5 Layanan yang dimiliki idPlay, berupa Internet Broadband Home, Internet Broadband Bisnis, Internet Dedicated, Local Loop Innercity, Local Loop Intercity'
    },
    {
      question: 'Apa perbedaan idPlay home dan business?',
      answer:
        'idPlay Home adalah pilihan tepat untuk kebutuhan rumah tangga, menawarkan internet cepat dan stabil yang cocok untuk streaming, browsing, dan aktivitas online sehari-hari dengan harga lebih terjangkau. Sementara itu, idPlay Business dirancang khusus untuk kebutuhan bisnis dengan kecepatan lebih tinggi dan koneksi lebih stabil. Selain itu, tersedia juga layanan tambahan seperti IP statis, yang memastikan operasional bisnis berjalan lebih lancar dan profesional.'
    },
    {
      question: 'Apakah idPlay menyediakan paket internet unlimited?',
      answer:
        'Ya, idPlay menawarkan layanan internet dengan sistem True Unlimited, yang memungkinkan Anda menggunakan internet tanpa batas kuota.'
    },
    {
      question: 'Dimana saja jangkauan area idPlay?',
      answer:
        'idPlay kini hadir di Pulau Jawa, Kalimantan, dan Sulawesi. Kami akan terus memperluas jaringan layanan kami untuk memastikan bahwa setiap pelanggan dapat menikmati akses yang lebih luas dan lebih baik'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="basis-1/2">
            <h2 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-6 text-gray-800">
              Butuh Bantuan?
            </h2>
            <p className="text-sm lg:text-base">
              Tenang, tim kami selalu siap bantu! Tinggal masukin email kamu, dan dapatkan konsultasi gratis bareng  idPlay
            </p>
            <div className="relative mt-6 w-full">
              <Input
                className="w-full rounded-full px-4 py-5 lg:p-7 text-black placeholder:text-black text-sm lg:text-lg"
                placeholder="Masukkan E-mail Anda"
              />
              <Button
                onClick={() => {
                  const emailInput = (document.querySelector<HTMLInputElement>("input[placeholder='Masukkan E-mail Anda']"));
                  if (emailInput?.value) {
                    window.location.href = `mailto:cx.ays@supercorridor.co.id?subject=Konsultasi%20Gratis&body=Email%20saya:%20${emailInput.value}`;
                  }
                }}
                className="absolute top-1/2 -translate-y-1/2 right-2 lg:right-3 text-sm lg:text-base rounded-full bg-[#00a63e] text-white hover:bg-[#00a63e]/60 h-auto py-1 lg:py-2"
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="basis-1/2">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 lg:mb-12 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="w-full">
              <div className="">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 border border-orange-300 rounded-xl"
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      <span className="text-sm lg:text-lg font-semibold text-gray-800">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-orange-500 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden px-4 transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-700 text-xs lg:text-sm pb-4">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
