import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "@/components/BgWaveCustom";

export default function Home() {
  return (
    <Link href='/quiz' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx pt-2 pb-5 px-0 lg:pt-0 lg:px-0 mt-0">
      <BgWaveCustom bg={'/images/bg-home.jpg'}/>

        <div className="w-[82%] mt-[12rem] flex justify-center items-center flex-col overflow-hidden">
          <Image
            src="/images/front.png" // ganti dengan path sesuai
            alt="DSS"
            className="w-full"
            width={737}
            height={256}
          />

          <Image
            src="/images/btn-cari.png" // ganti dengan path sesuai
            alt="DSS"
            className="w-[66%] mt-12 animate-bounce"
            width={480}
            height={88}
          />
        </div>
    </Link>
  );
}