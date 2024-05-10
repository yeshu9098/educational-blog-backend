const mongoose = require('mongoose');

const article = new mongoose.Schema({
    title: { type: String, required: true, trim: true, min: 5, max: 250 },
    body: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true }
});

// Define the model
const Article = mongoose.model('Article', article);

// Export the model
module.exports = Article;