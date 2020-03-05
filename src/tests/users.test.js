const request = require("supertest");
const app = require("../app");

describe("Get request", () => {
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

describe("Post request", () => {
  it("should add new user, and back 'true' ", done => {
    request(app)
      .post("/users")
      .send({
        firstName: "Misha",
        lastName: "Petrow",
        email: "misha@gmail.com",
        eventDate: "1583319380833"
      })
      .set("Accept", "application/json")
      .expect(200, {result:true})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Post request", () => {
  it("should try to add new user(with wrong email) and back 'false' ", done => {
    request(app)
      .post("/users")
      .send({
        firstName: "Misha",
        lastName: "Petrow",
        email: "@gmail.com",
        eventDate: "1583319380833"
      })
      .set("Accept", "application/json")
      .expect(200, { result: false,  })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
