import Image from 'next/image';

export default function KeunggulanKamiSection() {
  return (
    <section className="w-full py-8 bg-white mt-10 md:mt-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-xl lg:text-4xl font-bold text-center mb-2 text-green-700">Kenapa Pilih Kami?</h2>
          <p className="text-center text-gray-500 text-base lg:text-lg mb-6">Ini dia alasan kenapa layanan internet kami pas banget buat kamu :</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-start">
          <div className="flex flex-col items-center">
            <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <Image
                src="/category/5g.svg"
                alt="5G"
                width={60}
                height={60}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Koneksi Super Cepat dan Stabil</h3>
            <p className="text-center text-gray-700 text-base">Streaming, download, kerja, dan main game jadi lancar tanpa buffering. Internet yang siap nemenin kamu kapan pun, di mana pun!</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <Image
                src="/category/Keamanan.svg"
                alt="Keamanan"
                width={60}
                height={60}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Keamanan Paling Top, Anti Ribet!</h3>
            <p className="text-center text-gray-700 text-base">Data dan aktivitas online kamu aman 24/7 dengan proteksi canggih. Jadi kamu bisa browsing, belanja, dan bersosial media tanpa khawatir diganggu.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <Image
                src="/category/Router.svg"
                alt="Router"
                width={60}
                height={60}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Layanan Support Cepat & Ramah</h3>
            <p className="text-center text-gray-700 text-base">Kalau ada masalah? CS 24/7 siap bantu dengan cepat dan ramah supaya kamu tetap nyaman</p>
          </div>
        </div>
      </div>
    </section>
  );
}
