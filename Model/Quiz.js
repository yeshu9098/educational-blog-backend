const mongoose = require('mongoose');

const quiz = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true }
});


const Quiz = mongoose.model('Quiz', quiz);

module.exports = Quiz;
