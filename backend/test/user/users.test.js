import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

const server = use(chaiHttp)
let requester = undefined
let testingId = undefined

describe("Testing Users", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing POST one user API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "age":26,
                "dateJoined":null,
                "firstName":"Queen",
                "lastName":"Rogue",
                "email":"QueenRogue@gmail.com",
                "education":"Bachelor of Computer Science",
                "username":"QueenR",
                "password":"passQR",
                "birthDate":"19900111",
                "gender":"F"
            }
            requester.post("/api/user").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]   //res.body:  User Id: 7 is created Successfully , 7 is the testing id for this case
                done()
            })
        })
    })

    describe("Testing GET users API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/users").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    // describe("Testing GET one user API", function() {
    //     it("Should return status 200", function(done) {
    //         requester.get(`/api/user/${testingId}`).end((err, res) => {
    //             expect(res).to.have.status(200)
    //             done()
    //         })
    //     })
    // })

    // describe("Testing UPDATE one user", function() {
    //     it("Should return status 200", function(done) {
    //         const testData = {
    //             "userId": testingId,
    //             "age":26,
    //             "dateJoined":null,
    //             "firstName":"Queen",
    //             "lastName":"Rogue",
    //             "email":"QueenRogue@gmail.com",
    //             "education":"Bachelor of Computer Science",
    //             "username":"QueenR",
    //             "password":"passQR",
    //             "birthDate":"19900111",
    //             "gender":"F"
    //         }
    //
    //         requester.put("/api/user").send(testData).end((err, res) => {
    //             expect(res).to.have.status(200)
    //             done()
    //         })
    //     })
    // })
    //
    // describe("Testing DELETE one User API", function() {
    //     it("Should return status 200", function(done) {
    //         requester.delete(`/api/user/${testingId}`).end((err, res) => {
    //             expect(res).to.have.status(200)
    //             done()
    //         })
    //     })
    // })

    after(function(done) {
        server.request(app).close()
        requester = undefined
        testingId = undefined
        done()
    })

})