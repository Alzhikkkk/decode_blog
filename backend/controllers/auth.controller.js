const {User, Sequelize} = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config/config')
const path = require('path');


// console.log(path.join(__dirname, "../", "/mail-templates/signup/index.html"))



const createUser = async ({email, password, full_name, nickname, password1}) => {
   console.log(User);
    return new Promise(resolve => {
    
      if(password !== password1) return resolve(null);
        console.log(email)
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Store hash in your password DB.
                const newuser = await User.create({
                    email,
                    password: hash,
                    full_name,
                    nickname
                })
                 console.log(newuser);
                resolve(newuser)
            });
          });
        });
}

const getUserById = id => new Promise(async resolve => {
  const user = await User.findOne({
   where: {
       id,
   }
  });
  resolve(user)
})

const login = user => new Promise(async resolve => {
  const isUser = await User.findOne({
      where:{
          email: user.body.email
      }
  })
  if(!isUser) return resolve(null)



  bcrypt.compare(user.body.password, isUser.password, function(err, isMatch) {
     if(!isMatch) return resolve(null)
     const token = jwt.sign({
      exp: (Math.floor(Date.now() / 1000) + (60 * 60)) * 24 * 365,
      email: isUser.email,
      id: isUser.id
    }, SECRET_KEY);
    resolve(token);
  })
})

const signInLocal = function(req, res) {
    res.redirect('/profile/' + req.user.nickname);
  }


const signOut = (req, res) => {
    req.logout();
    res.redirect('/');
  }


module.exports = {
    createUser,
    signInLocal,
    getUserById,
    signOut,
    login
}