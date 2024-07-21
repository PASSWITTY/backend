import mongoose from 'mongoose';

const MealReminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  days: {
    type: [String],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  active: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  }
});

export default mongoose.model('MealReminder', MealReminderSchema);