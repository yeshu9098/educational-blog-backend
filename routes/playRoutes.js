const express = require('express');
const router = express.Router();
const Quiz = require('../Model/Quiz');

// Play the quiz by selecting an option
router.post('/play/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { selectedOptionIndex } = req.body;
    if (selectedOptionIndex === undefined || isNaN(selectedOptionIndex) || selectedOptionIndex < 0 || selectedOptionIndex >= quiz.options.length) {
      return res.status(400).json({ message: 'Invalid selected option index' });
    }

    const isCorrect = selectedOptionIndex === quiz.correctOptionIndex;

    res.json({ isCorrect });
  } catch (error) {
    res.status(500).json({ message: 'Failed to play quiz', error: error.message });
  }
});


module.exports = router;
