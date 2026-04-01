import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { extractSpeed, formatCurrency } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { useRouter } from 'next/navigation';

interface Product {
  ID: number;
  Product_Group: string;
  Product_Category: string;
  Product_Code: string;
  Product_Name: string;
  Region: string;
  Price: number;
}

interface IProps {
  products: Product[];
  note: string;
  setNote: (note: string) => void;
  onSubmit: () => void;
}

const ProductCarousel = ({ products, note, setNote, onSubmit }: IProps) => {
  const navigate = useRouter();
  return (
    <div className="space-y-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
        opts={{
          align: 'start',
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.ID}
              className="pl-2 md:pl-4 basis-full"
            >
              <div className="rounded-lg border border-slate-300 p-4 h-full">
                <p className="text-sm text-gray-500">
                  Kecepatan {extractSpeed(product.Product_Name)}
                </p>
                <p className="mt-2 text-2xl font-bold">{formatCurrency(product.Price)}</p>
                <p className="text-xs text-gray-500">{product.Product_Name}</p>
                <button
                  className="mt-3 w-full rounded bg-orange-500 px-3 py-2 text-white hover:bg-orange-600"
                  onClick={() => navigate.push('/entri-prospek')}
                >
                  Langganan Sekarang
                </button>
                <button className="mt-2 w-full rounded border border-slate-300 px-3 py-2 hover:bg-gray-50">
                  Hubungi Kami
                </button>
                <div className="mt-3 space-y-1 text-sm">
                  <p>FREE Biaya Pemasangan</p>
                  <p>Gratis Sewa Modem WIFI</p>
                  <p>Cocok untuk 10+ Perangkat</p>
                  <p className="text-xs text-gray-400">Region: {product.Region}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="mt-4">
        <textarea
          className="w-full p-2 border border-slate-300 rounded"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
