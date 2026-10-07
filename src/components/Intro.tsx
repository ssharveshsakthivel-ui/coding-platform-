import { useEffect, useState, useRef } from 'react';
import { Terminal, Code2, Bug } from 'lucide-react';

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [opacity, setOpacity] = useState(1);
  const [glitch, setGlitch] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Matrix Code Rain Effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./'.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? '#d946ef' : '#22d3ee'; // Occasionally fuchsia, mostly cyan
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);
    window.addEventListener('resize', setCanvasSize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 1200);

    const fadeTimeout = setTimeout(() => setOpacity(0), 4500); // 4.5s until fade
    const finishTimeout = setTimeout(() => onComplete(), 5500); // 5.5s until unmount

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out ${opacity === 0 ? 'pointer-events-none' : ''}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40"></canvas>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icons */}
        <div className="flex gap-6 mb-8 text-cyan-400 animate-bounce">
          <Code2 size={64} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          <Terminal size={64} className="text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]" />
          <Bug size={64} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse" />
        </div>
        
        {/* Glitching Title */}
        <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-4 transition-all duration-75 uppercase ${glitch ? 'text-fuchsia-500 translate-x-3 -translate-y-2 scale-105 skew-x-12 drop-shadow-[4px_4px_0_rgba(0,255,255,0.5)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]'}`}>
          HUNT THE BUG
        </h1>
        
        {/* Loading Bar */}
        <div className="mt-16 w-80 h-1.5 bg-gray-900 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-900/50">
          <div className="absolute top-0 left-0 h-full bg-cyan-400 rounded-full w-full origin-left animate-[loading_4.5s_ease-in-out]"></div>
        </div>
        
        <p className="mt-6 text-cyan-400 font-mono text-sm tracking-widest animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] font-bold">
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
