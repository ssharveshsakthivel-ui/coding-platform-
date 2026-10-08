import { Link } from 'react-router-dom';
import { problems } from '../data/problems';
import { ChevronRight, Trophy, Code, Lock } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { Intro } from '../components/Intro';
import { supabase } from '../lib/supabase';

export function Home({ session }: { session?: any }) {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('introPlayed');
  });
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [selectedRoundToEnter, setSelectedRoundToEnter] = useState<number | null>(null);
  const [showExitWarning, setShowExitWarning] = useState(false);
  
  const [activeRound, setActiveRound] = useState<number | null>(() => {
    const saved = sessionStorage.getItem('lockedRound');
    return saved ? parseInt(saved) : null;
  });

  const handleEnterRound = () => {
    if (selectedRoundToEnter) {
      sessionStorage.setItem('lockedRound', selectedRoundToEnter.toString());
      setActiveRound(selectedRoundToEnter);
      setSelectedRoundToEnter(null);
    }
  };

  const handleExitRound = () => {
    sessionStorage.removeItem('lockedRound');
    setActiveRound(null);
    setShowExitWarning(false);
  };

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('introPlayed', 'true');
    setShowIntro(false);
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      const teamName = session?.user?.user_metadata?.team_name;
      if (!teamName) return;

      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('problem_id')
          .eq('user_name', teamName)
          .eq('status', 'Accepted');

        if (error) throw error;

        // Get unique solved problem IDs
        const solvedIds = new Set((data || []).map(sub => sub.problem_id));
        
        // Check for admin approval (problem_id 999)
        if (solvedIds.has(999)) {
          setIsApproved(true);
        }
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      }
    };

    fetchProgress();
  }, [session]);

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          GENCRAFT <span className="text-primary">BUGBUSTER EVENT</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          BugBuster Sub-Event — Scenario-Based Debugging Challenge. Select a scenario below and fix the bugs to pass the hidden test cases.
        </p>
      </div>

      {activeRound === null ? (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {[2, 3].map(roundNum => {
            const isLocked = roundNum === 3 && !isApproved;
            return (
              <div 
                key={roundNum}
                onClick={() => !isLocked && setSelectedRoundToEnter(roundNum)}
                className={`glass-panel p-10 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                  isLocked 
                    ? 'opacity-50 cursor-not-allowed border-panel-border' 
                    : 'cursor-pointer hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  {isLocked ? <Lock size={32} /> : <Trophy size={32} />}
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">Round {roundNum}</h2>
                <p className="text-text-secondary text-lg">
                  {roundNum === 2 ? 'Basic Logic & Syntax Debugging' : 'Scenario-Based Advanced Debugging'}
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                  {isLocked ? (
                    <span className="text-warning text-sm bg-warning/10 px-3 py-1 rounded-full">Locked until admin approval</span>
                  ) : (
                    <>
                      <span>Enter Round</span>
                      <ChevronRight size={18} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 border-b border-panel-border pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm">
                Round {activeRound}
              </span>
              {activeRound === 2 ? 'Basic Logic & Syntax Debugging' : 'Scenario-Based Advanced Debugging'}
            </h2>
            <button
              onClick={() => setShowExitWarning(true)}
              className="px-4 py-2 bg-panel-bg border border-panel-border text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              Go Back
            </button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {problems.filter(p => p.round === activeRound).map((problem) => {
              const className = "glass-panel p-6 rounded-xl transition-all duration-300 group flex flex-col h-full hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer";

              const content = (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      problem.difficulty === 'Easy' ? 'bg-success/20 text-success' :
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
                  
                  <h2 className="text-xl font-bold mb-3 transition-colors group-hover:text-primary">
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
                </>
              );

              return (
                <Link key={problem.id} to={`/problem/${problem.id}`} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {selectedRoundToEnter !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-panel-border p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Lock className="text-warning" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white text-center">Ready to begin?</h2>
            <p className="text-text-secondary mb-8 text-center text-sm leading-relaxed">
              You are about to enter <strong>Round {selectedRoundToEnter}</strong>. Are you sure you want to proceed?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedRoundToEnter(null)}
                className="flex-1 px-4 py-3 rounded-xl bg-panel-bg text-white hover:bg-slate-800 transition-colors font-medium border border-panel-border"
              >
                Cancel
              </button>
              <button 
                onClick={handleEnterRound}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors font-bold shadow-lg shadow-primary/20"
              >
                Enter Round
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-danger/50 p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
            <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-danger text-3xl font-bold">!</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white text-center">Warning!</h2>
            <p className="text-text-secondary mb-8 text-center text-sm leading-relaxed">
              Are you sure you want to go back to the main menu? You are currently in the middle of a round.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowExitWarning(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-panel-bg text-white hover:bg-slate-800 transition-colors font-medium border border-panel-border"
              >
                Cancel
              </button>
              <button 
                onClick={handleExitRound}
                className="flex-1 px-4 py-3 rounded-xl bg-danger text-white hover:bg-danger/80 transition-colors font-bold shadow-lg shadow-danger/20"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
