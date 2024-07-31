import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideList } from "./SlideList";

const Slider = () => {
  return (
    <div className="w-full mt-4">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="mySwiper rounded-lg"
      >
        {SlideList.map((slide, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
              style={{ backgroundColor: slide.color }}
            >
              <div className="flex flex-row mx-auto px-4 pt-4">
                <div className="flex-1">
                  <div className="my-auto h-full pb-4 pl-4 flex flex-col justify-center gap-4 md:gap-12 text-nowrap">
                    <p className="text-[2.8125vw] sm:text-lg md:text-xl text-wrap">
                      {slide.sale}
                    </p>
                    <h2 className="text-[5.625vw] leading-snug sm:text-5xl md:text-7xl font-bold max-w-full text-wrap">
                      {slide.title}
                    </h2>

                    <button
                      className="w-fit px-2 py-1 sm:px-8 sm:py-4 rounded-full text-[2.8125vw] sm:text-lg md:text-xl"
                      style={{ backgroundColor: slide.button }}
                    >
                      Explore More
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="ml-auto sm:mx-auto w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
