const User = require('../Model/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.secretKey;

async function signup(req) {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists!', existingUser);
      return 'User already exists!!!';
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashPassword });

    // Save the new user
    const savedUser = await newUser.save();
    console.log('User Saved:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Error saving user');
  }
}


async function login(req) {
    try {
        const { email, password } = req.body;
        const doc = await User.findOne({ email });

        if (!doc) {
            return 'User does not exist!';
        }

        const match = await bcrypt.compare(password, doc.password);
        
        if (match) {
            const token = jwt.sign({
                id: doc._id,
                username: doc.username,
            }, secretKey);
            return token;
        } else {
            return 'Incorrect password!';
        }
    } catch (error) {
        console.error('Error during login:', error);
        return error.message;
    }
}


async function getAdminDetails(req, res) {
  try {
    // Fetch the authenticated user's details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching admin details:', error);
    res.status(500).json({ message: 'Error fetching admin details' });
  }
}

module.exports = {
    signup,
    login,
    getAdminDetails
}