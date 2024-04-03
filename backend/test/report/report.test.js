import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

const server = use(chaiHttp)
let requester = undefined
let testingId = undefined

describe("Testing Report", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing POST one report API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "report": 'very bad tutor',
                "reportedUser": 1,
                "reportBy": 3,
            }
            requester.post("/api/report").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]
                done()
            })
        })
    })

    describe("Testing GET reports API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/reports").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET one report API", function() {
        it("Should return status 200", function(done) {
            requester.get(`/api/report/${testingId}`).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing UPDATE one report", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "reportId": testingId,
                "report": 'very bad and horrible tutor',
                "reportedUser": 1,
                "reportBy": 3,
            }

            requester.put("/api/report").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing the reportedUser function: Success", function() {
        it("Should return 200", function(done) {
            const testData = {
                "reportedUser": 1,
            }
            requester.get(`/api/reporteduser/${testData.reportedUser}`).end((err, res) => {
                expect(res).to.have.status(200)
                // Check the properties of the first report in the array
                const firstReport = res.body[0];
                expect(firstReport).to.have.property('reportId');
                expect(firstReport).to.have.property('report').to.equal('very bad and horrible tutor');
                expect(firstReport).to.have.property('reportedUser').to.equal(1);
                expect(firstReport).to.have.property('reportBy').to.equal(3);
                done()
            })
        })
    })

    describe("Testing DELETE one report API", function() {
        it("Should return status 200", function(done) {
            requester.delete(`/api/report/${testingId}`).end((err, res) => {
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