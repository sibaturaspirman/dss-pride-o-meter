'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pridefulQuestions, funTriviaQuestions } from '@/data/questions';
import { getRandomItems } from '@/utils/shuffle';

export default function TriviaGrid() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [result, setResult] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const selectedPrideful = getRandomItems(pridefulQuestions, 4).map((q, i) => ({
      text: q,
      type: 'prideful',
      id: `pride-${i}-${q}`,
    }));

    const selectedFun = getRandomItems(funTriviaQuestions, 5).map((q, i) => ({
      text: q,
      type: 'fun',
      id: `fun-${i}-${q}`,
    }));

    const combined = [...selectedPrideful, ...selectedFun].sort(() => 0.5 - Math.random());
    setQuestions(combined);
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  function getFinalPercentage(count) {
    const raw = count * 11;
  
    if (raw <= 44) return 10 * count;         // 1–4 → 10%, 20%, 30%, 40%
    if (raw === 55) return 60;                // 5 → 60%
    if (raw === 66) return 70;                // 6 → 70%
    if (raw === 77) return 80;                // 7 → 80%
    if (raw === 88) return 90;                // 8 → 90%
    return 100;                               // 9 → 100%
  }
  
  function getResultLabel(percentage) {
    if (percentage <= 40) return "Warga Rasa Turis";
    if (percentage <= 70) return "Masyarakat Umum";
    return "Indonesia Tulen!";
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    const selectedQuestions = questions.filter((q) => selected.has(q.id));
    const percentageValue = getFinalPercentage(selectedQuestions.length);
    const label = getResultLabel(percentageValue);
  
    setPercentage(percentageValue);
    setResult(label);
  
    // Simpan ke localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("quizResultLabel", label);
      localStorage.setItem("quizResultPercentage", String(percentageValue));
    }
  
    // 🔁 Mapping hasil ke slug format (untuk API)
    const resultSlug = label.toLowerCase().replace(/\s+/g, '-'); // e.g. "Indonesia Tulen!" → "indonesia-tulen"
  
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result: resultSlug }),
      });
      
      // console.log(res)
      if (!res.ok) {
        console.error('❌ Gagal kirim ke API:', await res.text());
      } else {
  
        // Redirect ke result page
        router.push("/result");
        // console.log('✅ Berhasil submit ke API');
      }
    } catch (err) {
      console.error('❌ Error saat submit:', err);
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center p-6 text-white font-[family-name:var(--font-montserrat)]">
      <h1 className="text-[40px] font-bold mb-4 text-center leading-[1.2] mb-5">PILIH HAL-HAL YANG <br/> KAMU BANGET!</h1>

      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center ${isLoading ? 'z-50' : 'opacity-0 pointer-events-none'}`}>
        <span className="flex items-center gap-2 flex-col">
          <div className="w-[100px] h-[100px] animate-spin ">
            <Image
              src="/images/loading.png" // ganti dengan path sesuai
              alt="DSS"
              className={`w-full`}
              width={100}
              height={100}
              />
          </div>
          <span className="text-2xl mt-4 font-bold text-[#ECC953] animate-bounce">Tunggu sebentar ya...</span>
        </span>
      </div>

      {/* 🎨 DEBUG SECTION */}
      {/* <div className="w-full max-w-4xl grid grid-cols-2 gap-4 mb-6 text-black text-sm">
        <div className="bg-yellow-200 rounded-lg p-4">
          <h2 className="font-semibold text-black mb-2">Debug: Prideful Questions (Total: {pridefulQuestions.length})</h2>
          <ul className="list-disc pl-5">
            {pridefulQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-200 rounded-lg p-4">
          <h2 className="font-semibold text-black mb-2">Debug: Fun Trivia Questions (Total: {funTriviaQuestions.length})</h2>
          <ul className="list-disc pl-5">
            {funTriviaQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      </div> */}

        {/* 🧩 ACTUAL INTERACTIVE GRID */}
        <div className="relative w-full max-w-2xl border-[1px] border-[#F7DA6D]">
            <div className="h-[16px] w-[16px] bg-[#ECC953] pointer-events-none absolute top-[-8px] right-[-8px] z-10"></div>
            <div className="h-[16px] w-[16px] bg-[#ECC953] pointer-events-none absolute top-[-8px] left-[-8px] z-10"></div>
            <div className="h-[16px] w-[16px] bg-[#ECC953] pointer-events-none absolute bottom-[-8px] right-[-8px] z-10"></div>
            <div className="h-[16px] w-[16px] bg-[#ECC953] pointer-events-none absolute bottom-[-8px] left-[-8px] z-10"></div>
            <div className="grid grid-cols-3 gap-0 w-full">
                {questions.map((q) => {
                    const isSelected = selected.has(q.id);
                    return (
                        <button
                        key={q.id}
                        onClick={() => toggleSelect(q.id)}
                        className={`relative text-center text-sm font-medium border-[1px] border-[#434343] outline-none transition-colors overflow-hidden
                            ${isSelected ? 'bg-[#F7DA6D] text-black' : 'bg-black text-white'}
                            `}
                        >
                            <Image
                            src="/images/bg-grid.png" // ganti dengan path sesuai
                            alt="DSS"
                            className={`w-full relative transition-opacity ${isSelected ? 'opacity-0' : 'opacity-100'}`}
                            width={264}
                            height={264}
                            priority
                            />

                            <Image
                            src="/images/bg-grid-selected.png" // ganti dengan path sesuai
                            alt="DSS"
                            className={`w-full absolute top-0 left-0 transition-opacity z-10 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                            width={264}
                            height={264}
                            />
                            <div className="px-4 pb-[3.5rem] absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center z-20 text-[18px] leading-[1.3] font-medium">
                                {q.text}
                            </div>

                            <Image
                            src="/images/ellipse.png" // ganti dengan path sesuai
                            alt="DSS"
                            className={`w-[80px] mx-auto translate-x-[12%] absolute left-0 right-0 bottom-0 transition-opacity z-10 ${isSelected ? 'opacity-0' : 'opacity-100'}`}
                            width={92}
                            height={64}
                            />
                        </button>
                    );
                })}
            </div>
        </div>

        <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            className={`w-[50%] mt-10 outline-none
            ${selected.size === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''}`}
        >
            {selected.size === 0 ? (
                <Image
                src="/images/btn-kirimjawaban-disable.png" // ganti dengan path sesuai
                alt="DSS"
                className="w-full"
                width={480}
                height={88}
                />
            ) : (
                <Image
                src="/images/btn-kirimjawaban.png" // ganti dengan path sesuai
                alt="DSS"
                className="w-full animate-bounce mt-2"
                width={480}
                height={88}
                />
            )}
        </button>
    </div>
  );
}
