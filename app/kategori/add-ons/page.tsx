import { notFound } from 'next/navigation';
export default function Page() {
  notFound();
}

// Commented for now
// 'use client';

// import Image from 'next/image';
// import CompareProduct from '../../_components/CompareProduct';
// import AddOnsFacts from '../_component/AddOnsFacts';
// import FAQ from '@/app/_components/FAQ';

// export default function KategoriAddons() {
//   return (
//     <div className="min-h-screen font-sans bg-white">
//       {/* Banner/Card Section for Addons */}
//       <div className="relative container mx-auto lg:pt-14">
//         <Image
//           src="/category/hero-addons.svg"
//           width={1000}
//           height={1000}
//           alt="Kategori Addons"
//           className="w-full h-auto object-contain"
//         />
//       </div>

//       {/* Keunggulan Section */}
//       <section className="w-full py-8 bg-white mt-10 md:mt-14">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col items-center mb-8">
//             <h2 className="text-xl lg:text-4xl font-bold text-center mb-2 text-green-700">Keunggulan Kami</h2>
//             <p className="text-center text-gray-500 text-base lg:text-lg mb-6">Mengapa memilih layanan kami? Berikut keunggulan utama yang kami tawarkan.</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-start">
//             <div className="flex flex-col items-center">
//               <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
//                 <Image
//                   src="/category/5g.svg"
//                   alt="5G"
//                   width={60}
//                   height={60}
//                   className="w-16 h-16"
//                 />
//               </div>
//               <h3 className="text-lg font-bold text-center mb-2">Koneksi Full 5G</h3>
//               <p className="text-center text-gray-700 text-base">Akses Internet dengan koneksi Full 5G untuk pengalaman internet tanpa hambatan.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
//                 <Image
//                   src="/category/Keamanan.svg"
//                   alt="Keamanan"
//                   width={60}
//                   height={60}
//                   className="w-16 h-16"
//                 />
//               </div>
//               <h3 className="text-lg font-bold text-center mb-2">Keamanan Terjamin</h3>
//               <p className="text-center text-gray-700 text-base">Internet aman dengan enkripsi canggih dan proteksi real-time.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <div className="bg-[#00934c] rounded-full w-24 h-24 flex items-center justify-center mb-4">
//                 <Image
//                   src="/category/Router.svg"
//                   alt="Router"
//                   width={60}
//                   height={60}
//                   className="w-16 h-16"
//                 />
//               </div>
//               <h3 className="text-lg font-bold text-center mb-2">Wifi Super Cepat</h3>
//               <p className="text-center text-gray-700 text-base">Streaming, Gaming, dan Kerja tanpa Hambatan.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Broadband Facts Cards */}
//       <AddOnsFacts />

//       {/* Compare Product Section */}
//       <CompareProduct />
      
//       {/* FAQ Section */}
//       <FAQ />
      
//     </div>
//   );
// }
