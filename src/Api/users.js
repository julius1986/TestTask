const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require("../Models/User");
const checkMail = require("../Utils/checkMail");

router.get("/", async (req, res) => {
    const users = await Users.find({});
    let result = users.length?users:"cant find any users"
    res.send(result);
})

router.get("/:userId",async (req, res) => {
    const users = await Users.findOne({
      _id: new mongoose.Types.ObjectId(req.params.userId)
    });    
    let result = users ? users : "can't find user";
    res.send(result);
});

router.post('/', async (req, res)=>{
  if (checkMail(req.body.user.email)) {
    const newUser = new Users(req.body.user);
    await newUser.save(function(err) {
      if (err) {
        res.send({result:false});
      } else {
        res.send({ result: true });
      }
    });
  }
  else{
    res.send({ result: false });
  }
  
})

module.exports = router;