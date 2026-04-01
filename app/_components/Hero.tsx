'use client';
import { Gamepad, Gauge, Info, Laptop, Monitor, Phone, Router, Smartphone } from 'lucide-react';
import { FaWrench } from 'react-icons/fa';
import { MdFamilyRestroom, MdSpeed } from 'react-icons/md';
import BannerModal from './BannerModal';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FaHouseSignal } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import DefaultBanner from './Banner/default';
import KenalanBanner from './Banner/kenalan';
import KecepatanBanner from './Banner/kecepatan';

interface Question {
  id: string;
  question: React.ReactNode;
  answer: string;
  category: 'intro' | 'technology' | 'gaming' | 'family' | 'home' | 'easy-setup';
  icon: (className?: string) => React.ReactNode;
}

const questions: Question[] = [
  {
    id: '1',
    question: (
      <>
        <span className="text-orange-800">idPlay itu UNLIMITED</span>
      </>
    ),
    answer:
      'tanpa FUP, gak pakai basa-basi, jadi kamu bisa streaming, gaming, download sepuasmu sampai komputermu penuh.',
    category: 'intro',
    icon: (className?: string) => <Router className={cn(className)} />
  },
  {
    id: '2',
    question: (
      <>
        <span className="text-orange-800">idPlay itu 100% Fiber Optik</span>
      </>
    ),
    answer:
      'dari server sampai rumah kamu, makanya layanan idPlay stabil dan super kenceng.',
    category: 'technology',
    icon: (className?: string) => <Gauge className={cn(className)} />
  },
  {
    id: '3',
    question: (
      <>
        <span className="text-orange-800">idPlay itu Jujur</span>
      </>
    ),
    answer:
      'kita kasih kejutan pakai promo dan hadiah, bukan pakai tagihan cilukba. Dompet kamu aman dan tentram deh kalau bareng idPlay.',
    category: 'gaming',
    icon: (className?: string) => <Gamepad className={cn(className)} />
  },
  {
    id: '4',
    question: (
      <>
        <span className="text-orange-800">idPlay itu Komitmen Harga</span>
      </>
    ),
    answer:
      'jadi kamu bisa langganan tanpa perlu khawatir harga naik, gak bakal ada kenaikan Harga tanpa kenaikan layanan',
    category: 'family',
    icon: (className?: string) => <MdFamilyRestroom className={cn(className)} />
  },
  {
    id: '5',
    question: (
      <>
        <span className="text-orange-800">idPlay itu Prioritasin Kamu</span>
      </>
    ),
    answer:
      '24/7 pasti ada yang respon kalau kamu ngalamin gangguan, kontak tim Customer Experience kita terbuka lewat mana aja.',
    category: 'home',
    icon: (className?: string) => <FaHouseSignal className={cn(className)} />
  },
  {
    id: '6',
    question: (
      <>
        <span className="text-orange-800">idPlay itu Simpel dan Sat-set</span> adalah Koneksi cepat, setup gampang
      </>
    ),
    answer:
      'cukup daftar, survei lokasi, bayar, udah deh, langsung dipasang. Kamu langsung bebas nikmatin hiburan digital favoritmu.',
    category: 'easy-setup',
    icon: (className?: string) => <FaWrench className={cn(className)} />
  }
] as const;

interface QuizQuestion {
  id: number;
  question: string;
  icon: React.ReactNode;
  options: string[];
}

interface QuizAnswers {
  [questionId: number]: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Biasanya ada berapa orang di rumah yang sering pakai internet?',
    icon: <MdFamilyRestroom className="w-10 lg:w-40 h-10 lg:h-40 text-green-600" />,
    options: ['1-5', '5-10', '10+']
  },
  {
    id: 2,
    question: 'Biasanya perangkat apa aja sih yang nyambung ke WiFi di rumah? (HP, laptop, Smart TV, dll)',
    icon: (
      <div className="flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
        <Monitor className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        <div className="flex items-center justify-center gap-4 lg:gap-6">
          <Smartphone className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
          <Gamepad className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        </div>
      </div>
    ),
    options: ['2 Handphone, 1 Laptop, atau Keduanya', 'Lebih dari 2 Hp, lebih dari 1 Laptop, dan SmartTv', 'Lebih dari 2 Hp, Lebih dari 1 Laptop, SmartTv, CCTV, Smart Doorbell']
  },
  {
    id: 3,
    question:
      'Perangkat apa saja yang biasa dipakai buat streaming (YouTube, Netflix, musik, atau video HD)?',
    icon: (
      <div className="flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
        <Laptop className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        <Phone className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        <Monitor className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
      </div>
    ),
    options: [
      'Hp dan Tablet saja',
      'Hp, Tablet dan SmartTv',
      'Hp, Tablet dan SmartTv 4K'
    ]
  },
  {
    id: 4,
    question: 'Seberapa gamer kamu di rumah?',
    icon: <Gamepad className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />,
    options: ['Nggak main sama sekali!', 'Main kadang-kadang aja', 'Setiap hari!']
  },
  {
    id: 5,
    question:
      'Internet di rumah sering dipakai buat kerja online atau sekolah daring nggak?',
    icon: <Monitor className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />,
    options: [
      'Jarang banget, hanya sesekali',
      'Kadang dipakai buat rapat atau tugas online',
      'Hampir setiap hari dipakai full buat kerja atau belajar online'
    ]
  }
];

const HeroSection = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<'kenalan' | 'kecepatan' | 'default'>('default');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [startedQuiz, setStartedQuiz] = useState(false);

  const navigate = useRouter();

  // Quiz states
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Quiz functions
  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [quizQuestions[currentQuizQuestion].id]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion((prev) => prev + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers({});
    setShowQuizResult(false);
  };

  const getRecommendedSpeed = (): { speed: string; price: string; description: string } => {
    const answers = Object.values(quizAnswers);
    let score = 0;

    // Jika tidak ada jawaban, kembalikan paket default
    if (answers.length === 0) {
      return {
        speed: '20 Mbps',
        price: '', // Placeholder
        description: 'Paket hemat untuk kebutuhan internet sehari-hari. Cocok untuk browsing, streaming HD, dan video call.'
      };
    }

    answers.forEach((answer, index) => {
      const question = quizQuestions[index];
      switch (question.id) {
        case 1: // Jumlah orang
          if (answer === '1-5') score += 1;
          else if (answer === '5-10') score += 2;
          else if (answer === '10+') score += 3;
          break;
        case 2: // Jumlah perangkat
          if (answer === '2 Handphone, 1 Laptop, atau Keduanya') score += 1;
          else if (answer === 'Lebih dari 2 Hp, lebih dari 1 Laptop, dan SmartTv') score += 2;
          else if (answer === 'Lebih dari 2 Hp, Lebih dari 1 Laptop, SmartTv, CCTV, Smart Doorbell') score += 3;
          break;
        case 3: // Aktivitas streaming
          if (answer === 'Hp dan Tablet saja') score += 1;
          else if (answer === 'Hp, Tablet dan SmartTv') score += 2;
          else if (answer === 'Hp, Tablet dan SmartTv 4K') score += 3;
          break;
        case 4: // Gaming
          if (answer === 'Nggak main sama sekali!') score += 1;
          else if (answer === 'Main kadang-kadang aja') score += 2;
          else if (answer === 'Setiap hari!') score += 3;
          break;
        case 5: // Kerja/belajar
          if (answer === 'Jarang banget, hanya sesekali') score += 1;
          else if (answer === 'Kadang dipakai buat rapat atau tugas online') score += 2;
          else if (answer === 'Hampir setiap hari dipakai full buat kerja atau belajar online') score += 3;
          break;
        default:
          break;
      }
    });

    // Berdasarkan total score (min: 5, max: 15)
    if (score === 5) {
      return {
        speed: '20 Mbps',
        price: '', // Placeholder
        description: 'Paket hemat untuk kebutuhan internet sehari-hari. Cocok untuk browsing, streaming HD, dan video call.'
      };
    } else if (score >= 6 && score <= 8) {
      return {
        speed: '50 Mbps',
        price: '', // Placeholder
        description: 'Paket hemat untuk kebutuhan internet sehari-hari dengan performa lebih baik. Cocok untuk browsing, streaming HD, dan video call dengan beberapa perangkat.'
      };
    } else if (score >= 9 && score <= 10) {
      return {
        speed: '75 Mbps',
        price: '', // Placeholder
        description: 'Paket ideal untuk keluarga dengan aktivitas digital ringan hingga menengah. Mendukung streaming HD, video call, dan penggunaan beberapa perangkat dengan stabil.'
      };
    } else if (score >= 11 && score <= 13) {
      return {
        speed: '100 Mbps',
        price: '', // Placeholder
        description: 'Paket ideal untuk keluarga dengan aktivitas digital ringan hingga menengah. Mendukung streaming HD, video call, dan penggunaan beberapa perangkat dengan stabil.'
      };
    } else if (score >= 14) {
      return {
        speed: '200 Mbps',
        price: '', // Placeholder
        description: 'Paket unggulan untuk kebutuhan internet berat. Cocok untuk streaming 4K, gaming online, dan kerja dari rumah dengan banyak perangkat tanpa buffering.'
      };
    }

    // Default case
    return {
      speed: '20 Mbps',
      price: '',
      description: 'Paket hemat untuk kebutuhan internet sehari-hari. Cocok untuk browsing, streaming HD, dan video call.'
    };
  };

  return (
    <>
      <BannerModal
        open={showBanner}
        onOpenChange={setShowBanner}
      />
      <section className="relative container mx-auto lg:pt-14">
        {activeTab === 'default' && <DefaultBanner setShowBanner={setShowBanner} />}

        {activeTab === 'kenalan' && (
          <KenalanBanner
            setShowBanner={setShowBanner}
            questions={questions}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'kecepatan' && (
          <KecepatanBanner
            setShowBanner={setShowBanner}
            startedQuiz={startedQuiz}
            setStartedQuiz={setStartedQuiz}
            currentQuizQuestion={currentQuizQuestion}
            setCurrentQuizQuestion={setCurrentQuizQuestion}
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            showQuizResult={showQuizResult}
            setShowQuizResult={setShowQuizResult}
            quizQuestions={quizQuestions}
            setActiveTab={setActiveTab}
            handleQuizAnswer={handleQuizAnswer}
            goToNextQuestion={goToNextQuestion}
            goToPreviousQuestion={goToPreviousQuestion}
            resetQuiz={resetQuiz}
            getRecommendedSpeed={getRecommendedSpeed}
          />
        )}

        {/* Bottom notification bars */}
        <div className="absolute top-full left-3 lg:left-5 lg:right-auto right-3 flex items-center gap-1 z-20">
          <button
            className={cn(
              'bg-orange-500 text-white pl-3 lg:pl-5 pr-10 lg:pr-14 py-2 rounded-b-lg flex items-center gap-2 cursor-pointer',
              activeTab === 'kenalan' && 'bg-[#FFCDB0]'
            )}
            style={{
              clipPath: 'polygon(0 0, 100% 0%, 94% 100%, 0% 100%)'
            }}
            onClick={() => {
              setActiveTab('kenalan');
              setShowBanner(false);
            }}
          >
            <Info className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-xs lg:text-sm font-medium text-left">
              Yuk, kenalan sama IDPlay!
            </span>
          </button>
          <button
            className={cn(
              'bg-green-600 text-white pl-3 lg:pl-5 pr-10 lg:pr-14 py-2 rounded-b-lg lg:ml-auto flex items-center gap-2 cursor-pointer',
              activeTab === 'kecepatan' && 'bg-[#B0DEC8]'
            )}
            style={{
              clipPath: 'polygon(0 0, 100% 0%, 94% 100%, 0% 100%)'
            }}
            onClick={() => {
              setActiveTab('kecepatan');
              setShowBanner(false);
            }}
          >
            <MdSpeed className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-xs lg:text-sm font-medium text-left">
              Kecepatan mana yang cocok untukmu?
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;