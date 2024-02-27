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

    describe("Testing POST one session API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "tutorId": 4,
                "studentId": 1,
                "timing": "2024-05-09 15:35:00",
                "status": "COMPLETED",
                "location": "Toa Payoh Ave 10"
            }
            requester.post("/api/session").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]
                done()
            })
        })
    })

    describe("Testing GET sessions API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/sessions").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET one session API", function() {
        it("Should return status 200", function(done) {
            requester.get(`/api/session/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing UPDATE one session", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "sessionId": testingId,
                "tutorId": 4,
                "studentId": 1,
                "timing": "2024-05-09 15:35:00",
                "status": "COMPLETED",
                "location": "Toa Payoh Ave 10"
            }

            requester.put("/api/session").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing DELETE one session API", function() {
        it("Should return status 200", function(done) {
            requester.delete(`/api/session/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    after(function(done) {
        server.request(app).close()
        done()
    })

})