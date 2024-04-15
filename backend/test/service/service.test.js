import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

const server = use(chaiHttp)
let requester = undefined
let testingId = undefined

describe("Testing Services", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing POST one service API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "userId": 1,
                "subject": "MATH",
                "topic": "Algebra",
                "experience": 3,
                "rate": 30
            }
            requester.post("/api/service").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]
                done()
            })
        })
    })

    describe("Testing GET services API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/services").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET one service API", function() {
        it("Should return status 200", function(done) {
            requester.get(`/api/service/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET service by Subject API", function() {
        it("Should return status 200", function(done) {
            const subject = "MATH"
            requester.get(`/api/serviceSearchSubject/${subject}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET service by Topic API", function() {
        it("Should return status 200", function(done) {
            const topic = "Algebra"
            requester.get(`/api/serviceSearchTopic/${topic}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    
    describe("Testing UPDATE one service", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "serviceId": testingId,
                "userId": 1,
                "subject": "PHYSICS",
                "topic": "Static Materials",
                "experience": 3,
                "rate": 50
            }

            requester.put("/api/service/").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing DELETE one service API", function() {
        it("Should return status 200", function(done) {
            requester.delete(`/api/service/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })
    

    after(function(done) {
        server.request(app).close()
        requester = undefined
        testingId = undefined
        done()
    })

})