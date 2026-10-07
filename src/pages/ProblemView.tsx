import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { Play, Send, CheckCircle2, XCircle } from 'lucide-react';
import { problems } from '../data/problems';
import { supabase } from '../lib/supabase';



export function ProblemView({ session }: { session?: any }) {
  const { id } = useParams();
  const problem = problems.find(p => p.id === id);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(problem?.buggyTemplates?.['java'] || '');
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (problem && problem.buggyTemplates) {
      setCode(problem.buggyTemplates[language]);
    }
  }, [language, problem]);

  if (!problem) {
    return <div className="p-8 text-center text-xl text-danger">Problem not found</div>;
  }

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and running against public sample...');
    
    try {
      const sample = problem?.publicSample[0];
      const res = await fetch('http://localhost:3001/execute', {
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
        const res = await fetch('http://localhost:3001/execute', {
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
    } else {
      setOutput(`❌ HIDDEN TESTS FAILED\nStatus: Wrong Answer\nScore: 0 points\nHint: Check edge cases and constraints.\n\n` + outputText);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-73px)]">
      {/* Left Panel: Description */}
      <div className="w-1/2 p-6 overflow-y-auto border-r border-panel-border bg-bg-dark">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        
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
