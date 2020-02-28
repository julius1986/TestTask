const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("all users")
})

router.get("/:userId", (req, res) => {
    res.send("get user by id ",req.params.userId);
});

module.exports = router;