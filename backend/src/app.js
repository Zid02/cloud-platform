'use strict';
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'cloudplatform',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await pool.query('SELECT 1');
    dbStatus = 'connected';
  } catch (err) {
    dbStatus = 'error: ' + err.message;
  }
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV || 'dev',
    database: dbStatus
  });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from cloud-platform backend' });
});

// Database version endpoint
app.get('/api/db-version', async (req, res) => {
  try {
    const result = await pool.query('SELECT version()');
    res.json({ postgres: result.rows[0].version });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
