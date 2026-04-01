import Image from 'next/image';
import Link from 'next/link';

export default function DiscoverSection() {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="relative rounded-3xl overflow-hidden w-full max-w-[1400px] h-[500px] md:h-[600px] flex items-center justify-center">
        <Image
          src="/icons/subs-2.jpg"
          alt="Explore More with IDPlay"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-xl md:text-3xl mb-6 drop-shadow-lg">Explore More with IDPlay</h2>
          <Link href="/entri-prospek">
            <button className="bg-white text-gray-900 text-xs md:text-sm px-6 md:px-8 py-2 md:py-3 rounded-xl shadow hover:bg-gray-100 transition">
              Cek Coverage Sekarang
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}