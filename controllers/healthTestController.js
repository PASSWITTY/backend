import HealthTest from '../models/HealthTest.js';

// @desc    Get all health tests for a user
// @route   GET /api/healthtests
// @access  Private
export const getHealthTests = async (req, res) => {
  try {
    const tests = await HealthTest.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single health test
// @route   GET /api/healthtests/:id
// @access  Private
export const getHealthTest = async (req, res) => {
  try {
    const test = await HealthTest.findById(req.params.id);

    if (!test) return res.status(404).json({ msg: 'Health test not found' });

    // Make sure user owns test
    if (test.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a health test
// @route   POST /api/healthtests
// @access  Private
export const createHealthTest = async (req, res) => {
  const { testType, results, notes } = req.body;

  try {
    const newTest = new HealthTest({
      user: req.user.id,
      testType,
      results,
      notes
    });

    const test = await newTest.save();
    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update health test
// @route   PUT /api/healthtests/:id
// @access  Private
export const updateHealthTest = async (req, res) => {
  const { testType, results, notes } = req.body;

  try {
    let test = await HealthTest.findById(req.params.id);

    if (!test) return res.status(404).json({ msg: 'Health test not found' });

    // Make sure user owns test
    if (test.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    test = await HealthTest.findByIdAndUpdate(
      req.params.id,
      { testType, results, notes },
      { new: true }
    );

    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete health test
// @route   DELETE /api/healthtests/:id
// @access  Private
export const deleteHealthTest = async (req, res) => {
  try {
    let test = await HealthTest.findById(req.params.id);

    if (!test) return res.status(404).json({ msg: 'Health test not found' });

    // Make sure user owns test
    if (test.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await HealthTest.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Health test removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};