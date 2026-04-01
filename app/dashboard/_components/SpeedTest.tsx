// Komponen SpeedTest untuk mengukur kecepatan internet user
import { useState } from 'react';

// Interface data dashboard customer
interface CustomerDashboardData {
  ID: number;
  Task_ID: string;
  Customer_Name: string;
  Product_Code: string;
  Product_Name: string;
  Status: string;
  Bill_Status: string;
  Notification_Message: string;
  Due_Date: string;
  Inv_Date: string;
  Total_Payment: number;
  AR_Remain: number;
  AR_Paid: number;
  Period: string;
  Points: number;
  GB_in: number;
}

// Props untuk komponen SpeedTest
interface IProps {
  customerDashboard: CustomerDashboardData | null;
}

// Komponen utama SpeedTest
const SpeedTest = ({ customerDashboard }: IProps) => {
  // State untuk hasil speed test dan status loading
  const [speedTestResult, setSpeedTestResult] = useState<number | null>(null);
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);

  // Fungsi untuk menjalankan speed test
  const runSpeedTest = async () => {
    setIsSpeedTesting(true);
    setSpeedTestResult(null);

    try {
      // Array file test dengan berbagai ukuran (KB) untuk akurasi pengukuran
      const testFiles = [
        { size: 100, url: '/api/speed-test?size=100' },
        { size: 300, url: '/api/speed-test?size=300' },
        { size: 500, url: '/api/speed-test?size=500' },
        { size: 1000, url: '/api/speed-test?size=1000' },
        { size: 2000, url: '/api/speed-test?size=2000' }
      ];

      // Array untuk menyimpan hasil kecepatan dari setiap percobaan
      const results: number[] = [];

      // Loop untuk melakukan download file test dan mengukur kecepatan
      for (const testFile of testFiles) {
        const startTime = performance.now();

        try {
          // Tambahkan parameter acak untuk mencegah cache
          const cacheBuster = `&t=${Date.now()}&r=${Math.random()}`;
          const response = await fetch(testFile.url + cacheBuster, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0'
            }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Download file test
          await response.blob();

          const endTime = performance.now();
          const duration = (endTime - startTime) / 1000; // Konversi ke detik
          const sizeInBits = testFile.size * 1024 * 8; // Konversi KB ke bit
          const speedMbps = sizeInBits / duration / (1024 * 1024); // Konversi ke Mbps
          console.log(
            `SpeedTest: size=${testFile.size}KB, duration=${duration}s, speed=${speedMbps}Mbps`
          );

          // Hanya simpan hasil jika durasi dan speed masuk akal
          if (duration > 0.01) {
            // Minimal 10ms
            if (speedMbps > 0.1 && speedMbps < 1000) {
              results.push(speedMbps);
            }
          }
        } catch (error) {
          // Log error jika gagal download
          console.error(`Error testing file ${testFile.size}KB:`, error);
        }
      }

      if (results.length > 0) {
        // Hilangkan outlier (20% teratas dan terbawah) untuk akurasi
        const sortedResults = results.sort((a, b) => a - b);
        const trimmedResults = sortedResults.slice(
          Math.floor(sortedResults.length * 0.2),
          Math.ceil(sortedResults.length * 0.8)
        );

        // Hitung rata-rata dari hasil yang sudah difilter
        const averageSpeed =
          trimmedResults.length > 0
            ? trimmedResults.reduce((sum, speed) => sum + speed, 0) / trimmedResults.length
            : sortedResults.reduce((sum, speed) => sum + speed, 0) / sortedResults.length;

        // Bulatkan ke 1 desimal
        console.log('SpeedTest: Final average speed', averageSpeed);
        setSpeedTestResult(Math.round(averageSpeed * 10) / 10);
      } else {
        // Fallback: coba download file kecil jika semua gagal
        try {
          const startTime = performance.now();
          const cacheBuster = `&t=${Date.now()}&r=${Math.random()}`;
          const response = await fetch('/api/speed-test?size=100' + cacheBuster, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0'
            }
          });
          if (response.ok) {
            await response.blob();
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            if (duration > 0.1) {
              const sizeInBits = 100 * 1024 * 8;
              const speedMbps = sizeInBits / duration / (1024 * 1024);
              setSpeedTestResult(Math.round(speedMbps * 10) / 10);
              return;
            }
          }
        } catch (err) {
          // abaikan error
        }
        // Jika tetap gagal, tampilkan pesan error
        setSpeedTestResult(0);
      }
    } catch (error) {
      console.error('Speed test error:', error);
      setSpeedTestResult(0);
    } finally {
      setIsSpeedTesting(false);
    }
  };

  // Render UI komponen SpeedTest
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg text-center">
      <h3 className="text-lg font-semibold mb-2">Cek Kecepatan Internet</h3>
      <div className="mx-auto my-4 h-28 w-28 rounded-full border-8 border-emerald-200 flex items-center justify-center">
        {isSpeedTesting ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
        ) : (
          <span className="text-xl font-bold text-emerald-700">
            {speedTestResult !== null ? `${speedTestResult} Mbps` : '--'}
          </span>
        )}
      </div>
      <button
        className={`mt-2 px-4 py-2 rounded-full transition-colors ${
          isSpeedTesting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
        onClick={runSpeedTest}
        disabled={isSpeedTesting}
      >
        {isSpeedTesting ? 'Testing...' : 'Speed Test'}
      </button>
      {speedTestResult !== null && !isSpeedTesting && (
        <p className="text-sm text-gray-500 mt-2">
          {speedTestResult === 0
            ? 'Test gagal. Silakan coba lagi.'
            : `Kecepatan aktual: ${speedTestResult} Mbps`}
        </p>
      )}
    </div>
  );
};

export default SpeedTest;
