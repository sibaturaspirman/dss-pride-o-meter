'use client';

import Image from "next/image";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PercentageCircle({ percentage = 0, delay = 0.5 }) {
  const [displayed, setDisplayed] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Animate number
      let current = 0;
      const duration = 1000;
      const stepTime = 1000 / 60;
      const stepAmount = percentage / (duration / stepTime);

      const animateCount = () => {
        current += stepAmount;
        if (current >= percentage) {
          setDisplayed(percentage);
          return;
        }
        setDisplayed(Math.floor(current));
        requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);

      // Animate circle
      controls.start({
        strokeDashoffset: CIRCUMFERENCE * (1 - percentage / 100),
        transition: {
          duration: 1.5,
          ease: 'easeInOut',
        },
      });
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [percentage, controls, delay]);

  return (
    <div className="relative w-full max-w-2xl flex flex-col items-center justify-center mt-6">
      <p className="text-xl mb-6 text-white font-bold tracking-widest">KAMU TELAH MELAKUKAN</p>

      <div className="relative w-[340px] h-[340px]">
        <Image
        src="/images/bg-circle.png" // ganti dengan path sesuai
        alt="DSS"
        className={`w-full absolute left-0 right-0 bottom-0 transition-opacity z-10`}
        width={340}
        height={340}
        />

        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 z-20" viewBox="0 0 200 200">
          {/* <circle
            cx="100"
            cy="100"
            r={RADIUS}
            stroke="#333"
            strokeWidth="10"
            fill="none"
          /> */}
          <motion.circle
            cx="100"
            cy="100"
            r={RADIUS}
            stroke="#F7DA6D"
            strokeWidth="10"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            fill="none"
            animate={controls}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.span
            className="relative block text-[108px] text-shadow-lg text-shadow-black font-bold text-[#F7DA6D] flex items-top justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
          >
            <span className="block w-[140px] leading-[1]">{displayed}</span>

            <span className="block text-4xl leading-[1]">%</span>
          </motion.span>
        </div>
      </div>

      <p className="text-xl mt-4 text-white font-bold tracking-widest">DARI PERTANYAAN</p>
    </div>
  );
}
