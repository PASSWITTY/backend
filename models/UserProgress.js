import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedContent: [{
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FraudEducation'
    },
    score: Number,
    completedDate: {
      type: Date,
      default: Date.now
    }
  }],
  overallScore: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('UserProgress', UserProgressSchema);