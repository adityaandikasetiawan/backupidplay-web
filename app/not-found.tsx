import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="justify-center px-4 py-16 font-sans">
      <div className="w-full max-w-screen-xl mx-auto flex flex-row items-center max-[1152px]:flex-col-reverse">
        
        {/* Content Section */}
        <div className="flex-1">
          <p className="text-2xl font-semibold mb-3">
            404 Not Found
          </p>
          <h1 className="text-6xl font-semibold text-gray-900 mb-4 max-[540px]:text-4xl">
            Page not found
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-[540px]:text-sm max-[540px]:mb-8">
            Sorry, the page you are looking for doesn't exist. Here are some helpful links:
          </p>
          
          <div className="flex flex-row gap-3 max-[540px]:flex-col">
            <div className="flex-initial max-[540px]:flex-auto">
              <Button size="lg" asChild className="px-8 py-3 bg-green-600 text-white font-medium">
                <Link href="/">
                  Go Back to Home
                </Link>
              </Button>
            </div>
            <div className="flex-initial max-[540px]:flex-auto">
              <Button size="lg" asChild className="px-8 py-3 bg-orange-600  text-white font-medium">
                <Link href="/kategori">
                  Explore Package
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-initial w-full max-w-[640px] ml-4 max-[1152px]:mb-4 max-[1152px]:ml-0">
          <div className="relative w-full pb-[66.66%] overflow-hidden rounded-lg">
            <Image
              src="/not-found.svg"
              alt="Page not found"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}