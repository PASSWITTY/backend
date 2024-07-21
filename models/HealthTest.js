import mongoose from 'mongoose';

const HealthTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  results: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  notes: String
});

export default mongoose.model('HealthTest', HealthTestSchema);