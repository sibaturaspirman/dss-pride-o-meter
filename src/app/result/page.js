'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PercentageCircle from '@/components/PercentageCircle';
import BgWaveCustom from "@/components/BgWaveCustom";
import useSound from '@/hooks/useSound';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [activePage, setActivePage] = useState(false);
  const playClick = useSound('/sounds/click.mp3', 1);

  const gantiPage = () => {
    playClick()
    setTimeout(() => {
      router.push("/");
    }, 300);
  }

  const getImageByResult = (label) => {
    if (label === 'Warga Rasa Turis') return '/images/hasil-1.png';
    if (label === 'Masyarakat Umum') return '/images/hasil-2.png';
    if (label === 'Indonesia Tulen!') return '/images/hasil-3.png';
    return null;
  };

  useEffect(() => {
    const label = localStorage.getItem('quizResultLabel');
    const pct = localStorage.getItem('quizResultPercentage');

    if (!label || !pct) {
      router.push('/quiz');
    } else {
      setResult(label);
      setPercentage(parseInt(pct));
    }

    const timeout = setTimeout(() => {
      setActivePage(true);
    }, 3000); // 3 detik

    return () => clearTimeout(timeout);

  }, [router]);

  return (
    <div onClick={gantiPage} className={`flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-0 lg:pt-0 lg:px-0 mt-0 font-[family-name:var(--font-montserrat)] ${activePage ? '' : 'pointer-events-none'}`}>
        <BgWaveCustom bg={'/images/bg-quiz.jpg'} />
        <div className="w-[30%] flex justify-center items-center flex-col overflow-hidden mt-[-6rem]">
            <Image
                src="/images/logo.png" // ganti dengan path sesuai
                alt="DSS"
                className="w-full"
                width={267}
                height={88}
            />
        </div>

        {result && percentage !== null && (
            <>
            <PercentageCircle percentage={percentage} delay={0.5} />
            <Image
                src="/images/divider.png" // ganti dengan path sesuai
                alt="DSS"
                className="w-full mt-6"
                width={901}
                height={1}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
                className="mt-6 w-[40%]"
            >
                {/* Kamu adalah: <span className="text-[#F7DA6D]">{result}</span> */}
                <Image
                    src="/images/artinya.png" // ganti dengan path sesuai
                    alt="DSS"
                    className="w-full"
                    width={401}
                    height={116}
                />
            </motion.div>

            <motion.img
                src={getImageByResult(result)}
                alt={result}
                className="w-[80%] h-auto mt-[-3]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.6, ease: 'easeOut' }}
            />


            <motion.img
                src='/images/klik.png'
                alt={result}
                className="w-[50%] mx-auto fixed bottom-[4rem] left-0 right-0 animate-pulse"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.9, duration: 0.6, ease: 'easeOut' }}
            />
            </>
        )}
    </div>
  );
}
