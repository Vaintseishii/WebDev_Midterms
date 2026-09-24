import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { initializeDatabase, pool } from './db.js'

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); return res.json({ message: 'servicehub backend is running', database: 'connected' }); }
  catch { return res.status(500).json({ message: 'Database connection failed' }); }
});

initializeDatabase()
  .then(() => app.listen(PORT, () => console.log(`servicehub backend running on http://localhost:${PORT}`)))
  .catch((error) => { console.error('Unable to initialize PostgreSQL:', error); process.exit(1); });
