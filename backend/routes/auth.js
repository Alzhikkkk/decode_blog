const express = require('express');
const router = express.Router();
const {User, Sequelize} = require("../models");
const {createUser, login, signOut} = require('../controllers/auth.controller')
const {registrationValidator} = require('../middleware/auth.middleware');

router.post("/api/auth/signup", async (req, res) =>{
   try{
      const user = await createUser({
         email:req.body.email,
         full_name:req.body.full_name,
         nickname:req.body.nickname,
         password:req.body.password,
         password1:req.body.password1
      })
      // console.log(user);
      res.status(200).send(user)
  }catch(error){
      res.status(400).send(error)
  }
})

router.post('/api/signin', async (req, res) => {
   console.log(req.user);
     const token = await login(req)
     if(token){
         const isUser = await User.findOne({
            where:{
               email: req.body.email
            }
         })
        res.status(200).send({token, nickname:isUser.nickname, user_id: isUser.id});
     }else{
        res.status(401).end();
     }
})

router.get('/api/auth/signout', signOut);

module.exports = router