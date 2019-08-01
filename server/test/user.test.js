const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { deleteUser,deleteProduct } = require("./helpers/deleteDb.js");

chai.use(chaiHttp);

const expect = chai.expect;
var token;
var token2;
var token3;
var productId;
var productId2;

describe.only("user.test.js", () => {
  after(() => {
    deleteUser();
    deleteProduct()
  });
  describe("User sign up and signin", () => {
    describe("POST /signup", () => {
      it("Register Success (201)", done => {
        chai
          .request(app)
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin@mail.com",
            password: "orvin123",
            phonenumber: "08973531523"
          })
          .then(res => {
            console.log(res.body);
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
            expect(res.body.phonenumber).to.equal("08973531523");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("get", () => {
      it("get (200)", done => {
        chai
          .request(app)
          .get("/")
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");

            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Success (201)", done => {
        chai
          .request(app)
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin2@mail.com",
            password: "orvin123",
            phonenumber: "08973531523"
          })
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
            expect(res.body.email).to.equal("orvin2@mail.com");
            expect(res.body.password).to.not.equal("orvin123");
            expect(res.body.phonenumber).to.equal("08973531523");
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    describe("POST /signup", () => {
      it("Register Success (201)", done => {
        chai
          .request(app)
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin3@mail.com",
            password: "orvin123",
            phonenumber: "08973531523"
          })
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
            expect(res.body.email).to.equal("orvin3@mail.com");
            expect(res.body.password).to.not.equal("orvin123");
            expect(res.body.phonenumber).to.equal("08973531523");
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
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvinmail.com",
            password: "orvin123",
            phonenumber: "08973531523"
          })
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
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin@mail.com",
            password: "orvin123",
            phonenumber: "08973531523"
          })
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
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin1@mail.com",
            password: "",
            phonenumber: "08973531523"
          })
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
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "",
            password: "orvin123",
            phonenumber: "08973531523"
          })
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
          .post("/user/signup")
          .send({
            name: "",
            email: "orvin3@mail.com",
            password: "orvin123",
            phonenumber: "08973531523"
          })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Name is required, This email already used!");
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
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin3@mail.com",
            password: "orvin123",
            phonenumber: ""
          })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Phone Number is required, This email already used!");
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
          .post("/user/signup")
          .send({
            name: "orvin",
            email: "orvin3@mail.com",
            password: "orvin123",
            phonenumber: "08210"
          })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Minimal 8 digits, This email already used!");
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
          .post("/user/signin")
          .send({ email: "orvin@mail.com", password: "orvin123" })
          .then(res => {
            token = res.body.token;
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
      it("Login success (200)", done => {
        chai
          .request(app)
          .post("/user/signin")
          .send({ email: "orvin3@mail.com", password: "orvin123" })
          .then(res => {
            token3 = res.body.token;
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
      it("Login success (200)", done => {
        chai
          .request(app)
          .post("/user/signin")
          .send({ email: "orvin2@mail.com", password: "orvin123" })
          .then(res => {
            token2 = res.body.token;
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
          .post("/user/signin")
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
          .post("/user/signin")
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
          .post("/user/signin")
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
          .post("/user/signin")
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
  });
  describe("GET /user", () => {
    it("GET current user profile", done => {
      chai
        .request(app)
        .get("/user")
        .set("token", token)
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
          expect(res.body.phonenumber).to.equal("08973531523");
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
        .set("token", "opainnan2818e12h")
        .then(res => {
          console.log(res.body);
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("Error 400: Bad Request");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token)
        .type("form")
        .send({
          title: "Fox",
          category: "Animal",
          details: "Animal cool",
          initialPrice: 100,
          closedDate: "2019/09/09"
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("title");
          expect(res.body).to.have.property("userId");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("PATCH /topup", () => {
    it("add money to current user balance", done => {
      chai
        .request(app)
        .patch("/user/topup")
        .set("token", token)
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
          expect(res.body.phonenumber).to.equal("08973531523");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("GET /user/history", () => {
    it("List current user bids history", done => {
      chai
        .request(app)
        .get("/user/history")
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /product/user", () => {
    it("GET current user product", done => {
      chai
        .request(app)
        .get("/product/user")
        .set("token", token)
        .then(res => {
          console.log(res.body);
          productId = res.body[0]._id;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /product/${productId}", () => {
    it("GET current product id", done => {
      chai
        .request(app)
        .get("/product/" + productId)
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("title");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /product/${productId}", () => {
    it("GET current product id", done => {
      chai
        .request(app)
        .get("/product/123ASD123Ssaxcz")
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(404);

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /product", () => {
    it("GET current all product", done => {
      chai
        .request(app)
        .get("/product")
        .set("token", token)
        .then(res => {
          console.log(res.body, "90909090");
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]).to.have.property("title");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("patch /product/${productId}/addbid", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/addbid")
        .set("token", token2)
        .send({ price: 10001 })
        .then(res => {
          expect(res).to.have.status(400);

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("PATCH /topup", () => {
    it("add money to current user balance", done => {
      chai
        .request(app)
        .patch("/user/topup")
        .set("token", token2)
        .send({ balance: 1000000 })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("phonenumber");
          expect(res.body).to.have.property("balance");
          expect(res.body).to.have.property("image");
          expect(res.body.balance).to.equal(1000000);
          expect(res.body.name).to.equal("orvin");
          expect(res.body.email).to.equal("orvin2@mail.com");
          expect(res.body.phonenumber).to.equal("08973531523");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("PATCH /topup", () => {
    it("add money to current user balance", done => {
      chai
        .request(app)
        .patch("/user/topup")
        .set("token", token3)
        .send({ balance: 1000000 })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("phonenumber");
          expect(res.body).to.have.property("balance");
          expect(res.body).to.have.property("image");
          expect(res.body.balance).to.equal(1000000);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token)
        .type("form")
        .send({
          title: "Fox",
          category: "Animal",
          details: "Animal cool",
          initialPrice: 100,
          closedDate: "2019/09/09"
        })
        .then(res => {
          expect(res).to.have.status(201);
          productId2 = res.body._id
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("userId");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  /////
  describe("patch /product/${productId}/addbid", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId2 + "/addbid")
        .set("token", token2)
        .send({ price: 1000100000 })
        .then(res => {
          console.log(res.body, 'errrrrror')
          expect(res).to.have.status(400);

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("patch /product/${productId}/addbid", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/addbid")
        .set("token", token2)
        .send({ price: 10000 })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body.productId).to.have.property("title");
          expect(res.body.bids[0].price).to.equal(10000);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("patch /product/${productId}/addbid", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/addbid")
        .set("token", token2)
        .send({ price: 1000 })
        .then(res => {
          expect(res).to.have.status(400);
  
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("patch /product/${productId}/quickcountdown", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/quickcountdown")
        .set("token", token)
        .then(res => {
          console.log(res.body, "quickcountdown");
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("patch /product/${productId}/quickcountdown", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/quickcountdown")
        .set("token", token2)
        .then(res => {
          console.log(res.body, "quickcountdown");
          expect(res).to.have.status(401);


          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("patch /product/${productId}/quickcountdown", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/quickcountdown")
        .set("token", token)
        .then(res => {
          console.log(res.body, "quickcountdown");
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("patch /product/${productId}/addbid", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/addbid")
        .set("token", token2)
        .send({ price: 10001 })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body.productId).to.have.property("title");
          expect(res.body.bids[0].price).to.equal(10000);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("patch /product/${productId}/addbid", () => {
    it("patch product id", done => {
      chai
        .request(app)
        .patch("/product/" + productId + "/addbid")
        .set("token", token3)
        .send({ price: 10002 })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body.productId).to.have.property("title");
          expect(res.body.bids[0].price).to.equal(10000);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("get /product/${productId}", () => {
    it("get product id", done => {
      chai
        .request(app)
        .get("/product/" + productId)
        .set("token", token2)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("get /product/user", () => {
    it("get product id", done => {
      chai
        .request(app)
        .get("/product/user")
        .then(res => {
          expect(res).to.have.status(400);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("delete /product/${productId}/", () => {
    it("delete product id", done => {
      chai
        .request(app)
        .delete("/product/51as31asd5dasd")
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(404);

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("500 /product/${productId}/", () => {
    it("500 product id", done => {
      chai
        .request(app)
        .get("/error")
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(500);

          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("delete /product/${productId}/", () => {
    it("delete product id", done => {
      chai
        .request(app)
        .delete("/product/" + productId)
        .set("token", token)
        .then(res => {
          console.log(res.body, "delete");
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body.deletedCount).to.equal(1);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});
