// src/hooks/useSound.js
import { useRef } from 'react';

export default function useSound(src, volume = 1) {
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio(src) : null);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.volume = volume;
    audioRef.current.play().catch(() => {});
  };

  return play;
}
