const mongoose = require('mongoose');

/*
- First name (required)
- Last name (required)
- Email (required, valid email address)
- Event date (required, simple date picker)
*/
var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;