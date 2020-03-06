const request = require("supertest");
const {
  app,
  server
} = require("../app");
const mongoose = require('mongoose');
const User = require('../Models/User');

afterAll(function () {
  mongoose.disconnect()
  server.close();
});

describe("Get request '/users'", () => {
  it("should get all users", done => {
    request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done()
      });
    })

  it("should get one user by id", async (done)=>{
    const testModel = {
      firstName: "Vasya",
      lastName: "Pushkin",
      email: "misha@gmail.com",
      eventDate: 1583516437
    };
    const usr = await (new User(testModel)).save();
    const input = usr._id;
    request(app)
      .get("/users/"+input)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async function(err, res) {
        await User.deleteOne({_id:usr._id})
        if (err) return done(err);       
        expect(res.body).toMatchObject(usr);
        done();
      });
  });
});

describe("Post request '/users'", () => {
  it("should add new user, and back 'true' ", done => {
    const input = {
      firstName: "Misha",
      lastName: "Petrow",
      email: "misha@gmail.com",
      eventDate: "2020-03-04T10:56:20.833Z"
    };
    const output = {
      result: true,
      body: input
    };
    request(app)
      .post("/users")
      .send(input)
      .set("Accept", "application/json")
      .expect(200)
      .end(async function (err, res) {
        await User.deleteOne({_id:res.body.body._id})
        if (err) return done(err);
        expect(res.body).toMatchObject(output);        
        done();
      });
  });

  it("should try to add new user(with wrong email) and back 'false' with message ", done => {
    const output = {
      result: false,
      body: "bad email"
    };
    const input = {
      firstName: "Misha",
      lastName: "Petrow",
      email: "@gmail.com",
      eventDate: "1583319380833"
    };
    request(app)
      .post("/users")
      .send(input)
      .set("Accept", "application/json")
      .expect(200, output)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

});