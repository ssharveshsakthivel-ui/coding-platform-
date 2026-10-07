import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trophy, Medal, Search, User, Lock, KeyRound } from 'lucide-react';
import { problems } from '../data/problems';

interface Submission {
  id: number;
  user_name: string;
  problem_id: number;
  score: number;
  status: string;
  created_at: string;
}

interface LeaderboardEntry {
  user_name: string;
  total_score: number;
  problems_solved: number;
}

export function Dashboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('status', 'Accepted');

      if (error && error.message !== 'Failed to fetch') throw error;

      // Calculate leaderboard
      const scores = new Map<string, { score: number; solved: Set<number> }>();

      // Dummy data if no connection or empty
      const submissionsData: any[] = data && data.length > 0 ? data : [
        { user_name: 'Alice', problem_id: 1, score: 30 },
        { user_name: 'Alice', problem_id: 2, score: 35 },
        { user_name: 'Bob', problem_id: 1, score: 30 },
        { user_name: 'Charlie', problem_id: 3, score: 35 },
      ];

      submissionsData.forEach((sub) => {
        const name = sub.user_name || 'Anonymous';
        if (!scores.has(name)) {
          scores.set(name, { score: 0, solved: new Set() });
        }
        
        const userStats = scores.get(name)!;
        // Only count unique problems solved
        if (!userStats.solved.has(sub.problem_id)) {
          userStats.solved.add(sub.problem_id);
          userStats.score += sub.score || 0;
        }
      });

      const board: LeaderboardEntry[] = Array.from(scores.entries()).map(([name, stats]) => ({
        user_name: name,
        total_score: stats.score,
        problems_solved: stats.solved.size,
      }));

      // Sort by score descending
      board.sort((a, b) => b.total_score - a.total_score);
      setLeaderboard(board);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto w-full px-6 py-24 flex-1 flex flex-col items-center justify-center">
        <div className="glass-panel p-8 rounded-xl border border-panel-border w-full flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <Lock className="text-primary" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-text-secondary text-sm mb-8">
            The leaderboard is restricted to event organizers only.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="password" 
                placeholder="Enter admin password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-panel-bg border border-panel-border text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-primary text-sm transition-colors"
              />
            </div>
            {error && <p className="text-danger text-sm text-left">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors mt-2"
            >
              Access Leaderboard
            </button>
          </form>
          <p className="text-xs text-text-secondary mt-6">Hint: Try 'admin123'</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
            <Trophy className="text-warning" size={32} />
            GenCraft BugBuster Leaderboard
          </h1>
          <p className="text-text-secondary">Live rankings for the GenCraft BugBuster Event</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search team..." 
            className="bg-panel-bg border border-panel-border text-white pl-10 pr-4 py-2 rounded-lg outline-none focus:border-primary text-sm w-64"
          />
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border border-panel-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-panel-bg border-b border-panel-border">
              <th className="py-4 px-6 font-semibold text-text-secondary text-sm">Rank</th>
              <th className="py-4 px-6 font-semibold text-text-secondary text-sm">Team Name</th>
              <th className="py-4 px-6 font-semibold text-text-secondary text-sm">Problems Solved</th>
              <th className="py-4 px-6 font-semibold text-text-secondary text-sm text-right">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-secondary">
                  Loading leaderboard...
                </td>
              </tr>
            ) : leaderboard.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-secondary">
                  No submissions yet. Be the first to solve!
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, idx) => (
                <tr 
                  key={entry.user_name} 
                  className="border-b border-panel-border/50 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-panel-bg font-bold">
                      {idx === 0 ? <Medal className="text-warning" size={18} /> : 
                       idx === 1 ? <Medal className="text-slate-300" size={18} /> :
                       idx === 2 ? <Medal className="text-amber-700" size={18} /> : 
                       <span className="text-text-secondary text-sm">{idx + 1}</span>}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User size={16} />
                      </div>
                      <span className="font-semibold text-white">{entry.user_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-24 bg-panel-bg rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(entry.problems_solved / problems.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-text-secondary ml-2">
                        {entry.problems_solved} / {problems.length}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-lg text-success">
                    {entry.total_score}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
