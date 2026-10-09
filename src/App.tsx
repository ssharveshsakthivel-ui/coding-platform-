import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProblemView } from './pages/ProblemView';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { supabase } from './lib/supabase';
import { Code2, Trophy, LogOut } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { ADMIN_EMAIL } from './config';
import { ModalProvider } from './components/ModalProvider';

function Navbar({ session }: { session: Session | null }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-panel-border px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Code2 className="text-primary" size={28} />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          GenCraft | BugBuster
        </span>
      </Link>
      <div className="flex items-center gap-6">
        {session?.user?.email === ADMIN_EMAIL && (
          <Link to="/dashboard" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium">
            <Trophy size={16} />
            Leaderboard & Admin
          </Link>
        )}
        {session ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-panel-bg border border-panel-border hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        ) : null}
      </div>
    </nav>
  );
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Global Anti-Cheat: Disable Copy, Paste, Right-Click, and Drag-and-Drop after login
  useEffect(() => {
    if (!session) return;
    
    const preventCheating = (e: Event) => {
      if (session?.user?.email === ADMIN_EMAIL) return;
      e.preventDefault();
    };

    document.addEventListener('copy', preventCheating, true);
    document.addEventListener('paste', preventCheating, true);
    document.addEventListener('contextmenu', preventCheating, true);
    document.addEventListener('dragstart', preventCheating, true);
    document.addEventListener('drop', preventCheating, true);

    return () => {
      document.removeEventListener('copy', preventCheating, true);
      document.removeEventListener('paste', preventCheating, true);
      document.removeEventListener('contextmenu', preventCheating, true);
      document.removeEventListener('dragstart', preventCheating, true);
      document.removeEventListener('drop', preventCheating, true);
    };
  }, [session]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <ModalProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative">
          {session?.user?.user_metadata?.team_name && (
            <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.03] select-none">
              <div className="text-[100px] md:text-[150px] lg:text-[200px] font-black text-white whitespace-nowrap -rotate-45">
                {session.user.user_metadata.team_name}
              </div>
            </div>
          )}
          <div className="z-10 flex-1 flex flex-col relative">
            <Navbar session={session} />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home session={session} />} />
                <Route path="/problem/:id" element={<ProblemView session={session} />} />
                <Route path="/dashboard" element={<Dashboard session={session} />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;
