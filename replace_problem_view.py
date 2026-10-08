import re

with open('src/pages/ProblemView.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { supabase } from '../lib/supabase';", "import { supabase } from '../lib/supabase';\nimport { useModal } from '../components/ModalProvider';")

# Add hook inside ProblemView
content = content.replace("  const navigate = useNavigate();", "  const navigate = useNavigate();\n  const { showAlert, showConfirm } = useModal();")

# Replace alerts
content = content.replace("alert('⚠️ WARNING: Tab switching is strictly prohibited! Do not leave the page. Your next tab switch will automatically fail you and terminate the session.');", 
"showAlert('Warning', 'Tab switching is strictly prohibited! Do not leave the page. Your next tab switch will automatically fail you and terminate the session.', 'warning');")

content = content.replace("alert('❌ CHEATING DETECTED: You have switched tabs multiple times. Your session has been terminated.');",
"showAlert('Cheating Detected', 'You have switched tabs multiple times. Your session has been terminated.', 'danger');")

content = content.replace("alert('⚠️ WARNING: Exiting fullscreen is strictly prohibited! (1/2 warnings)');",
"showAlert('Warning', 'Exiting fullscreen is strictly prohibited! (1/2 warnings)', 'warning');")

content = content.replace("alert('⚠️ FINAL WARNING: If you exit fullscreen again, your session will be terminated. (2/2 warnings)');",
"showAlert('Final Warning', 'If you exit fullscreen again, your session will be terminated. (2/2 warnings)', 'danger');")

content = content.replace("alert('❌ CHEATING DETECTED: You have exited fullscreen multiple times. Your session has been terminated.');",
"showAlert('Cheating Detected', 'You have exited fullscreen multiple times. Your session has been terminated.', 'danger');")

content = content.replace("alert(\"Time's up! This problem is now locked.\");",
"showAlert('Time Expired', 'Time\\'s up! This problem is now locked.', 'info');")

content = content.replace("alert(\"This problem's time has already expired and is locked.\");",
"showAlert('Locked', 'This problem\\'s time has already expired and is locked.', 'warning');")

content = content.replace("alert(\"Problem solved successfully! Moving to next problem.\");",
"showAlert('Success!', 'Problem solved successfully! Moving to next problem.', 'success');")

content = content.replace("alert(\"Problem solved successfully! Round completed, returning to dashboard.\");",
"showAlert('Success!', 'Problem solved successfully! Round completed, returning to dashboard.', 'success');")

# handleNextProblem rewrite
old_next = """  const handleNextProblem = () => {
    if (window.confirm("Warning: You cannot revisit this problem if you move to the next one. Are you sure you want to skip?")) {
      const currentIndex = problems.findIndex(p => p.id === problem?.id);
      const nextProblem = problems[currentIndex + 1];
      
      if (nextProblem && nextProblem.round === problem?.round) {
        navigate(`/problem/${nextProblem.id}`);
      } else {
        sessionStorage.removeItem('lockedRound');
        alert("Round completed, returning to dashboard.");
        navigate('/');
      }
    }
  };"""

new_next = """  const handleNextProblem = () => {
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
  };"""

content = content.replace(old_next, new_next)

with open('src/pages/ProblemView.tsx', 'w') as f:
    f.write(content)
