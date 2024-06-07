const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yeshu9098:qwerty123@cluster.1vhikjv.mongodb.net/')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


  // mongodb+srv://yeshu9098:qwerty123@cluster.1vhikjv.mongodb.net/