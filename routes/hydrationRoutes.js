import express from 'express';
import {
  getHydrationLogs,
  createHydrationLog,
  updateHydrationLog,
  deleteHydrationLog,
  getDailyHydrationSummary
} from '../controllers/hydrationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // All hydration routes are protected

router.route('/')
  .get(getHydrationLogs)
  .post(createHydrationLog);

router.route('/:id')
  .put(updateHydrationLog)
  .delete(deleteHydrationLog);

router.get('/summary', getDailyHydrationSummary);

export default router;