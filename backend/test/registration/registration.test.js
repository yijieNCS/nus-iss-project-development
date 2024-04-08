import app from "../../src/app.js"
import { adminUserCreator, normalUserCreator } from "../../src/register/registerFactory.factory.js";
import { expect, use } from "chai"
import chaiHttp from "chai-http"

const server = use(chaiHttp)
let requester = undefined
let testingId = undefined

describe("Testing registration", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing Admin User Creation", function() {
        it ("Should create an Admin User", function(done) {
            const testData = {
                "firstName": "Admin2",
                "email": "admin02@gmail.com",
                "username": "admin2",
                "password": "passAd2",
                "admin": true
            }
            const response = adminUserCreator(testData)
            expect(response).to.not.have.property('lastName')
            done()
        })
    })

    describe("Testing Normal User Creation", function() {
        it ("Should create a Normal User", function(done) {
            const testData = {
                "firstName": "Prince",
                "lastName": "Zuko",
                "email": "princeZuko@gmail.com",
                "username": "admin2",
                "password": "passAd2",
                "birthDate": "2016-04-01 11:31:47",
                "gender": "Male",
                "admin": false
            }

            const response = normalUserCreator(testData)

            const today = new Date()
            const birthDate = new Date(testData['birthDate'])
            let age = today.getFullYear() - birthDate.getFullYear()
            const monthDiff = today.getMonth() - birthDate.getMonth()
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            expect(response).to.have.property('age').to.equal(age)
            expect(response).to.have.property('lastName').equal(testData['lastName'])
            done()
        })
    })

    describe("Testing Register User to Database", function() {
        it("Should return status 200", function(done) {
            const testData = {
                "firstName": "Prince",
                "lastName": "Zuko",
                "email": "princeZuko@gmail.com",
                "username": "princeZuko",
                "password": "passPZ",
                "birthDate": "2016-04-01 11:31:47",
                "gender": "Male",
                "admin": false
            }

            requester.post("/api/register").send(testData).end((err, res) => {
                expect(res).to.have.status(200)
                testingId = res.text.split(" ")[2]
                done()
            })
        })
    })

    describe("Testing DELETE one User by Username API", function() {
        it("Should return status 200", function(done) {
            requester.delete(`/api/username/princeZuko`).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

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
                birthDate: new Date(),
                gender:'Male',
                admin: false
            }
            //note gender here is male as in the regcontroller if male , gen =m else f
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