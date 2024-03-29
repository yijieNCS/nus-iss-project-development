import app from "../../src/app.js"
import { expect, use } from "chai"
import chaiHttp from "chai-http"

const server = use(chaiHttp)
let requester = undefined

describe("Testing registration", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing the registration function: Success", function() {
        it("Should return 200", function(done) {
            const successMsg = "User registered successfully"
            const testData = {
                firstName: "Zuko",
                lastName: "Prince",
                username: "PrinceZuko",
                email: "PrinceZuko@gmail.com",
                password: "passPZ",
                reEnterPassword: "passPZ",
                bDay: new Date(),
                gender:'M',
                admin:'N'
            }
            requester.post("/api/register").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body['success']).to.be.equal(successMsg)
                done()
            })
        })
    })


    describe("Testing the registration function: UserName Exists", function() {
        it("Should return 400 with error message", function(done) {
            const errorMsg = "User already exists"
            const testData = {
                firstName: "John",
                lastName: "Doe",
                username: "JohnDoe",
                email: "JohnDoe@gmail.com",
                password: "passJD",
                reEnterPassword: "passJD",
                bDay: new Date(),
                gender:'M',
                admin:'N'
            }
            requester.post("/api/register").send(testData).end((err, res) => {
                expect(res).to.have.status(400)
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