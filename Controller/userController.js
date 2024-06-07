const User = require('../Model/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.secretKey;

async function signup(req){
    return new Promise((resolve, reject)=>{
        const { username, email, password } = req.body;
        // console.log(req.body);
        let hashPassword = bcrypt.hashSync(password, 10);
        // console.log('hashPassword: ' + hashPassword);
        const newUser = new User({username, email, password: hashPassword});
        // console.log(newUser)

        User.findOne({email}).then((i)=>{
            if(i){
                console.log('email already exists!', i);
                resolve('User already exists!!!');
            }
            else{
                newUser.save().then((savedUser)=>{
                    console.log('User Saved : ', savedUser);
                    resolve(newUser)
                })
                .catch((error)=>{
                    console.log('Error saving User : ', error);
                    reject(false);
                });
            }
        })
    })
}


async function login(req){
    return new Promise((resolve, reject)=>{
        const { email, password } = req.body;
        User.findOne({email}).then((doc)=>{
            if(!doc){
                resolve('User does not exists!');
            }
            //compare password 
        bcrypt.compare(password, doc.password, function(err, res) {
            if(res)
            {
               // resolve( "login successfull")
               let data = {
                   id : doc._id,
                   username: doc.username,
               }             
               const token = jwt.sign(data, secretKey);
               resolve(token);
               console.log('Login Successful!')
            }
            else{
               resolve("password incorrect")
               console.log("Wrong Credentials!")
            }
         });
        })
        .catch((error)=>{
            resolve(error);
        })
    })
}

module.exports = {
    signup,
    login
}