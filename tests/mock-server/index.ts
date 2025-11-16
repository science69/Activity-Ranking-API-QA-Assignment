import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory suggestions list
const suggestions = ['Denver', 'London', 'Sydney', 'Auckland'];

app.get('/suggestions', (req, res) => {
  const q = (req.query.q as string) || '';
  const results = suggestions.filter(s => s.toLowerCase().startsWith(q.toLowerCase()));
  res.json({ suggestions: results });
});

app.get('/rankings', (req, res) => {
  const city = (req.query.city as string) || '';

  // basic validation
  if (!city || /[^a-zA-Z\s-]/.test(city)) {
    return res.status(400).json({ error: 'Invalid city name' });
  }

  // Simulate not found
  if (city === 'XyzNoCity') {
    return res.status(404).json({ error: 'City not found' });
  }

  // Simulate weather-api-down
  if (city === 'TriggerApiDown') {
    return res.status(503).json({ error: 'Weather service unavailable' });
  }

  // Return a deterministic 7-day ranking payload
  const days = [];
  const start = new Date('2025-01-01');
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      date: date.toISOString().slice(0, 10),
      activities: {
        Skiing: { rank: i % 2 === 0 ? 8 : 4, reasoning: i % 2 === 0 ? 'High snowfall expected' : 'Low snowfall' },
        Surfing: { rank: i % 3 === 0 ? 7 : 3, reasoning: i % 3 === 0 ? 'Good swell and wind conditions' : 'Calm seas' },
        'Outdoor Sightseeing': { rank: 6, reasoning: 'Clear skies and 22°C' },
        'Indoor Sightseeing': { rank: 5, reasoning: 'Suitable for indoor visits' }
      }
    });
  }

  res.json({ city, days });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock rankings server listening on http://localhost:${port}`);
});
