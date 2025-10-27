import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LM from "../public/images/Home/learnmore.webp";

// Custom hook for animated counter
const useAnimatedCounter = (
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

const Learnmore = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [startCounters, setStartCounters] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Counters
  const yearsCount = useAnimatedCounter(15, 2000, startCounters);
  const diversCount = useAnimatedCounter(500, 2500, startCounters);
  const sitesCount = useAnimatedCounter(25, 1800, startCounters);

  const handleLearnMore = () => navigate("/about");

  // Text fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    return () => revealRef.current && observer.unobserve(revealRef.current);
  }, []);

  // Stats counter observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStartCounters(true),
      { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => statsRef.current && observer.unobserve(statsRef.current);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-24 px-5">
      <div className="max-w-[1200px] w-full grid md:grid-cols-[1.2fr_1fr] gap-20 items-center">
        {/* Left Section - Text */}
        <div className="relative">
          <div className="absolute top-[-20px] left-0 w-[60px] h-[2px] bg-[#000152]"></div>

          <h2 className="text-[4rem] font-thin text-[#00087a] leading-[0.9] mb-10">
            Colombo
            <br />
            <span className="font-normal">Divers</span>
          </h2>

          <div ref={revealRef}>
            <p
              className={`text-2xl text-black mb-10 font-light transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Where ocean meets excellence
            </p>

            <p
              className={`text-lg text-gray-600 leading-relaxed mb-20 font-normal max-w-[90%] transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              We are Sri Lanka's premier diving center, offering world-class PADI
              certified training and underwater expeditions. Our expert team
              guides you through pristine coral reefs, historic shipwrecks, and
              the vibrant marine ecosystems of the Indian Ocean.
            </p>
          </div>

          {/* Button */}
          <div className="flex items-center gap-5">
            <button
              onClick={handleLearnMore}
              className="relative border border-black text-black uppercase tracking-widest w-[180px] py-[18px] text-sm font-medium transition-all duration-300 hover:bg-[#0c0075] hover:text-white"
            >
              Discover More
            </button>
            <span className="text-[#0c0075] text-xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex gap-16 mt-20 pt-3 border-t border-gray-200"
          >
            <div className="text-center">
              <span className="text-[2.5rem] font-thin text-black block">
                {yearsCount}+
              </span>
              <span className="text-xs uppercase text-gray-500 tracking-[0.1em]">
                Years Experience
              </span>
            </div>
            <div className="text-center">
              <span className="text-[2.5rem] font-thin text-black block">
                {diversCount}+
              </span>
              <span className="text-xs uppercase text-gray-500 tracking-[0.1em]">
                Certified Divers
              </span>
            </div>
            <div className="text-center">
              <span className="text-[2.5rem] font-thin text-black block">
                {sitesCount}+
              </span>
              <span className="text-xs uppercase text-gray-500 tracking-[0.1em]">
                Dive Sites
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative w-[500px] h-[700px] bg-gray-100 overflow-hidden">
          <img
            src={LM}
            alt="Learn More"
            className="w-full h-full object-cover transition-all duration-700 ease-in-out grayscale-[20%] contrast-[1.05]"
          />
        </div>
      </div>
    </section>
  );
};

export default Learnmore;
