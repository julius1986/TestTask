const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./Api/users');
const Users = require('./Models/User');

mongoose.connect("mongodb://localhost:27017/TestDB?readPreference=primary", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/users", users)

app.get("/testlink", (req, res) => {
    res.send("test response")
})

app.listen(3000, () => console.log("Server started on port", 3000))