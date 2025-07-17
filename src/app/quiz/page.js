import Image from "next/image";
import TriviaGrid from '@/components/TriviaGrid';
import BgWaveCustom from "@/components/BgWaveCustom";

export default function Quiz() {
    return (
        <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-centerx pt-2 pb-5 px-0 lg:pt-0 lg:px-0 mt-0">
            <BgWaveCustom bg={'/images/bg-quiz.jpg'} />

            {/* <div className="w-[30%] lg:mt-[4rem] flex justify-center items-center flex-col overflow-hidden">
            <Image
                src="/images/logo.png" // ganti dengan path sesuai
                alt="DSS"
                className="w-full"
                width={267}
                height={88}
            />
            </div> */}
            <TriviaGrid />
        </div>
    );
}