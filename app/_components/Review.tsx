const Review = () => {
  return (
    <section className="flex items-center justify-center w-full py-5 px-11 bg-orange-500 max-w-[2552px] mx-auto mt-10">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative text-[96px]">
          10 <div className="absolute top-4 -right-2 text-[30px]">+</div>
        </div>
        <p className="text-[30px] leading-[104%]">
          Years of <br /> Experience
        </p>
      </div>
      <div className="w-px h-[85px] bg-white mx-4"></div>
      <div className="flex items-center gap-6 flex-1">
        <div className="relative text-[96px]">
          1K <div className="absolute top-4 -right-4 text-[30px]">+</div>
        </div>
        <p className="text-[30px] leading-[104%]">
          Coverage <br /> Area
        </p>
      </div>
      <div className="w-px h-[85px] bg-white mx-4"></div>
      <div className="flex items-center gap-6 flex-1">
        <div className="relative text-[96px]">
          8K <div className="absolute top-4 -right-4 text-[30px]">+</div>
        </div>
        <p className="text-[30px] leading-[104%]">
          Happy <br /> Customers
        </p>
      </div>
      <div className="w-px h-[85px] bg-white mx-4"></div>

      <div className="flex items-center gap-6 flex-1">
        <div className="relative text-[96px]">4.2/5</div>
        <p className="text-[30px] leading-[104%]">
          Overall <br /> Rating
        </p>
      </div>
    </section>
  );
};

export default Review;
