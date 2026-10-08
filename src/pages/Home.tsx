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
  const [solvedRound2, setSolvedRound2] = useState<number>(0);
  const [isApproved, setIsApproved] = useState<boolean>(false);

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

        // Count how many round 2 problems are solved
        let r2Count = 0;
        const r2Problems = problems.filter(p => p.round === 2);
        for (const p of r2Problems) {
          if (solvedIds.has(parseInt(p.id))) {
            r2Count++;
          }
        }
        setSolvedRound2(r2Count);
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

      {[2, 3].map(roundNum => {
        // Round 3 is locked until the admin approves them (isApproved === true)
        const isLocked = roundNum === 3 && !isApproved;

        return (
          <div key={roundNum} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-panel-border pb-3 flex items-center gap-3">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                Round {roundNum} {isLocked && <Lock size={14} />}
              </span>
              {roundNum === 2 ? 'Basic Logic & Syntax Debugging' : 'Scenario-Based Advanced Debugging'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {problems.filter(p => p.round === roundNum).map((problem) => {
                const CardWrapper = isLocked ? 'div' : Link;
                const props = isLocked ? {} : { to: `/problem/${problem.id}` };

                return (
                  <CardWrapper 
                    key={problem.id} 
                    {...props}
                    className={`glass-panel p-6 rounded-xl transition-all duration-300 group flex flex-col h-full ${
                      isLocked 
                        ? 'opacity-50 cursor-not-allowed border-panel-border' 
                        : 'hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer'
                    }`}
                  >
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
                    
                    <h2 className={`text-xl font-bold mb-3 transition-colors ${isLocked ? 'text-text-secondary' : 'group-hover:text-primary'}`}>
                      {problem.title}
                    </h2>
                    
                    <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-1">
                      {problem.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-panel-border">
                      <div className="flex items-center gap-2 text-text-secondary text-xs">
                        {isLocked ? <Lock size={14} /> : <Code size={14} />}
                        <span>{isLocked ? 'Locked' : 'Multiple Languages'}</span>
                      </div>
                      {!isLocked && <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" size={20} />}
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
}
