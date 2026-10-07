const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/execute', async (req, res) => {
  const { language, code, input } = req.body;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'code-'));
  
  let command;
  let args = [];
  let fileToRun = '';

  try {
    if (language === 'python') {
      fileToRun = path.join(tmpDir, 'main.py');
      fs.writeFileSync(fileToRun, code);
      command = 'python3';
      args = [fileToRun];
    } else if (language === 'java') {
      fileToRun = path.join(tmpDir, 'Main.java');
      fs.writeFileSync(fileToRun, code);
      
      // Compile java
      const compileProcess = spawn('javac', [fileToRun]);
      await new Promise((resolve, reject) => {
        let errStr = '';
        compileProcess.stderr.on('data', data => errStr += data.toString());
        compileProcess.on('close', code => {
          if (code !== 0) reject(errStr);
          else resolve();
        });
      });
      
      command = 'java';
      args = ['-cp', tmpDir, 'Main'];
    } else {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    const runProcess = spawn(command, args);
    let output = '';
    let errorOutput = '';

    if (input) {
      runProcess.stdin.write(input);
      runProcess.stdin.end();
    }

    runProcess.stdout.on('data', data => output += data.toString());
    runProcess.stderr.on('data', data => errorOutput += data.toString());

    // Timeout execution after 5 seconds
    const timeout = setTimeout(() => {
      runProcess.kill();
      errorOutput += '\nExecution Timed Out';
    }, 5000);

    runProcess.on('close', code => {
      clearTimeout(timeout);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      res.json({ output, error: errorOutput, exitCode: code });
    });

  } catch (err) {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch(e) {}
    res.json({ output: '', error: err.toString(), exitCode: 1 });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Execution server running on http://localhost:${PORT}`));
