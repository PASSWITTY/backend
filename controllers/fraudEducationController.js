import FraudEducation from '../models/FraudEducation.js';
import UserProgress from '../models/UserProgress.js';

// @desc    Get all fraud education content
// @route   GET /api/fraud-education
// @access  Public
export const getFraudEducationContent = async (req, res) => {
  try {
    const content = await FraudEducation.find().sort({ publishDate: -1 });
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single fraud education item
// @route   GET /api/fraud-education/:id
// @access  Public
export const getFraudEducationItem = async (req, res) => {
  try {
    const item = await FraudEducation.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Education item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new fraud education item
// @route   POST /api/fraud-education
// @access  Private (Admin only)
export const createFraudEducationItem = async (req, res) => {
  const { title, content, contentType, tags, quizQuestions } = req.body;

  try {
    const newItem = new FraudEducation({
      title,
      content,
      contentType,
      tags,
      quizQuestions
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a fraud education item
// @route   PUT /api/fraud-education/:id
// @access  Private (Admin only)
export const updateFraudEducationItem = async (req, res) => {
  const { title, content, contentType, tags, quizQuestions } = req.body;

  try {
    let item = await FraudEducation.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Education item not found' });
    }

    item = await FraudEducation.findByIdAndUpdate(
      req.params.id,
      { title, content, contentType, tags, quizQuestions },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a fraud education item
// @route   DELETE /api/fraud-education/:id
// @access  Private (Admin only)
export const deleteFraudEducationItem = async (req, res) => {
  try {
    const item = await FraudEducation.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Education item not found' });
    }

    await item.remove();

    res.json({ msg: 'Education item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Submit quiz results
// @route   POST /api/fraud-education/:id/submit-quiz
// @access  Private
export const submitQuizResults = async (req, res) => {
  const { answers } = req.body;

  try {
    const educationItem = await FraudEducation.findById(req.params.id);
    if (!educationItem) {
      return res.status(404).json({ msg: 'Education item not found' });
    }

    let score = 0;
    educationItem.quizQuestions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const percentScore = (score / educationItem.quizQuestions.length) * 100;

    let userProgress = await UserProgress.findOne({ user: req.user.id });
    if (!userProgress) {
      userProgress = new UserProgress({ user: req.user.id });
    }

    userProgress.completedContent.push({
      content: educationItem._id,
      score: percentScore
    });

    // Update overall score (average of all completed content scores)
    const totalScore = userProgress.completedContent.reduce((sum, content) => sum + content.score, 0);
    userProgress.overallScore = totalScore / userProgress.completedContent.length;

    await userProgress.save();

    res.json({ score: percentScore, overallScore: userProgress.overallScore });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get user's progress
// @route   GET /api/fraud-education/user-progress
// @access  Private
export const getUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ user: req.user.id }).populate('completedContent.content', 'title');
    
    if (!userProgress) {
      return res.status(404).json({ msg: 'User progress not found' });
    }

    res.json(userProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};