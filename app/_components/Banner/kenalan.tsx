import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  question: React.ReactNode;
  answer: string;
  category: 'intro' | 'technology' | 'gaming' | 'family' | 'home' | 'easy-setup';
  icon: (className?: string) => React.ReactNode;
}

interface IProps {
  setShowBanner: (show: boolean) => void;
  questions: Question[];
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question | null) => void;
  setActiveTab: (tab: 'kenalan' | 'kecepatan' | 'default') => void;
}

const KenalanBanner = ({
  setShowBanner,
  questions,
  selectedQuestion,
  setSelectedQuestion,
  setActiveTab
}: IProps) => {
  const navigate = useRouter();
  return (
    <div className="bg-[#FFCDB0] relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
      <div className="bg-[#FFCDB0] relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
        <div className="grid grid-cols-2 items-center gap-2 lg:gap-8 relative z-10 h-full">
          <button
            className="absolute right-6 lg:right-6 top-6 lg:top-6 cursor-pointer z-20"
            onClick={() => {
              setSelectedQuestion(null);
              setActiveTab('default');
            }}
          >
            <X className="w-8 lg:w-12 h-8 lg:h-12 text-orange-500" />
          </button>
          
          {/* Left side for interactive elements */}
          <div className="col-span-1 relative z-10 h-full flex justify-center items-center px-2 lg:px-8 py-4 lg:py-14">
            <div className="flex flex-col justify-center items-center gap-1 lg:gap-2">
              <p className="text-center text-xs lg:text-lg font-semibold">Klik untuk melihat jawaban</p>
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                {questions.map((e) => (
                  <button
                    key={e.id}
                    className={cn(
                      'relative aspect-square flex items-center justify-center p-2 lg:p-3.5 rounded-lg w-12 lg:w-32 h-12 lg:h-32 cursor-pointer',
                      selectedQuestion?.id === e.id
                        ? 'bg-orange-500 text-orange-800'
                        : 'bg-white text-orange-500'
                    )}
                    onClick={() => setSelectedQuestion(e)}
                  >
                    {e.icon('w-full h-full')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side for content */}
          <div className="col-span-1 space-y-2 lg:space-y-6 px-2 lg:px-8 py-4 lg:py-14">
            {!selectedQuestion && (
              <div className="">
                <h4 className="text-2xl lg:text-[90px] lg:leading-[141%] tracking-[-3%] font-bold text-orange-500">
                  Apa itu
                </h4>
                <div className="flex items-center gap-1 lg:gap-2 mt-2 lg:mt-0">
                  <Image
                    src="/imgs/logo-idplay.png"
                    width={221}
                    height={76}
                    alt="IDPlay Logo"
                    className="w-[100px] h-[31px] lg:w-[221px] lg:h-[76px] object-contain"
                  />
                  <h3 className="text-2xl lg:text-[76px] lg:leading-[59px] tracking-[-3%] font-bold text-orange-500">
                    ?
                  </h3>
                </div>
                <p className="font-light mt-2 lg:mt-5 text-xs lg:text-base">Klik ikon untuk info lebih lanjut.</p>
              </div>
            )}
            {selectedQuestion && (
              <div className="space-y-1 lg:space-y-5">
                {/* <h4 className="text-sm lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-orange-500">
                  Apa itu <span className="text-orange-800">idPlay?</span>
                </h4> */}
                <h4 className="text-s lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-orange-500">
                  {selectedQuestion?.question}
                </h4>
                <div>
                  <p className="text-xs lg:text-lg leading-[141%] tracking-[-4%]">
                    {selectedQuestion?.answer}
                  </p>
                  {/* {selectedQuestion?.category === 'technology' && (
                    <p className="text-[8px] lg:text-xs leading-normal text-black font-extralight mt-2 lg:mt-4">
                      ⓘ Tersedia di area tertentu. Bergantung pada cakupan jaringan. Kecepatan dapat
                      bervariasi dan tidak dijamin. Kecepatan maksimum per perangkat kabel hingga
                      4,7 Gbps.
                    </p>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      {!selectedQuestion && (
        <div className="absolute bottom-0 right-0 w-full h-full lg:h-auto z-0">
          {/* Grid pattern */}
          <Image
            src="/imgs/pertanyaan-background-hero.svg"
            width={1000}
            height={1000}
            alt=" "
            className="w-full h-full lg:h-auto opacity-30 lg:opacity-55 object-cover lg:object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default KenalanBanner;
