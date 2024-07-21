import express from 'express';
import {
  getFraudEducationContent,
  getFraudEducationItem,
  createFraudEducationItem,
  updateFraudEducationItem,
  deleteFraudEducationItem,
  submitQuizResults,
  getUserProgress
} from '../controllers/fraudEducationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getFraudEducationContent);
router.get('/:id', getFraudEducationItem);

// Protected routes
router.use(auth);
router.post('/', createFraudEducationItem);
router.put('/:id', updateFraudEducationItem);
router.delete('/:id', deleteFraudEducationItem);
router.post('/:id/submit-quiz', submitQuizResults);
router.get('/user-progress', getUserProgress);

export default router;