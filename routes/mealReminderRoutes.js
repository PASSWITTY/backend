import express from 'express';
import {
  getMealReminders,
  createMealReminder,
  updateMealReminder,
  deleteMealReminder,
  toggleMealReminderActive
} from '../controllers/mealReminderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // All meal reminder routes are protected

router.route('/')
  .get(getMealReminders)
  .post(createMealReminder);

router.route('/:id')
  .put(updateMealReminder)
  .delete(deleteMealReminder);

router.put('/:id/toggle', toggleMealReminderActive);

export default router;