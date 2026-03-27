//server
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(express.static('public')); // serves HTML

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Save vote
app.post('/vote', async (req, res) => {
  const { answer } = req.body;
  await supabase.from('votes').insert([{ answer }]);
  res.send("ok");
});

// Get results
app.get('/results', async (req, res) => {
  const { data } = await supabase.from('votes').select('answer');

  const counts = { Yes: 0, No: 0 };

  data.forEach(row => {
    if (row.answer === "Yes") counts.Yes++;
    if (row.answer === "No") counts.No++;
  });

  res.json(counts);
});

app.listen(3000, () => console.log("http://localhost:3000"));