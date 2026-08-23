"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";

export default function StrategicInfrastructureCarousel() {
  const slides = [
    {
      id: 1,
      image: "/images/carousel_slide_5.jpg",
      alt: "Industrial petroleum pipeline infrastructure manifold leading toward refinery units",
      title: "PIPELINE CONNECTIVITY",
      tag: "STRATEGIC CORRIDORS",
      description: "Illustrative petroleum transport and crude pipeline infrastructure.",
      objectPosition: "center 30%"
    },
    {
      id: 2,
      image: "/images/carousel_slide_2_tanks.jpg",
      alt: "Aerial perspective of modern oil refinery complex with cylindrical storage tanks and flaring towers",
      title: "STRATEGIC REFINING ASSETS",
      tag: "256.8 MMTPA NAMEPLATE",
      description: "Illustrative refining infrastructure — not live facility telemetry.",
      objectPosition: "center 50%"
    },
    {
      id: 3,
      image: "/images/carousel_slide_3_spheres.jpg",
      alt: "Spherical pressurized liquefied gas and petroleum storage vessels with complex industrial piping manifolds",
      title: "STRATEGIC STORAGE VESSELS",
      tag: "5.33 MMT BUFFER",
      description: "Pressurized containment and manifold distribution network.",
      objectPosition: "center 50%"
    },
    {
      id: 4,
      image: "/images/carousel_slide_3.jpg",
      alt: "Coastal petroleum storage tank farm and marine offloading terminal alongside blue waters",
      title: "CRUDE STORAGE CAPACITY",
      tag: "COASTAL BUFFER",
      description: "Strategic petroleum reserves and coastal storage buffer facilities.",
      objectPosition: "center 50%"
    },
    {
      id: 5,
      image: "/images/carousel_slide_4.jpg",
      alt: "Illuminated petrochemical towers and fractionating distillation columns at night",
      title: "NATIONAL REFINING NETWORK",
      tag: "23 NATIONAL REFINERIES",
      description: "Representative refining and secondary processing capacity.",
      objectPosition: "center 35%"
    },
    {
      id: 6,
      image: "/images/carousel_slide_1.jpg",
      alt: "Crude oil tanker berthed at marine terminal pipeline pier in sunlight",
      title: "MARITIME SUPPLY INTERFACE",
      tag: "DEEPWATER OFFLOADING",
      description: "Crude import and marine terminal pipeline offloading infrastructure.",
      objectPosition: "center 50%"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Transition to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Transition to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Manual navigation handlers that reset the 4.5s timer
  const handleManualSelect = useCallback((idx) => {
    setCurrentIndex(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4500);
  }, [nextSlide]);

  const handleManualNext = useCallback(() => {
    nextSlide();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4500);
  }, [nextSlide]);

  const handleManualPrev = useCallback(() => {
    prevSlide();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4500);
  }, [prevSlide, nextSlide]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleManualNext();
    } else if (diff < -45) {
      handleManualPrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Automatic slideshow loop: 4.5 seconds per slide
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[340px] sm:h-[420px] md:h-[460px] lg:h-[510px] xl:h-[540px] max-h-[70vh] rounded-[22px] sm:rounded-[26px] overflow-hidden border border-[#D8EAF5] shadow-2xl group select-none bg-[#07111F]"
      aria-roledescription="carousel"
      aria-label="Strategic Energy Infrastructure Image Carousel"
    >
      {/* High-Definition Photo Layers with 700ms Smooth Crossfade (Sharp, Natural Proportions) */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              quality={95}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 42vw"
              className="object-cover transition-none"
              style={{ objectPosition: slide.objectPosition }}
            />
          </div>
        );
      })}

      {/* Subtle bottom gradient strictly behind lower text panel (Upper 75% remains bright & crisp) */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-44 bg-gradient-to-t from-[#07111F]/90 via-[#07111F]/35 to-transparent pointer-events-none z-15" />

      {/* Top-Right Sovereign Badge */}
      <div className="absolute top-3 sm:top-3.5 right-3 sm:right-3.5 z-20 pointer-events-none">
        <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-white/95 bg-[#07111F]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-lg border border-white/15 shadow-sm tracking-wide">
          STRATEGIC REFINING ASSETS • 256.8 MMTPA
        </span>
      </div>

      {/* Optional Manual Navigation Controls (Hidden by default, appear on hover / touch) */}
      <div className="absolute inset-y-0 inset-x-2 sm:inset-x-3 flex items-center justify-between z-30 pointer-events-none">
        <button
          onClick={handleManualPrev}
          aria-label="Previous photograph"
          className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#07111F]/80 hover:bg-[#07111F] border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer hover:scale-105"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        <button
          onClick={handleManualNext}
          aria-label="Next photograph"
          className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#07111F]/80 hover:bg-[#07111F] border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer hover:scale-105"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Anchored Dark Navy Information Panel & 6 Cyan Pagination Dots */}
      <div className="absolute bottom-2.5 sm:bottom-3.5 inset-x-2.5 sm:inset-x-3.5 z-20 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07111F]/90 backdrop-blur-md border border-white/15 shadow-lg space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C7E8] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#00C7E8]">
              {slides[currentIndex].title}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700">
            {slides[currentIndex].tag}
          </span>
        </div>

        <p className="text-[10px] sm:text-[11px] text-slate-300 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
          {slides[currentIndex].description}
        </p>

        {/* 6 Pagination Dots (Cyan #00C7E8 Active Indicator) */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 pt-0.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSelect(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-5 sm:w-6 bg-[#00C7E8]"
                  : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
