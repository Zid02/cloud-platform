const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'dev' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from cloud-platform backend' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
