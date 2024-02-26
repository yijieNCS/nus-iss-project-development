import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

const server = use(chaiHttp)
let requester = undefined
let testingId = undefined

describe("Testing Session", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing POST one resume API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "userId": 1,
                "years": "2024-05-09 15:35:00",
                "name": "cktest",
                "types": "math",
                "description":"best tutor2"
            }
            requester.post("/api/resume").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]
                done()
            })
        })
    })

    describe("Testing GET resumes API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/resumes").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET one resume API", function() {
        it("Should return status 200", function(done) {
            requester.get(`/api/resume/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing UPDATE one resume", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "resumeId": testingId,
                "userId": 1,
                "years": "2024-05-09 15:35:00",
                "name": "cktest",
                "types": "math",
                "description":"best tutor2"
            }

            requester.put("/api/resume").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing DELETE one resume API", function() {
        it("Should return status 200", function(done) {
            requester.delete(`/api/resume/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    after(function() {
        server.request(app).close()
    })

})