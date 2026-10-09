import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { Play, Send, SkipForward } from 'lucide-react';
import { problems } from '../data/problems';
import { supabase } from '../lib/supabase';
import { useModal } from '../components/ModalProvider';



export function ProblemView({ session }: { session?: any }) {
  const { id } = useParams();
  const problem = problems.find(p => p.id === id);
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(problem?.buggyTemplates?.['cpp'] || '');
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = sessionStorage.getItem(`timer_prob_${problem?.id}`);
    if (savedTime) return parseInt(savedTime);
    return problem?.round === 2 ? 300 : 600;
  });
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useModal();
  const [hasRunCode, setHasRunCode] = useState(false);
  const [, setTabSwitches] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => {
          const newCount = prev + 1;
          if (newCount === 1) {
            showAlert('Warning', 'Tab switching is strictly prohibited! (1/3 warnings)', 'warning');
          } else if (newCount === 2) {
            showAlert('Final Warning', 'One more tab switch will permanently block you from this round! (2/3 warnings)', 'danger');
          } else if (newCount >= 3) {
            showAlert('Cheating Detected', 'You have been blocked from this round for excessive tab switching.', 'danger');
            
            if (problem?.round) {
              sessionStorage.setItem(`blocked_round_${problem.round}`, 'true');
            }
            
            const logBlock = async () => {
              const teamName = session?.user?.user_metadata?.team_name;
              if (teamName && problem) {
                try {
                  await supabase.from('submissions').insert([{
                    user_name: teamName,
                    problem_id: parseInt(problem.id),
                    code: '',
                    language: 'system',
                    status: `Blocked from Round ${problem.round} - Tab Switching`,
                    score: 0
                  }]);
                } catch (e) {}
              }
            };
            logBlock();
            
            sessionStorage.removeItem('lockedRound');
            navigate('/');
          }
          return newCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [navigate, showAlert, problem, session]);

  // Anti-Cheat: Prevent Browser Back Button
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      showAlert('Action Blocked', 'Please use the buttons on the screen to navigate. Browser back button is disabled.', 'warning');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showAlert]);

  // Anti-Cheat: Fullscreen Exit Detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setTimeout(() => {
        // If there's no fullscreen element but we are still on this page
        if (!document.fullscreenElement) {
          const currentExits = parseInt(sessionStorage.getItem('fullscreenExits') || '0');
          const newExits = currentExits + 1;
          sessionStorage.setItem('fullscreenExits', newExits.toString());
          
          if (newExits === 1) {
            showAlert('Warning', 'Exiting fullscreen is strictly prohibited! (1/2 warnings)', 'warning');
          } else if (newExits === 2) {
            showAlert('Final Warning', 'If you exit fullscreen again, your session will be terminated. (2/2 warnings)', 'danger');
          } else if (newExits >= 3) {
            showAlert('Cheating Detected', 'You have exited fullscreen multiple times. Your session has been terminated.', 'danger');
            navigate('/');
          }
        }
      }, 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [navigate]);

  // Anti-Cheat: Disable Copy, Paste, Right-Click, and Drag-and-Drop
  useEffect(() => {
    const preventCheating = (e: Event) => {
      e.preventDefault();
    };

    // Use capture phase to intercept before Monaco editor or other elements handle it
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
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Record Time Expired
      const logExpired = async () => {
        const teamName = session?.user?.user_metadata?.team_name;
        if (teamName && problem) {
          try {
            await supabase.from('submissions').insert([{
              user_name: teamName,
              problem_id: parseInt(problem.id),
              code: '',
              language: 'system',
              status: 'Time Expired',
              score: 0
            }]);
          } catch (e) {}
        }
      };
      logExpired().then(() => {
        showAlert('Time Expired', 'Time\'s up! This problem is now locked.', 'info');
        navigate('/');
      });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        sessionStorage.setItem(`timer_prob_${problem?.id}`, next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate, problem, session]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (problem && problem.buggyTemplates) {
      setCode(problem.buggyTemplates[language]);
    }
  }, [language, problem]);

  useEffect(() => {
    setOutput('');
    setHasRunCode(false);
    
    // Check if time expired for the newly navigated problem
    const savedTime = sessionStorage.getItem(`timer_prob_${problem?.id}`);
    if (savedTime && parseInt(savedTime) <= 0) {
      showAlert('Locked', 'This problem\'s time has already expired and is locked.', 'warning');
      navigate('/');
      return;
    }
    setTimeLeft(savedTime ? parseInt(savedTime) : (problem?.round === 2 ? 300 : 600));
  }, [problem?.id, problem?.round, navigate]);

  useEffect(() => {
    // Log when user opens the problem, so admin can identify they've started the round
    const logStart = async () => {
      if (!problem) return;
      const teamName = session?.user?.user_metadata?.team_name;
      if (!teamName) return;
      
      const sessionStorageKey = `started_prob_${problem.id}`;
      if (!sessionStorage.getItem(sessionStorageKey)) {
        try {
          await supabase.from('submissions').insert([{
            user_name: teamName,
            problem_id: parseInt(problem.id),
            code: '',
            language: 'system',
            status: `Started Round ${problem.round}`,
            score: 0
          }]);
          sessionStorage.setItem(sessionStorageKey, 'true');
        } catch (e) {}
      }
    };
    
    logStart();
  }, [problem, session]);

  if (!problem) {
    return <div className="p-8 text-center text-xl text-danger">Problem not found</div>;
  }

  const handleRunCode = async () => {
    setIsRunning(true);
    setHasRunCode(true);
    setOutput('Compiling and running against public sample...');

    try {
      const sample = problem?.publicSample[0];
      const res = await fetch('https://coding-platform-fzpt.onrender.com/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input: sample?.input })
      });

      const data = await res.json();

      if (data.exitCode !== 0 || data.error) {
        setOutput(`Compilation/Execution Error ❌\n\n${data.error || data.output}`);
        setIsRunning(false);
        return;
      }

      const actualOutput = data.output.trim();
      const expectedOutput = sample?.output.trim();

      if (actualOutput === expectedOutput) {
        setOutput(`Test Case 1: Passed ✅\nInput:\n${sample?.input}\nOutput:\n${actualOutput}`);
      } else {
        setOutput(`Test Case 1: Failed ❌\nInput:\n${sample?.input}\n\nExpected Output:\n${expectedOutput}\n\nYour Output:\n${actualOutput}`);
      }
    } catch (e) {
      setOutput('Server error: Could not execute code. Make sure the execution server is running.');
    }

    // Log the Run Code activity
    const teamName = session?.user?.user_metadata?.team_name || 'Anonymous Team';
    try {
      await supabase.from('submissions').insert([{
        user_name: teamName,
        problem_id: parseInt(problem!.id),
        code,
        language,
        status: 'Testing (Run Code)',
        score: 0
      }]);
    } catch (e) {}

    setIsRunning(false);
  };

  const handleSubmit = async () => {
    const teamName = session?.user?.user_metadata?.team_name || 'Anonymous Team';

    setIsSubmitting(true);
    setOutput('Running against hidden test cases...');

    let allPassed = true;
    let outputText = '';

    const testCases = problem?.hiddenTestCases || [];

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const res = await fetch('https://coding-platform-fzpt.onrender.com/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code, input: tc.input })
        });

        const data = await res.json();

        if (data.exitCode !== 0 || data.error) {
          outputText += `Test Case ${i + 1}: Execution Error ❌\n${data.error || data.output}\n\n`;
          allPassed = false;
          break;
        }

        const actualOutput = data.output.trim();
        const expectedOutput = tc.output.trim();

        if (actualOutput === expectedOutput) {
          outputText += `Test Case ${i + 1}: Passed ✅\nInput:\n${tc.input}\nOutput:\n${actualOutput}\n\n`;
        } else {
          outputText += `Test Case ${i + 1}: Failed ❌\nInput:\n${tc.input}\nExpected Output:\n${expectedOutput}\nYour Output:\n${actualOutput}\n\n`;
          allPassed = false;
        }
      } catch (e) {
        outputText += `Server error on test case ${i + 1}.\n`;
        allPassed = false;
      }
    }

    // Save to Supabase
    try {
      await supabase.from('submissions').insert([{
        user_name: teamName,
        problem_id: parseInt(problem!.id),
        code,
        language,
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        score: allPassed ? problem!.points : 0
      }]);
    } catch (e) {
      // Ignore if Supabase fails
    }

    if (allPassed) {
      setOutput(`🎉 ALL HIDDEN TESTS PASSED!\nScore: +${problem?.points} points\nStatus: Accepted\nYour solution has been recorded.\n\n` + outputText);
      setTimeout(() => {
        const currentIndex = problems.findIndex(p => p.id === problem?.id);
        const nextProblem = problems[currentIndex + 1];
        
        if (nextProblem && nextProblem.round === problem?.round) {
          showAlert('Success!', 'Problem solved successfully! Moving to next problem.', 'success');
          navigate(`/problem/${nextProblem.id}`);
        } else {
          sessionStorage.removeItem('lockedRound');
          showAlert('Success!', 'Problem solved successfully! Round completed, returning to dashboard.', 'success');
          navigate('/');
        }
      }, 2000);
    } else {
      setOutput(`❌ HIDDEN TESTS FAILED\nStatus: Wrong Answer\nScore: 0 points\nHint: Check edge cases and constraints.\n\n` + outputText);
    }

    setIsSubmitting(false);
  };

  const handleNextProblem = () => {
    showConfirm(
      "Skip Problem?",
      "Warning: You cannot revisit this problem if you move to the next one. Are you sure you want to skip?",
      () => {
        const currentIndex = problems.findIndex(p => p.id === problem?.id);
        const nextProblem = problems[currentIndex + 1];
        
        if (nextProblem && nextProblem.round === problem?.round) {
          navigate(`/problem/${nextProblem.id}`);
        } else {
          sessionStorage.removeItem('lockedRound');
          showAlert("Round Completed", "Returning to dashboard.", "info");
          navigate('/');
        }
      },
      "warning"
    );
  };


  return (
    <div className="flex flex-1 h-[calc(100vh-73px)]">
      {/* Left Panel: Description */}
      <div className="w-1/2 p-6 overflow-y-auto border-r border-panel-border bg-bg-dark select-none">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{problem.title}</h1>
          <div className="flex gap-3">
            <div className={`px-4 py-2 rounded-lg font-mono text-xl font-bold border ${timeLeft < 60 ? 'bg-danger/20 border-danger text-danger animate-pulse' : 'bg-panel-bg border-panel-border text-white'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6 text-sm">
          <span className="px-3 py-1 bg-panel-border rounded-full font-medium">
            Difficulty: {problem.difficulty}
          </span>
          <span className="px-3 py-1 bg-panel-border rounded-full font-medium">
            Points: {problem.points}
          </span>
        </div>

        <div className="space-y-6 text-sm">
          <section>
            <h2 className="text-lg font-semibold mb-2 text-white">Scenario</h2>
            <p className="text-text-secondary leading-relaxed">{problem.description}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-white">Input Format</h2>
            <div className="p-4 rounded-lg bg-panel-bg font-mono whitespace-pre-wrap text-text-secondary">
              {problem.inputFormat}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-white">Output Format</h2>
            <p className="text-text-secondary">{problem.outputFormat}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-white">Constraints</h2>
            <div className="p-3 rounded-lg bg-panel-bg font-mono text-text-secondary">
              {problem.constraints}
            </div>
          </section>

          {problem.publicSample.map((sample, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Public Sample {idx + 1}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 text-text-secondary">Input</h3>
                  <div className="p-4 rounded-lg bg-panel-bg font-mono whitespace-pre text-sm">
                    {sample.input}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2 text-text-secondary">Output</h3>
                  <div className="p-4 rounded-lg bg-panel-bg font-mono whitespace-pre text-sm">
                    {sample.output}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Editor */}
      <div className="w-1/2 flex flex-col bg-bg-dark">
        <div className="flex items-center justify-between p-4 border-b border-panel-border gap-4">
          <div className="flex gap-4 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-panel-bg border border-panel-border text-white px-3 py-1.5 rounded-lg outline-none focus:border-primary text-sm font-medium"
            >
              <option value="cpp">C++ (GCC)</option>
              <option value="java">Java (OpenJDK)</option>
              <option value="python">Python 3</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-panel-bg border border-panel-border hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <Play size={16} className="text-success" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isRunning}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors text-sm font-medium disabled:opacity-50"
            >
              <Send size={16} />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {hasRunCode && (
              <button
                onClick={handleNextProblem}
                disabled={isSubmitting || isRunning}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-warning/20 hover:bg-warning/30 text-warning transition-colors text-sm font-medium disabled:opacity-50 border border-warning/30"
              >
                Next
                <SkipForward size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <Editor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              contextmenu: false,
              dragAndDrop: false,
            }}
          />
        </div>

        {output && (
          <div className="h-48 border-t border-panel-border bg-panel-bg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">Output / Result</span>
              <button onClick={() => setOutput('')} className="text-text-secondary hover:text-white text-xs">Clear</button>
            </div>
            <pre className="font-mono text-sm text-text-secondary overflow-y-auto whitespace-pre-wrap flex-1">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
