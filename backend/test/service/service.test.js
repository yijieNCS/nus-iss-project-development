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

    describe("Testing POST one service API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "userId": 1,
                "rate": 8.50
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

    describe("Testing UPDATE one service", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "serviceId": testingId,
                "userId": 1,
                "rate": 8.50
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
    

    after(function() {
        server.request(app).close()
    })

})