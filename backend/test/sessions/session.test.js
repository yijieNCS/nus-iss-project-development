import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import {studentSessionCreator, tutorSessionCreator} from "../../src/sessions/sessionFactory.factory.js";

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
                "tutorId": 2,
                "studentId": 3,
                "serviceId": 7,
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
                "tutorId": 2,
                "studentId": 3,
                "serviceId": 7,
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

    describe("Testing Student Session Creator", function() {
        it("Should return Student Session", function(done) {
            const testData = {
                sessionId: 1,
                tutorId: 4,
                studentId: 2,
                timing: "15:30:20",
                session: "PENDING",
                location: "LOCATION X",
                education: "DEGREE X",
                rate: 5,
                subject: "MATH",
                topic: "ALGEBRA"
            }

            const studentSession = studentSessionCreator(testData)
            expect(studentSession).to.have.property('education').to.equal("DEGREE X");
            expect(studentSession).to.have.property('rate').to.equal(5);
            done()
        })
    })

    describe("Testing Tutor Session Creator", function() {
        it("Should return Tutor Session", function(done) {
            const testData = {
                sessionId: 1,
                tutorId: 4,
                studentId: 2,
                timing: "15:30:20",
                session: "PENDING",
                location: "LOCATION X",
                education: "DEGREE X",
                rate: 5,
                subject: "MATH",
                topic: "ALGEBRA"
            }

            const tutorSession = tutorSessionCreator(testData)
            expect(tutorSession).to.have.property('subject').to.equal("MATH");
            expect(tutorSession).to.have.property('topic').to.equal("ALGEBRA");
            done()
        })
    })

    after(function(done) {
        server.request(app).close()
        requester = undefined
        testingId = undefined
        done()
    })

})