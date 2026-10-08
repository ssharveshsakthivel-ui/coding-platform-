CREATE POLICY "Allow public delete access"
  ON submissions FOR DELETE
  USING (true);
