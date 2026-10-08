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
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              team_name: teamName,
            }
          }
        });
        if (error) throw error;
        
        // Log registration
        try {
          await supabase.from('submissions').insert([{
            user_name: teamName,
            problem_id: 0,
            code: '',
            language: 'system',
            status: 'Registered',
            score: 0
          }]);
        } catch (e) {
          // Ignore
        }

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
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-br from-[#ffffff] via-[#fff0e6] to-[#ffdac1] relative overflow-hidden text-gray-800">
      
      {/* Decorative blurred background shapes to enhance glassmorphism */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#ffdac1] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(234,88,12,0.15)] rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
        
        {/* Logo/Icon Area */}
        <div className="w-20 h-20 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          <Terminal className="text-white" size={40} />
        </div>
        
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-orange-500">
          GenCraft
        </h1>
        <p className="text-orange-900/60 font-medium text-sm mb-8 text-center uppercase tracking-widest">
          {isLogin ? 'BugBuster Login' : 'Team Registration'}
        </p>

        {error && <div className="w-full p-4 mb-5 rounded-xl bg-red-100 border border-red-200 text-red-600 text-sm font-medium shadow-sm">{error}</div>}
        {message && <div className="w-full p-4 mb-5 rounded-xl bg-green-100 border border-green-200 text-green-700 text-sm font-medium shadow-sm">{message}</div>}

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-5">
          {!isLogin && (
            <div className="relative group">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors" size={20} />
              <input 
                type="text" 
                required
                placeholder="Team Name" 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full bg-white/60 border border-white/50 text-gray-800 placeholder-gray-400 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors" size={20} />
            <input 
              type="email" 
              required
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/60 border border-white/50 text-gray-800 placeholder-gray-400 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors" size={20} />
            <input 
              type="password" 
              required
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/60 border border-white/50 text-gray-800 placeholder-gray-400 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transform hover:-translate-y-0.5 transition-all mt-2 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Team')}
          </button>
        </form>

        <button 
          onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
          className="mt-8 text-sm font-semibold text-orange-800/60 hover:text-orange-600 transition-colors"
        >
          {isLogin ? "Don't have an account? Register your team" : "Already registered? Sign in"}
        </button>
      </div>
    </div>
  );
}
