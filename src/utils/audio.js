import { useState, useEffect, useRef } from "react";

export const useAudio = (src) => {
  const audio = useRef(new Audio(src));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.current = new Audio(src);
      if (audio.current) {
        audio.current.pause();
        audio.current.load();
      }
    // audio.current = new Audio(src);
    const current = audio.current;
    const setNowPlaying = ()=>setPlaying(true);
    const setPaused = ()=>setPlaying(false);

    current.addEventListener("ready", setPaused);
    current.addEventListener("play", setNowPlaying);
    current.addEventListener("pause", setPaused);    
    return () => {      
      audio.current.pause();
      setPlaying(false);
      current.removeEventListener("ready", setPaused);
      current.removeEventListener("play", setNowPlaying);
      current.removeEventListener("pause", setPaused);
    };
  }, [src]);

  return [playing, ()=>{audio.current.play()}, ()=>{audio.current.pause();audio.current.currentTime=0;}];
};
