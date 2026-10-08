import re

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { supabase } from '../lib/supabase';", "import { supabase } from '../lib/supabase';\nimport { useModal } from '../components/ModalProvider';")

# Add hook inside Dashboard
content = content.replace("  const [approvalStatus, setApprovalStatus] = useState<{[key: string]: boolean}>({});", "  const [approvalStatus, setApprovalStatus] = useState<{[key: string]: boolean}>({});\n  const { showAlert, showConfirm } = useModal();")

# Replace alerts
content = content.replace("alert('Failed to approve team. Make sure you are connected to Supabase.');", "showAlert('Error', 'Failed to approve team. Make sure you are connected to Supabase.', 'danger');")
content = content.replace("alert('Failed to reset leaderboard.');", "showAlert('Error', 'Failed to reset leaderboard.', 'danger');")

# handleReset rewrite
old_reset = """  const handleReset = async () => {
    if (window.confirm("Are you SURE you want to completely reset the leaderboard? This will permanently delete ALL teams, submissions, and activity logs. This cannot be undone.")) {
      setIsResetting(true);
      try {
        const { error } = await supabase.from('submissions').delete().neq('id', 0);
        if (error) throw error;
        setLeaderboard([]);
      } catch (err) {
        console.error('Error resetting leaderboard:', err);
        alert('Failed to reset leaderboard.');
      } finally {
        setIsResetting(false);
      }
    }
  };"""

new_reset = """  const handleReset = async () => {
    showConfirm(
      "Reset Leaderboard?",
      "Are you SURE you want to completely reset the leaderboard? This will permanently delete ALL teams, submissions, and activity logs. This cannot be undone.",
      async () => {
        setIsResetting(true);
        try {
          const { error } = await supabase.from('submissions').delete().neq('id', 0);
          if (error) throw error;
          setLeaderboard([]);
          showAlert('Success', 'Leaderboard reset successfully.', 'success');
        } catch (err) {
          console.error('Error resetting leaderboard:', err);
          showAlert('Error', 'Failed to reset leaderboard.', 'danger');
        } finally {
          setIsResetting(false);
        }
      },
      "danger"
    );
  };"""

content = content.replace(old_reset, new_reset)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)
