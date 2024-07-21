import express from 'express';
import {
  getHealthTests,
  getHealthTest,
  createHealthTest,
  updateHealthTest,
  deleteHealthTest
} from '../controllers/healthTestController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // All health test routes are protected

router.route('/')
  .get(getHealthTests)
  .post(createHealthTest);

router.route('/:id')
  .get(getHealthTest)
  .put(updateHealthTest)
  .delete(deleteHealthTest);

export default router;