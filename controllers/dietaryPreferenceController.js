import DietaryPreference from '../models/DietaryPreference.js';

// @desc    Get user's dietary preference
// @route   GET /api/dietarypreference
// @access  Private
export const getDietaryPreference = async (req, res) => {
  try {
    let preference = await DietaryPreference.findOne({ user: req.user.id });
    
    if (!preference) {
      preference = new DietaryPreference({ user: req.user.id });
      await preference.save();
    }

    res.json(preference);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update dietary preference
// @route   PUT /api/dietarypreference
// @access  Private
export const updateDietaryPreference = async (req, res) => {
  const { allergies, restrictions, preferences, avoidFoods, healthGoals } = req.body;

  try {
    let preference = await DietaryPreference.findOne({ user: req.user.id });

    if (!preference) {
      preference = new DietaryPreference({ user: req.user.id });
    }

    preference.allergies = allergies || preference.allergies;
    preference.restrictions = restrictions || preference.restrictions;
    preference.preferences = preferences || preference.preferences;
    preference.avoidFoods = avoidFoods || preference.avoidFoods;
    preference.healthGoals = healthGoals || preference.healthGoals;

    await preference.save();

    res.json(preference);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};