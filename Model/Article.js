const mongoose = require('mongoose');

const article = new mongoose.Schema({
    title: { type: String, required: true, trim: true, min: 5, max: 250 },
    body: { type: String, required: true },
    user: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['Articles', 'Current Affairs', 'Jobs', 'HP GK', 'Syllabus', 'HAS Mains']
    },
    date: { type: Date, required: false }
});


// Define the model
const Article = mongoose.model('Article', article);

// Export the model
module.exports = Article;