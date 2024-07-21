import mongoose from 'mongoose';

const MedicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  time: {
    type: [String],
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  notes: {
    type: String
  },
  intakeLog: [{
    date: {
      type: Date,
      default: Date.now
    },
    taken: {
      type: Boolean,
      default: false
    }
  }]
});

export default mongoose.model('Medication', MedicationSchema);