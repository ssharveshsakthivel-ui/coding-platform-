import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Terminal, Mail, Lock, Users } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        if (!teamName.trim()) {
          throw new Error('Team name is required');
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              team_name: teamName,
            }
          }
        });
        if (error) throw error;
        setMessage('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-6">
      <div className="glass-panel p-8 rounded-xl border border-panel-border w-full max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <Terminal className="text-primary" size={32} />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          GenCraft | <span className="bugbuster-glitch">BugBuster</span>
        </h1>
        <p className="text-text-secondary text-sm mb-8 text-center">
          {isLogin ? 'Sign in to access the event dashboard' : 'Register your team to participate'}
        </p>

        {error && <div className="w-full p-3 mb-4 rounded bg-danger/20 border border-danger/50 text-danger text-sm">{error}</div>}
        {message && <div className="w-full p-3 mb-4 rounded bg-success/20 border border-success/50 text-success text-sm">{message}</div>}

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-4">
          {!isLogin && (
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                required
                placeholder="Team Name" 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full bg-panel-bg border border-panel-border text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-primary text-sm transition-colors"
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="email" 
              required
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-panel-bg border border-panel-border text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-primary text-sm transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="password" 
              required
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-panel-bg border border-panel-border text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-primary text-sm transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Team')}
          </button>
        </form>

        <button 
          onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
          className="mt-6 text-sm text-text-secondary hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? Register your team" : "Already registered? Sign in"}
        </button>
      </div>
    </div>
  );
}
