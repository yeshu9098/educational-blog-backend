const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yeshu:qwerty123@cluster0.9yeyb.mongodb.net/')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


  // mongodb+srv://yeshu:qwerty123@cluster0.9yeyb.mongodb.net/
  // mongodb+srv://yeshu:qwerty123@cluster.1vhikjv.mongodb.net/