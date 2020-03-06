const request = require("supertest");
const {app,server} = require("../app");
const mongoose = require('mongoose');

beforeAll(function() {
  console.log("Before");
});

afterAll(function() {
  mongoose.disconnect()
  server.close();
});


describe("Get request '/users'", () => {
  it("should get all users",  (done) => {
     request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done()
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
    const output = { result: true, body:input };
    request(app)
      .post("/users")
      .send(input)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
         expect(res.body).toMatchObject(output);
        if (err) return done(err);
        done();
      });
  });

  it("should try to add new user(with wrong email) and back 'false' ", done => {
    const output = { result: false, body: "bad email" };
    request(app)
      .post("/users")
      .send({
        firstName: "Misha",
        lastName: "Petrow",
        email: "@gmail.com",
        eventDate: "1583319380833"
      })
      .set("Accept", "application/json")
      .expect(200, output)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});
