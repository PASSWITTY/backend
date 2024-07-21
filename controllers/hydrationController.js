import HydrationLog from '../models/HydrationLog.js';

// @desc    Get all hydration logs for a user
// @route   GET /api/hydration
// @access  Private
export const getHydrationLogs = async (req, res) => {
  try {
    const logs = await HydrationLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a hydration log
// @route   POST /api/hydration
// @access  Private
export const createHydrationLog = async (req, res) => {
  const { amount, unit } = req.body;

  try {
    const newLog = new HydrationLog({
      user: req.user.id,
      amount,
      unit
    });

    const log = await newLog.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update hydration log
// @route   PUT /api/hydration/:id
// @access  Private
export const updateHydrationLog = async (req, res) => {
  const { amount, unit } = req.body;

  try {
    let log = await HydrationLog.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    // Make sure user owns log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    log = await HydrationLog.findByIdAndUpdate(
      req.params.id,
      { amount, unit },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete hydration log
// @route   DELETE /api/hydration/:id
// @access  Private
export const deleteHydrationLog = async (req, res) => {
  try {
    let log = await HydrationLog.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    // Make sure user owns log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await HydrationLog.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Hydration log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get daily hydration summary
// @route   GET /api/hydration/summary
// @access  Private
export const getDailyHydrationSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const summary = await HydrationLog.aggregate([
      {
        $match: {
          user: req.user.id,
          date: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    res.json(summary[0] || { totalAmount: 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};