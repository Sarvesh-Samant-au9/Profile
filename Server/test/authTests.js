const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();
const expect = chai.expect();
const authModel = require("../Models/user");

chai.use(chaiHttp);
describe("Authenticate", () => {
  beforeEach((done) => {
    authModel.remove({}, (err) => {
      done();
    });
  });
  describe("/Post User", () => {
    it("it should not register without user email and password", (done) => {
      let data = {
        email: "helloWorld@gmail.com",
        password: "22311393",
        displayName: "Hello World",
      };
      chai
        .request(server)
        .post("/api/register")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a("object");
          // res.body.should.have.property("");
          // console.log(res.body.should.);
          // res.should.have.property("displayName");
          // res.body.should.have.property("displayName");
          // res.body.should.have.property("email");
          // res.body.should.have.property("password");

          done();
        });
    });
  });
});

// const { describe, it } = require("mocha");
// const server = require("../index");

// chai.use(chaiHttp);
// const agent = chai.request.agent(server);

// describe("Authentication", function () {
//   it("should be able to register", function (done) {
//     authModel.findOneAndRemove({ email: "sammy1140k@gmail.com" }, function () {
//       agent
//         .post("/api/register")
//         .send({
//           email: "sammy1140k@gmail.com",
//           password: "1234567890",
//         })
//         .end(function (err, res) {
//           console.log(res.body);
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
// });
// agent(function () {
//   agent.close();
// });
// // describe("AUthentication", function () {
// //   beforeEach(function (done) {
// //     let newUser = new authModel({
// //       displayName: "Hello",
// //       email: "sammy1140k@gmail.com",
// //       password: "123456",
// //     });

// //     newUser.save(function (e) {
// //       done();
// //     });
// //   });

// //   this.afterEach(function (done) {
// //     authModel.collection
// //       .drop()
// //       .then(function () {
// //         console.log("Deleted Test Data");
// //       })
// //       .catch(function () {
// //         console.log("Collection dont exist");
// //       });
// //     done();
// //   });
// // });
