const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors');
const app = express();
const db = require('./db')
const userController = require('./Controller/userController')

// Add middleware to parse JSON bodies
app.use(bodyparser.json());

// Use cors middleware
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello Yeeshu!');
});

app.post('/signup', async (req, res) => {
    let result = await userController.signup(req);
    return res.status(200).json({'message': result});
})

app.post('/login', async (req, res) => {
    let result = await userController.login(req);
    return res.status(200).json({'token': result});
})

app.listen(3000);
console.log('Server is running on port 3000')