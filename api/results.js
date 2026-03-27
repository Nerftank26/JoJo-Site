//results
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase.from('votes').select('answer');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const counts = { Yes: 0, No: 0 };

  data.forEach(row => {
    if (row.answer === 'Yes') counts.Yes++;
    if (row.answer === 'No') counts.No++;
  });

  res.status(200).json(counts);
}