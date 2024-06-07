const express = require('express');
const router = express.Router();
const Quiz = require('../Model/Quiz');
const authenticate = require("../Middleware/middleware");


// Create a new quiz
router.post('/create', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create quiz', error: error.message });
  }
});

// Get all quizzes
router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve quizzes', error: error.message });
  }
});

// Get quiz by ID
router.get('/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve quiz', error: error.message });
  }
});

// Update quiz by ID
router.put('/:quizId', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update quiz', error: error.message });
  }
});

// Delete quiz by ID
router.delete('/:quizId', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete quiz', error: error.message });
  }
});

module.exports = router;
