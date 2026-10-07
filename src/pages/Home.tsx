import { Link } from 'react-router-dom';
import { problems } from '../data/problems';
import { ChevronRight, Trophy, Code, TerminalSquare, BugOff } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
      <div className="relative mb-16 py-16 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0a0a0a] border border-gray-800 shadow-[0_0_50px_rgba(236,72,153,0.15)]">
        {/* Neon Glow Blobs */}
        <div className="absolute -left-10 top-0 w-48 h-48 bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
        <div className="absolute -right-10 bottom-0 w-48 h-48 bg-cyan-400 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
        
        {/* Floating Code Elements */}
        <div className="absolute left-8 top-12 transform -rotate-12">
          <span className="text-5xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">&lt;/&gt;</span>
        </div>
        <div className="absolute right-12 top-10 transform rotate-12">
          <BugOff className="text-pink-500 w-14 h-14 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
        </div>
        <div className="absolute left-16 bottom-16 transform -rotate-6">
          <TerminalSquare className="text-cyan-400 w-12 h-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] opacity-80" />
        </div>
        
        {/* Main Titles */}
        <div className="flex flex-col items-center z-10 transform -rotate-2 scale-105 select-none">
          <h1 className="text-6xl md:text-[5rem] font-black text-white tracking-tighter drop-shadow-lg mb-[-15px] uppercase" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #333' }}>
            GenCraft
          </h1>
          <h2 className="text-6xl md:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-pink-600 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] tracking-tighter uppercase mb-[-10px] leading-none">
            BUG BUSTER
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] tracking-tight uppercase transform rotate-1 mt-2">
            CHALLENGE
          </h3>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-4 mt-12 z-10 font-black text-white uppercase tracking-widest text-sm">
          <span>Using</span>
          <span className="bg-[#f04b4b] text-white px-5 py-2 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.5)] transform -rotate-2 tracking-wider">Java</span>
          <span>And</span>
          <span className="bg-[#1e78f0] text-white px-5 py-2 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] transform rotate-2 tracking-wider">Python</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Link 
            key={problem.id} 
            to={`/problem/${problem.id}`}
            className="glass-panel p-6 rounded-xl hover:border-primary transition-all duration-300 group hover:shadow-lg hover:shadow-primary/20 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                problem.difficulty === 'Easy-Medium' ? 'bg-success/20 text-success' :
                problem.difficulty === 'Medium' ? 'bg-warning/20 text-warning' :
                'bg-danger/20 text-danger'
              }`}>
                {problem.difficulty}
              </span>
              <span className="flex items-center gap-1 text-sm text-text-secondary font-medium">
                <Trophy size={14} className="text-warning" />
                {problem.points} pts
              </span>
            </div>
            
            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {problem.title}
            </h2>
            
            <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-1">
              {problem.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-panel-border">
              <div className="flex items-center gap-2 text-text-secondary text-xs">
                <Code size={14} />
                <span>Multiple Languages</span>
              </div>
              <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
