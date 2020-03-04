require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./Api/users');
const cors = require('cors');
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/users", users)

app.get("/testlink", (req, res) => {
    res.send("test response")
})

app.listen(process.env.SERVER_PORT, () =>
  console.log("Server started on port", process.env.SERVER_PORT)
);