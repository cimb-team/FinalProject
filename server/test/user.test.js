const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { deleteUser } = require("./helpers/deleteDb.js");

chai.use(chaiHttp);

const expect = chai.expect;

describe("User sign up and signin", () => {
  after(() => {
    deleteUser();
  });
  describe("POST /signup", () => {
    it("Register Success (201)", done => {
      chai
        .request(app)
        .post("/signup")
        .send({ name: "orvin", email: "orvin@mail.com", password: "orvin123", phonenumber: '08973531523' })
        .then(res => {
          console.log(res.body)
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("password");
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
          expect(res.body.message).to.equal("User validation failed: email: orvinmail.com invalid email format!");
          expect(res.body.name).to.equal("ValidationError");
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
        .send({ name: "orvin", email: "orvin@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("User validation failed: email: Validator failed for path `email` with value `orvin@mail.com`");
          expect(res.body.name).to.equal("ValidationError");
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
        .send({ name: "orvin", email: "orvin1@mail.com", password: "" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("User validation failed: password: Password is required");
          expect(res.body.name).to.equal("ValidationError");
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
        .send({ name: "orvin", email: "", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("User validation failed: email: Email is required");
          expect(res.body.name).to.equal("ValidationError");
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
        .send({ name: "", email: "orvin3@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("User validation failed: name: Name is required");
          expect(res.body.name).to.equal("ValidationError");
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
        .send({ name: "orvin", email: "orvin3@mail.com", password: "orvin123", phonenumber: '08210' })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("User validation failed: phonenumber: Minimal 8 digits");
          expect(res.body.name).to.equal("ValidationError");
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
  describe("POST /signin", () => {
    it("should send token with 400 status code", done => {
      chai
        .request(app)
        .post("/signin")
        .send({ asd: "orvin@mail.com", password: "orvin123" })
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
});
