import { Link } from 'react-router-dom';
import { problems } from '../data/problems';
import { ChevronRight, Trophy, Code } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          GENCRAFT <span className="text-primary">BUGBUSTER EVENT</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          BugBuster Sub-Event — Scenario-Based Debugging Challenge. Select a scenario below and fix the bugs to pass the hidden test cases.
        </p>
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
