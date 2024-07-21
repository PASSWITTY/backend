import express from 'express';
import {
  getMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
  logMedicationIntake
} from '../controllers/medicationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.route('/')
  .get(getMedications)
  .post(createMedication);

router.route('/:id')
  .get(getMedication)
  .put(updateMedication)
  .delete(deleteMedication);

router.post('/:id/log', logMedicationIntake);

export default router;