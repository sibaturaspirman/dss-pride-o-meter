'use client';

import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { useEffect, useRef } from 'react';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Tambahkan sesuai kebutuhan
});

// export const metadata = {
//   title: "PRIDE-O-METER",
//   description: "Seberapa bangga kamu dengan Indonesia?",
// };

export default function RootLayout({ children }) {
  const bgmRef = useRef(null);

  useEffect(() => {
    const bgm = bgmRef.current;
    if (bgm) {
      bgm.volume = 0.2;
      bgm.loop = true;
    }

    const onFirstClick = () => {
      if (bgm && bgm.paused) {
        bgm.play().catch(() => {});
      }
      document.removeEventListener('click', onFirstClick);
    };

    document.addEventListener('click', onFirstClick);
  }, []);
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <audio ref={bgmRef} src="/sounds/bgm2.mp3" preload="auto" />
        {children}

        <div className="fixed bottom-10 right-10 w-[72px] h-[72px] pointer-events-none">
          <Image
            src="/images/21.png" // ganti dengan path sesuai
            alt="DSS"
            className="w-wull"
            width={72}
            height={72}
          />
        </div>
      </body>
    </html>
  );
}
