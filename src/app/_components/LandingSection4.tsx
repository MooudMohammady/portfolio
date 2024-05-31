"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

const samples = [
  {
    thumbnail: "website1.png",
    title: "Iranverse | Crypto platform",
    status: "درحال پیشرفت",
    progress:35,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-black",
        title: "Three.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-pink-500",
        title: "FramerMotion",
      },
      {
        classes: "text-white bg-blue-600",
        title: "MUI",
      },
    ],
  },
  {
    thumbnail: "website2.png",
    title: "Project Managment Service",
    status: "تمام شده",
    progress:95,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-black",
        title: "Shadcn UI",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-pink-500",
        title: "FramerMotion",
      },
      {
        classes: "text-white bg-indigo-500",
        title: "DnD",
      },
    ],
  },
  {
    thumbnail: "website3.png",
    title: "NFT Marketplace",
    status: "تمام شده",
    progress:100,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-pink-500",
        title: "FramerMotion",
      },
      {
        classes: "text-white bg-blue-400",
        title: "Swiper",
      },
    ],
  },
  {
    thumbnail: "website4.png",
    title: "Modern portfolio",
    status: "تمام شده",
    progress:100,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-pink-500",
        title: "FramerMotion",
      },
      {
        classes: "text-white bg-indigo-500",
        title: "Particles.TS",
      },
    ],
  },
  {
    thumbnail: "website5.png",
    title: "E-Commerce | Fullstack",
    status: "متوقف",
    progress:45,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-green-500",
        title: "Node.js",
      },
      {
        classes: "text-white bg-emerald-500",
        title: "MongoDB",
      },
    ],
  },
  {
    thumbnail: "website6.png",
    title: "CMS v2 | Fullstack",
    status: "متوقف",
    progress:67,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-green-500",
        title: "Node.js",
      },
      {
        classes: "text-white bg-emerald-500",
        title: "MongoDB",
      },
    ],
  },
  {
    thumbnail: "website7.png",
    title: "Desktop IDE",
    status: "تکمیل شده",
    progress:85,
    Technologies: [
      {
        classes: "text-white bg-gray-900",
        title: "Electron.js",
      },
      {
        classes: "text-white bg-pink-500",
        title: "Sass",
      },
      {
        classes: "text-black bg-yellow-500",
        title: "JavaScript",
      },
      {
        classes: "text-blue-600 bg-white",
        title: "Jquery",
      },
      {
        classes: "text-white bg-green-500",
        title: "Node.js",
      },
    ],
  },
  {
    thumbnail: "website8.png",
    title: "E-Learning | Fullstack",
    status: "تکمیل شده",
    progress:89,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-green-500",
        title: "Node.js",
      },
      {
        classes: "text-white bg-emerald-500",
        title: "MongoDB",
      },
    ],
  },
  {
    thumbnail: "website9.png",
    title: "Discord clone | Fullstack",
    status: "متوقف شده",
    progress:63,
    Technologies: [
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-black bg-white",
        title: "Socket.io",
      },
      {
        classes: "text-white bg-blue-500",
        title: "TypeScript",
      },
      {
        classes: "text-white bg-green-500",
        title: "Node.js",
      },
      {
        classes: "text-white bg-emerald-500",
        title: "MongoDB",
      },
    ],
  },
  {
    thumbnail: "website10.png",
    title: "CMS v1 | Fullstack",
    status: "متوقف",
    progress:45,
    Technologies: [
      {
        classes: "text-black bg-white",
        title: "Next.js",
      },
      {
        classes: "text-white bg-sky-500",
        title: "React.js",
      },
      {
        classes: "text-white bg-cyan-500",
        title: "Tailwind",
      },
      {
        classes: "text-black bg-yellow-500",
        title: "JavaScript",
      },
      {
        classes: "text-white bg-green-500",
        title: "Node.js",
      },
      {
        classes: "text-white bg-emerald-500",
        title: "MongoDB",
      },
    ],
  },
];

const LandingSection4 = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section className="flex flex-col gap-3 pt-16" id="samples">
      <div className="flex justify-between max-md:flex-col gap-3">
        <div className="flex gap-2">
          <span className="bg-amber-500 h-7 w-1"></span>
          <h2 className="text-2xl font-bold ">
            اما چه{" "}
            <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              پلتفرم
            </span>{" "}
            هایی رو توسعه دادم؟
          </h2>
        </div>
        <div className="flex gap-3 text-amber-500">
          <button
            className="rounded-md border border-amber-500 p-3 text-xl flex justify-center items-center hover:bg-amber-500/30 active:bg-amber-500/10 transition max-md:flex-1"
            onClick={handlePrev}>
            <IoIosArrowForward />
          </button>
          <button
            className="rounded-md border border-amber-500 p-3 text-xl flex justify-center items-center hover:bg-amber-500/30 active:bg-amber-500/10 transition max-md:flex-1"
            onClick={handleNext}>
            <IoIosArrowBack />
          </button>
        </div>
      </div>
      <Swiper
        style={{
          height: 370,
          // @ts-ignore
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        ref={sliderRef}
        spaceBetween={50}
        speed={1000}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          830: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        onSwiper={setSwiper}
        onSlideChange={(s) => {
          setActiveSlide(s.activeIndex);
        }}
        centeredSlides={true}
        modules={[Navigation, Autoplay]}
        className="w-full items-center">
        {activeSlide}
        {samples.map((s, i) => (
          <SwiperSlide key={i} className="py-5">
            <CardContainer containerClassName="py-0">
              <CardBody className="h-full w-full">
                <div
                  className={`flex flex-col gap-1 p-3 dark:border border-gray-500/40 rounded-md dark:bg-gray-500/10 bg-white shadow-md w-96 max-w-[350px] transition-all ${
                    activeSlide === i ? "-translate-y-3" : ""
                  }`}
                  dir="ltr">
                  <CardItem
                    as={Image}
                    width={400}
                    height={300}
                    src={`/images/${s.thumbnail}`}
                    alt=""
                    className="rounded"
                    children={undefined}
                    translateZ={25}
                    rotateX={-15}
                  />
                  <CardItem as={"h3"} className="text-xl" translateZ={15}>
                    {s.title}
                  </CardItem>
                  <ul className="flex gap-2 flex-wrap">
                    {s.Technologies.map((t, i) => (
                      <CardItem
                        as={"li"}
                        key={i}
                        className={cn(
                          "rounded-md py-1 px-2 font-semibold font-sans text-xs",
                          t.classes
                        )}
                        translateZ={25}>
                        {t.title}
                      </CardItem>
                    ))}
                  </ul>
                  <div className="flex justify-between mt-2">
                    <span className="px-4 py-1 rounded-full border">%پیشرفت: {s.progress}</span>
                    <span className="px-4 py-1 rounded-full border">وضعیت: {s.status}</span>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LandingSection4;
