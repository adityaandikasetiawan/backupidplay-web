import { Button } from '@/components/ui/button';
import { MapPin, Network, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPhone, FaInfinity } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { HiOutlineUser } from 'react-icons/hi';
import { GiNetworkBars } from 'react-icons/gi';

interface IProps {
  setShowBanner: (show: boolean) => void;
}

const DefaultBanner = ({ setShowBanner }: IProps) => {
  const navigate = useRouter();
  return (
    <div className="bg-gradient-to-r from-orange-200 via-orange-50 to-white relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
      <div className="bg-gradient-to-r from-orange-200 via-orange-50 to-white relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
        <div className="grid grid-cols-2 items-center gap-2 lg:gap-8 relative z-10 h-full">
          <div className="col-span-1 space-y-2 lg:space-y-6 px-2 lg:px-8 py-4 lg:py-14">
            <h1 className="text-lg md:text-2xl lg:text-[50px] lg:leading-[59px] tracking-[-3%] font-bold text-gray-900">
              <span className="text-orange-500">WiFi Andal,</span>
              <br />
              <span className="text-orange-500">Aktivitas Maksimal!</span>
            </h1>

            <h2 className="text-xs md:text-base lg:text-[38px] lg:leading-[59px] tracking-[-3%] text-gray-800 font-base">
              Dari urusan kantor 
              <br/> 
              sampai rebahan di rumah
              <br />
              semuanya lancar dengan internet ngebut
            </h2>
            <div className="flex flex-col gap-1 lg:gap-2 my-2 lg:my-6">
              <div className="flex items-center gap-1 lg:gap-2">
                {/* Kuota UNLIMITED */}
                <FaInfinity className="w-4 h-4 text-green-700" />
                <span className="text-green-700 font-semibold text-xs lg:text-base">
                  Kuota UNLIMITED
                </span>
              </div>
              <div className="flex items-center gap-1 lg:gap-2">
                {/* Stabil dengan 100% Fiber Optik */}
                <GiNetworkBars className="w-4 h-4 text-green-700" />
                <span className="text-green-700 font-semibold text-xs lg:text-base">
                  Stabil dengan 100% Fiber Optik
                </span>
              </div>
              <div className="flex items-center gap-1 lg:gap-2">
                {/* Customer Service 24/7 */}
                <HiOutlineUser className="w-4 h-4 text-green-700" />
                <span className="text-green-700 font-semibold text-xs lg:text-base">
                  Customer Service 24/7
                </span>
              </div>
            </div>
            <div>
              <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 mt-2 lg:mt-4">
                <Button
                  onClick={() => {
                    navigate.push('/entri-prospek');
                  }}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 border border-orange-500 text-white h-auto lg:h-9 px-2 lg:px-8 py-1 lg:py-3 font-medium transition-colors flex items-center justify-center gap-1 lg:gap-2 text-[10px] lg:text-base"
                >
                  <MdEmail className="w-2 h-2 lg:w-4 lg:h-4" />
                  Langganan Sekarang!
                </Button>
              </div>
            </div>
          </div>
          <div
            className="col-span-1 relative z-10 h-full flex items-end justify-end hover:scale-105 hover:drop-shadow-xl transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => setShowBanner(true)}
          >
            <div className="flex justify-center lg:justify-end items-end w-full h-full">
              <Image
                src="/imgs/hero.png"
                width={1000}
                height={500}
                alt="Happy people using internet"
                className="w-full h-auto object-contain max-h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full h-full lg:h-auto z-0">
        <Image
          src="/imgs/line-background-hero.svg"
          width={1000}
          height={1000}
          alt=" "
          className="w-full h-full lg:h-auto opacity-30 lg:opacity-55 object-cover lg:object-contain"
        />
      </div>
    </div>
  );
};

export default DefaultBanner;
