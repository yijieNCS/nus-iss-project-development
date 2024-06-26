import app from "../../src/app.js"
import { expect, use } from "chai"
import chaiHttp from "chai-http"

const server = use(chaiHttp)
let requester = undefined

describe("Testing Login", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing the login function: Success", function() {
        it("Should return 200 with access token", function(done) {
            const testData = {
                username: "JohnDoe",
                password: "passJD"
            }
            requester.post("/api/login").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe("Testing the login function: Wrong Username", function() {
        it("Should return 401 with error message", function(done) {
            const errorMsg = "Username does not exist"
            const testData = {
                username: "SampleError",
                password: "passJD"
            }
            requester.post("/api/login").send(testData).end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body['error']).to.be.equal(errorMsg)
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