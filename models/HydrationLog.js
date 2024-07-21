import mongoose from 'mongoose';

const HydrationLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['ml', 'oz'],
    default: 'ml'
  }
});

export default mongoose.model('HydrationLog', HydrationLogSchema);