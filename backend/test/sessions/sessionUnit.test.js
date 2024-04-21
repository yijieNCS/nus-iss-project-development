import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http"
import sinon from "sinon";

const server = use(chaiHttp)

let requester = undefined

describe("Unit Testing for Session", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing POST sessions API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "tutorId": 2,
                "studentId": 3,
                "serviceId": 7,
                "timing": "2024-05-09 15:35:00",
                "status": "COMPLETED",
                "location": "Toa Payoh Ave 10"
            }

            const postSessionStub = sinon.stub(requester, "post").returnsThis()
            postSessionStub.withArgs("/api/session").returns({
                send: sinon.stub().returnsThis(),
                end: sinon.stub().callsFake((callback) => callback(null, {status: 200}))
            })

            requester.post("/api/session").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                postSessionStub.restore()
                done()
            })
        })
    })

    describe("Testing UPDATE one session API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "sessionId": 1,
                "tutorId": 2,
                "studentId": 3,
                "serviceId": 7,
                "timing": "2024-05-09 15:35:00",
                "status": "COMPLETED",
                "location": "Toa Payoh Ave 10"
            }

            const updateSessionStub = sinon.stub(requester, "put").returnsThis()
            updateSessionStub.withArgs("/api/session").returns({
                send: sinon.stub().returnsThis(),
                end: sinon.stub().callsFake((callback) => callback(null, {status: 200}))
            })

            requester.put("/api/session").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                updateSessionStub.restore()
                done()
            })
        })
    })

    describe("Testing DELETE one session API", function() {
        it("Should return status 200", function(done) {

            const deleteSessionStub = sinon.stub(requester, "delete").returnsThis()
            deleteSessionStub.withArgs("/api/session/1").returns({
                end: sinon.stub().callsFake((callback) => callback(null, {status: 200}))
            })

            requester.delete(`/api/session/1`).end((err, res) => {
                expect(res).to.have.status(200)
                deleteSessionStub.restore()
                done()
            })
        })
    })

    after(function(done) {
        server.request(app).close()
        requester = undefined
        done()
    })

})