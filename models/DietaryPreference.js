import mongoose from 'mongoose';

const DietaryPreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  allergies: [String],
  restrictions: [String],
  preferences: [String],
  avoidFoods: [String],
  healthGoals: [String]
});

export default mongoose.model('DietaryPreference', DietaryPreferenceSchema);