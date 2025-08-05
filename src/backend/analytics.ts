import express from 'express';
import { query } from './db';

const router = express.Router();

// Endpoint to get aggregated data
router.get('/analytics/usage', async (_req, res) => {
  try {
    const result = await query('SELECT mode, COUNT(*) as usageCount FROM usage_data GROUP BY mode');
    res.json({
      success: true,
      data: result.rows,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Erro ao buscar dados do banco de dados.' });
  }
});

export default router;
