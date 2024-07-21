import express from 'express';
import {
  getEmergencyContacts,
  getEmergencyContact,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
} from '../controllers/emergencyContactController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // All emergency contact routes are protected

router.route('/')
  .get(getEmergencyContacts)
  .post(createEmergencyContact);

router.route('/:id')
  .get(getEmergencyContact)
  .put(updateEmergencyContact)
  .delete(deleteEmergencyContact);

export default router;