import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface QuizQuestion {
  id: number;
  question: string;
  icon: React.ReactNode;
  options: string[];
}

interface QuizAnswers {
  [questionId: number]: string;
}

interface IProps {
  setShowBanner: (show: boolean) => void;
  startedQuiz: boolean;
  setStartedQuiz: (started: boolean) => void;
  currentQuizQuestion: number;
  setCurrentQuizQuestion: (question: number) => void;
  quizAnswers: QuizAnswers;
  setQuizAnswers: (answers: QuizAnswers | ((prev: QuizAnswers) => QuizAnswers)) => void;
  showQuizResult: boolean;
  setShowQuizResult: (show: boolean) => void;
  quizQuestions: QuizQuestion[];
  setActiveTab: (tab: 'kenalan' | 'kecepatan' | 'default') => void;
  handleQuizAnswer: (answer: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetQuiz: () => void;
  getRecommendedSpeed: () => { speed: string; price: string; description: string };
}

const KecepatanBanner = ({
  setShowBanner,
  startedQuiz,
  setStartedQuiz,
  currentQuizQuestion,
  setCurrentQuizQuestion,
  quizAnswers,
  setQuizAnswers,
  showQuizResult,
  setShowQuizResult,
  quizQuestions,
  setActiveTab,
  handleQuizAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  resetQuiz,
  getRecommendedSpeed
}: IProps) => {
  const router = useRouter();
  return (
    <>
      {!startedQuiz && (
        <div className="bg-gradient-to-b from-[#B0DEC8] to-[#00934C] relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
          <div className="relative flex justify-start z-10 h-full">
            <div className="flex items-center justify-start px-4 lg:px-6 lg:basis-2/3 py-6 lg:py-24 text-left h-full">
              <div>
                <h3 className="text-lg lg:text-4xl lg:leading-[59px] tracking-[3%] font-bold text-white">
                  Kecepatan Internet Mana yang Cocok untuk kamu?
                </h3>
                <p className="text-sm lg:text-3xl mt-5 text-white font-extralight lg:leading-[59px] lg:tracking-[3%]">
                  Yuk isi sebentar,<br/> nanti kita kasih rekomendasi<br />paket internet terbaik buat kamu <br />
                </p>
                <p className="text-xs font-light mt-4 text-white">
                  Ketersediaan terbatas di area tertentu.
                </p>
                <Button
                  className="bg-white text-green-700 hover:bg-green-100 mt-4 "
                  onClick={() => setStartedQuiz(true)}
                >
                  Ikuti Kuisnya!
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
            <Image
              src="/imgs/house.png"
              width={764}
              height={764}
              alt=" "
              className="max-w-[250px] lg:max-w-[764px] h-auto object-contain transform scale-x-[-1]"
            />
          </div>
        </div>
      )}

      {startedQuiz && (
        <div className="bg-[#B0DEC8] relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
          <div className="bg-[#B0DEC8] relative rounded-2xl overflow-hidden shadow-2xl h-[350px] lg:h-[700px]">
            <div className="relative grid grid-cols-1 lg:grid-cols-3 lg:items-center gap-4 lg:gap-8 z-10 h-full">
              {currentQuizQuestion > 0 && !showQuizResult && (
                <button
                  className="absolute left-6 lg:left-6 top-4 lg:top-6 cursor-pointer z-20"
                  onClick={goToPreviousQuestion}
                >
                  <ChevronLeft className="w-8 h-8 lg:w-12 lg:h-12 text-green-700" />
                </button>
              )}
              <button
                className="absolute right-6 lg:right-6 top-4 lg:top-6 cursor-pointer z-20"
                onClick={() => {
                  setActiveTab('default');
                  setStartedQuiz(false);
                  setCurrentQuizQuestion(0);
                  setQuizAnswers({});
                  setShowQuizResult(false);
                  resetQuiz();
                }}
              >
                <X className="w-8 h-8 lg:w-12 lg:h-12 text-green-700" />
              </button>

              {!showQuizResult && (
                <>
                  <div className="row-start-2 col-start-1 lg:col-span-2 lg:row-start-1 lg:col-start-1 space-y-6 px-4 lg:px-[100px] py-4 lg:py-24">
                    <div className="mb-2 lg:mb-8">
                      <div
                        className="grid gap-2 mb-4"
                        style={{
                          gridTemplateColumns: `repeat(${quizQuestions.length}, 1fr)`
                        }}
                      >
                        {quizQuestions.map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              'h-2 flex-1 rounded',
                              index <= currentQuizQuestion ? 'bg-green-600' : 'bg-white/50'
                            )}
                          />
                        ))}
                      </div>
                      <h3 className="text-base lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-green-700">
                        Pertanyaan {currentQuizQuestion + 1}/5
                      </h3>
                    </div>

                    {/* Question */}
                    <div className="space-y-2 lg:space-y-6">
                      <p className="text-sm lg:text-2xl leading-relaxed text-black font-medium">
                        {quizQuestions[currentQuizQuestion].question}
                      </p>

                      {/* Answer options */}
                      <div className="grid grid-cols-3 gap-4">
                        {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            className={cn(
                              'w-full px-2 lg:px-6 py-1 lg:py-3 rounded-xl lg:rounded-full border-2 text-left text-[10px] lg:text-sm transition-all cursor-pointer',
                              quizAnswers[quizQuestions[currentQuizQuestion].id] === option
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-black border-white hover:border-green-600'
                            )}
                            onClick={() => {
                              handleQuizAnswer(option);
                              goToNextQuestion();
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Icon */}
                  <div className="row-start-1 col-start-1 lg:row-start-1 lg:col-start-3 relative z-10 h-full flex justify-center items-center px-4 lg:px-[100px] py-4 lg:py-24">
                    <div className="flex justify-center items-center">
                      {quizQuestions[currentQuizQuestion].icon}
                    </div>
                  </div>
                </>
              )}

              {/* Quiz Result */}
              {showQuizResult && (
                <div className="row-start-2 col-start-1 lg:row-start-1 lg:col-span-2 lg:col-start-1 space-y-6 px-4 lg:px-[100px] py-4 lg:py-24">
                  {/* Header with rocket icon */}
                  <div className="mb-3 lg:mb-8">
                    <div className="flex items-center gap-3 mb-1 lg:mb-4">
                      <div className="text-lg lg:text-4xl">🚀</div>
                      <h3 className="text-base lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-green-800">
                        Hasil Anda Sudah Siap!
                      </h3>
                    </div>
                    <p className="text-sm lg:text-lg text-gray-700 font-medium">
                      Berdasarkan hasil kuis tersebut, kami sarankan:
                    </p>
                  </div>

                  {/* Recommendation description */}
                  <div className="text-left space-y-4 lg:space-y-6">
                    <p className="text-sm lg:text-lg leading-relaxed text-gray-700">
                      {getRecommendedSpeed().description}
                    </p>

                    {/* Package recommendation */}
                    <div className="bg-green-800 rounded-xl p-4 text-white flex items-start justify-between">
                      <div>
                        <div className="text-sm lg:text-4xl font-bold mb-2">
                          {getRecommendedSpeed().speed}
                        </div>
                        <div className="text-sm lg:text-xl font-medium">
                          {getRecommendedSpeed().price}
                        </div>
                      </div>
                      <button
                        className="text-white font-medium transition-colors text-sm lg:text-base flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push('/entri-prospek')}
                      >
                        Langsung Berlangganan
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KecepatanBanner;
