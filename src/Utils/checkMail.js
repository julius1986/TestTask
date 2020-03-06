module.exports = function checkMail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};