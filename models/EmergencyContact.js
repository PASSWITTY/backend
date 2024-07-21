import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  relationship: String,
  phoneNumber: {
    type: String,
    required: true
  },
  email: String,
  address: String
});

export default mongoose.model('EmergencyContact', EmergencyContactSchema);