import app from "../../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

const server = use(chaiHttp)
let requester = undefined
let testingId = 1

describe("Testing Users", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing GET users API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/users").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET admin and normalusers API", function() {
        it("Should return status 200", function(done) {
            requester.get("/api/adminandnormalusers").end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing GET one user API", function() {
        it("Should return status 200", function(done) {
            requester.get(`/api/user/${testingId}`).end((err, res) => {
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