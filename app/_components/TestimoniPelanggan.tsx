'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { MdFormatQuote } from 'react-icons/md';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useTestimonials } from '@/hooks/useTestimoni';
import { type Testimonial } from '@/types/testimoni';
import LoadingSkeletonTestimoni from './loadingSkeletonTestimoni';

// Helper to get full image URL from relative path
const getCmsImageUrl = (url: string | undefined) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const cmsPublicBaseUrl = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.idplay.co.id';
  return `${cmsPublicBaseUrl}${url}`;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const renderStars = (rating: number) => {

    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating);
      const isHalfFilled = i === Math.floor(rating) && rating % 1 !== 0;

      if (isHalfFilled) {
        // Bintang setengah terisi menggunakan gradient
        return (
          <div key={i} className="inline-block w-4 h-4 relative">
            <Star className="absolute w-4 h-4 text-gray-400" />
            <Star
              className="absolute w-4 h-4 text-yellow-400 fill-yellow-400"
              style={{
                clipPath: 'polygon(0 0, 51% 0, 51% 100%, 0 100%)'
              }}
            />
          </div>
        );
      }

      return (
        <Star
          key={i}
          className={`inline-block w-4 h-4 ${isFilled
              ? 'text-yellow-400 fill-yellow-400' // Bintang kuning penuh
              : 'text-gray-400'                     // Bintang abu-abu outline
            }`}
        />
      );
    });
  };

  // Get avatar URL with fallback, thumbnail format for compressed size
  const rawAvatarUrl = testimonial.avatar?.url || testimonial.avatar?.formats?.thumbnail?.url;
  const avatarUrl = getCmsImageUrl(rawAvatarUrl);

  return (
    <div className="bg-white rounded-2xl p-6 w-[347px] mx-3 flex-shrink-0">
      <MdFormatQuote className="text-[#00934C] w-[35px] h-[35px] mb-2 rotate-180" />
      <p className="text-black font-semibold text-xl lg:text-2xl">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3 mt-3">
        <div className="w-11 lg:w-12 h-11 lg:h-12 rounded-full bg-gray-200 overflow-hidden">
          {avatarUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={avatarUrl}
                alt={testimonial.name}
                width={180}
                height={180}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => {
                  console.log(`Failed to load avatar for ${testimonial.name}`);
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[#00934C] text-white flex items-center justify-center font-semibold">
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
          <p className="text-gray-500 text-xs">{testimonial.job}</p>
          <div className="flex gap-1 mt-1">{renderStars(testimonial.rating)}</div>
        </div>
      </div>
    </div>
  );
};

const TestimoniPelanggan = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const { testimonials, loading, error } = useTestimonials();

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const startMarquee = async (fromX = 0) => {
    const containerWidth = marqueeRef.current?.scrollWidth ?? 0;
    const visibleWidth = marqueeRef.current?.clientWidth ?? 0;
    const toX = fromX - (containerWidth - visibleWidth) / 2;

    await controls.start({
      x: [fromX, toX],
      transition: {
        duration: 30,
        ease: 'linear',
        repeat: Infinity
      }
    });
  };

  useEffect(() => {
    startMarquee();
  }, []);

  useEffect(() => {
    if (!isDragging && testimonials.length > 0) {
      const currentX = x.get();
      startMarquee(currentX);
    }
  }, [isDragging, testimonials]);

  return (
    <section className="w-full py-14 text-black overflow-hidden">
      <div className="container mx-auto pl-10 lg:pl-0">
        <div className="mb-6 lg:mb-12">
          <div className="relative ">
            {/* <div className="absolute -left-5 -top-3 space-y-1">
              <Image
                src="/icons/arrow-testimonials-title.svg"
                alt=""
                width={26}
                height={26}
                className="rotate-45"
              />
              <Image
                src="/icons/arrow-testimonials-title.svg"
                alt=""
                width={26}
                height={26}
                className="-ml-2"
              />
            </div> */}
            <h3 className="text-xl md:text-4xl md:leading-[181%] tracking-[-4%] font-semibold">
              Pelanggan yang Puas <br /> Adalah Layanan Terbaik Kami.
            </h3>
          </div>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-6">
              {[...Array(6)].map((_, index) => (
                <LoadingSkeletonTestimoni key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-red-500">Error loading testimonials: {error}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex gap-6">
              {[...Array(6)].map((_, index) => (
                <LoadingSkeletonTestimoni key={index} />
              ))}
            </div>
          ) : (
            <motion.div
              ref={marqueeRef}
              className="flex"
              animate={controls}
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimoniPelanggan;
