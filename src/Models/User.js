const mongoose = require('mongoose');

/*
- First name (required)
- Last name (required)
- Email (required, valid email address)
- Event date (required, simple date picker)
*/
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  eventDate: [Date]
});

var User = mongoose.model("User", userSchema);

module.exports = User;