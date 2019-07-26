const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { deleteUser } = require("./helpers/deleteDb.js");

chai.use(chaiHttp);

const expect = chai.expect;
var token

describe('user.test.js', () => {
  after(() => {
    deleteUser();
  });
  describe("User sign up and signin", () => {
    describe("POST /signup", () => {
      it("Register Success (201)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "orvin@mail.com", password: "orvin123", phonenumber: '08973531523' })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("email");
            expect(res.body).to.have.property("phonenumber");
            expect(res.body).to.have.property("balance");
            expect(res.body.balance).to.equal(0);
            expect(res.body.name).to.equal("orvin");
            expect(res.body.email).to.equal("orvin@mail.com");
            expect(res.body.password).to.not.equal("orvin123");
            expect(res.body.phonenumber).to.equal('08973531523');
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, invalid email)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "orvinmail.com", password: "orvin123", phonenumber: '08973531523' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Invalid email format!");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, email already exist)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "orvin@mail.com", password: "orvin123", phonenumber: '08973531523' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("This email already used!");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, without password)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "orvin1@mail.com", password: "", phonenumber: '08973531523' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Password is required");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, without email)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "", password: "orvin123", phonenumber: '08973531523' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Email is required");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, without name)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "", email: "orvin3@mail.com", password: "orvin123", phonenumber: '08973531523' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Name is required");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, without phone number)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "orvin3@mail.com", password: "orvin123", phonenumber: '' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Phone Number is required");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Failed (400, phone number < 8 digits)", done => {
        chai
          .request(app)
          .post("/signup")
          .send({ name: "orvin", email: "orvin3@mail.com", password: "orvin123", phonenumber: '08210' })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Minimal 8 digits");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signin", () => {
      it("Login success (200)", done => {
        chai
          .request(app)
          .post("/signin")
          .send({ email: "orvin@mail.com", password: "orvin123" })
          .then(res => {
            token = res.body.token
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("token");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signin", () => {
      it("Login failed (400, password less than 8)", done => {
        chai
          .request(app)
          .post("/signin")
          .send({ email: "orvin@mail.com", password: "orvin" })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Invalid email or password");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signin", () => {
      it("Login failed (400, invalid email)", done => {
        chai
          .request(app)
          .post("/signin")
          .send({ email: "orvinmail.com", password: "orvin123" })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Invalid email or password");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signin", () => {
      it("Login failed (400, without email)", done => {
        chai
          .request(app)
          .post("/signin")
          .send({ email: "", password: "orvin123" })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Invalid email or password");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signin", () => {
      it("Login failed (400, without password)", done => {
        chai
          .request(app)
          .post("/signin")
          .send({ email: "asd", password: "" })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Invalid email or password");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  })
  describe("GET /user", () => {
    it("GET current user profile", done => {
      chai
        .request(app)
        .get("/user")
        .set('token', token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("phonenumber");
          expect(res.body).to.have.property("balance");
          expect(res.body).to.have.property("image");
          expect(res.body.balance).to.equal(0);
          expect(res.body.name).to.equal("orvin");
          expect(res.body.email).to.equal("orvin@mail.com");
          expect(res.body.phonenumber).to.equal('08973531523');
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it("invalid token", done => {
      chai
        .request(app)
        .get("/user")
        .set('token', 'opainnan2818e12h')
        .then(res => {
          console.log(res.body)
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Error 400: Bad Request');
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  describe("Update User", () => {
    describe("PATCH /topup", () => {
      it("add money to current user balance", done => {
        chai
          .request(app)
          .patch("/topup")
          .set('token', token)
          .send({ balance: 100000 })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("email");
            expect(res.body).to.have.property("phonenumber");
            expect(res.body).to.have.property("balance");
            expect(res.body).to.have.property("image");
            expect(res.body.balance).to.equal(100000);
            expect(res.body.name).to.equal("orvin");
            expect(res.body.email).to.equal("orvin@mail.com");
            expect(res.body.phonenumber).to.equal('08973531523');
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
  })
  describe("GET /user/history", () => {
    it("List current user bids history", done => {
      chai
        .request(app)
        .get("/user/history")
        .set('token', token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
})
