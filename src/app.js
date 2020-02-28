const express = require('express');
const app = express();
const users = require('./Api/users');

app.use("/users", users)

app.get("/testlink", (req, res) => {
    res.send("test response")
})

app.listen(3000, () => console.log("Server started on port", 3000))