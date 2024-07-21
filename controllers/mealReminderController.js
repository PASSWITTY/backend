import MealReminder from '../models/MealReminder.js';

// @desc    Get all meal reminders for a user
// @route   GET /api/mealreminders
// @access  Private
export const getMealReminders = async (req, res) => {
  try {
    const reminders = await MealReminder.find({ user: req.user.id }).sort({ time: 1 });
    res.json(reminders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a meal reminder
// @route   POST /api/mealreminders
// @access  Private
export const createMealReminder = async (req, res) => {
  const { mealType, time, days, notes } = req.body;

  try {
    const newReminder = new MealReminder({
      user: req.user.id,
      mealType,
      time,
      days,
      notes
    });

    const reminder = await newReminder.save();
    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update meal reminder
// @route   PUT /api/mealreminders/:id
// @access  Private
export const updateMealReminder = async (req, res) => {
  const { mealType, time, days, notes } = req.body;

  try {
    let reminder = await MealReminder.findById(req.params.id);

    if (!reminder) return res.status(404).json({ msg: 'Reminder not found' });

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    reminder = await MealReminder.findByIdAndUpdate(
      req.params.id,
      { mealType, time, days, notes },
      { new: true }
    );

    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete meal reminder
// @route   DELETE /api/mealreminders/:id
// @access  Private
export const deleteMealReminder = async (req, res) => {
  try {
    let reminder = await MealReminder.findById(req.params.id);

    if (!reminder) return res.status(404).json({ msg: 'Reminder not found' });

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await MealReminder.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Meal reminder removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Toggle meal reminder active status
// @route   PUT /api/mealreminders/:id/toggle
// @access  Private
export const toggleMealReminderActive = async (req, res) => {
  try {
    let reminder = await MealReminder.findById(req.params.id);

    if (!reminder) return res.status(404).json({ msg: 'Reminder not found' });

    // Make sure user owns reminder
    if (reminder.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    reminder.active = !reminder.active;
    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};