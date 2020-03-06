const checkMail = require("../Utils/checkMail");
const findEmtyField = require("../Utils/findEmtyField");
const Users = require("../Models/User");

async function saveUser(usr) {
    try {
        if (!findEmtyField(usr)) throw "can't add new user";
        if (!checkMail(usr.email)) throw "bad email";
        const newUser = new Users(usr);
        const user = await newUser.save();
        return {
          result: true,
          body: user
        };
    } catch (error) {
        return {
            result: false,
            body: error
        };
    }
};


module.exports = {
    saveUser
}