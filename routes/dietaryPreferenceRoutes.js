import express from 'express';
import {
  getDietaryPreference,
  updateDietaryPreference
} from '../controllers/dietaryPreferenceController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // All dietary preference routes are protected

router.route('/')
  .get(getDietaryPreference)
  .put(updateDietaryPreference);

export default router;