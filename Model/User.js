const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: { type: String, required: true, index: true, lowercase: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Define the model
const User = mongoose.model("User", user);

// Export the model
module.exports = User;
