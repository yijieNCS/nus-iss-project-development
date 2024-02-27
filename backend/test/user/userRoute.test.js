import app from "../../src/app.js"
import { expect, use } from "chai"
import chaiHttp from "chai-http"

const server = use(chaiHttp)
let requester = undefined
let testingId = undefined

describe("Testing User REST Apis", function(){

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing POST one user API", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "age": 22,
                "dateJoined": "2024-01-01 15:00:00",
                "firstName": "TestMan22",
                "lastName": "Testing22",
                "email": "Test@testmail.com",
                "education": "Bachelor degree of Computer Science",
                "username": "testman23",
                "password": "testing123",
                "birthDate": "2023-04-01 12:00:00",
                "gender": "M"
            }

            requester.post("/api/user").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]
                console.log(testingId)
                done()
            })
        })
    })
})

describe("Testing REST APIs", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    after(function() {
        requester = server.request(app).close()
    })

    describe("Testing GET Request", function() {
        it("Should return 200", function() {

        })
    })

})