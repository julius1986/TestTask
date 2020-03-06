const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require("../Models/User");
const {
  saveUser
} = require('./funcs');

router.get("/", async (req, res) => {
  const users = await Users.find({});
  let result = users.length ? users : "cant find any users"
  res.status(200).json(result);
})

router.get("/:userId", async (req, res) => {
  const users = await Users.findOne({
    _id: new mongoose.Types.ObjectId(req.params.userId)
  });
  let result = users ? users : "can't find user";
  res.send(result);
});

router.post('/', async (req, res) => {
  try {
    const result = await saveUser(req.body);
    res.send(result);
  } catch (error) {
    res.send({
      result: false
    });
  }
})

module.exports = router;