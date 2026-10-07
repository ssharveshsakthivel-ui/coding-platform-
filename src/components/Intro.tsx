import { useEffect, useState } from 'react';
import { Terminal, Code2, Bug } from 'lucide-react';

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [opacity, setOpacity] = useState(1);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 1200);

    const fadeTimeout = setTimeout(() => setOpacity(0), 3500);
    const finishTimeout = setTimeout(() => onComplete(), 4500);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out"
      style={{ opacity }}
    >
      {/* Dark hacker grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ff_1px,transparent_1px),linear-gradient(to_bottom,#0ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-[0.03]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icons */}
        <div className="flex gap-6 mb-8 text-cyan-400 animate-bounce">
          <Code2 size={56} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          <Terminal size={56} className="text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]" />
          <Bug size={56} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
        </div>
        
        {/* Glitching Title */}
        <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-2 transition-all duration-75 uppercase ${glitch ? 'text-fuchsia-500 translate-x-2 -translate-y-1 scale-105 skew-x-12 drop-shadow-[4px_4px_0_rgba(0,255,255,0.5)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]'}`}>
          GenCraft
        </h1>
        
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-600 tracking-widest animate-pulse drop-shadow-[0_0_20px_rgba(217,70,239,0.4)]">
          BUG BUSTER
        </h2>
        
        {/* Loading Bar */}
        <div className="mt-16 w-72 h-1.5 bg-gray-900 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          <div className="absolute top-0 left-0 h-full bg-cyan-400 rounded-full w-full origin-left animate-[loading_3.5s_ease-in-out]"></div>
        </div>
        
        <p className="mt-6 text-cyan-400/80 font-mono text-sm tracking-widest animate-pulse">
          INITIALIZING DEBUG ENVIRONMENT...
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          20% { transform: scaleX(0.2); }
          40% { transform: scaleX(0.2); }
          60% { transform: scaleX(0.6); }
          80% { transform: scaleX(0.9); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
