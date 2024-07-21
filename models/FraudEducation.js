import mongoose from 'mongoose';

const FraudEducationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['article', 'video', 'interactive'],
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  quizQuestions: [{
    question: String,
    options: [String],
    correctAnswer: Number
  }]
});

export default mongoose.model('FraudEducation', FraudEducationSchema);