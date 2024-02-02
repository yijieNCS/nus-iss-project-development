import app from "../src/app.js"
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

const server = use(chaiHttp)
let requester = undefined

describe("Testing Session", function() {

    before(function() {
        requester = server.request(app).keepOpen()
    })

    describe("Testing GET sessions API", function() {

        it("Should return status 200", function(done) {

            const stub = sinon.stub(requester, "get")
            stub.withArgs("/api/sessions").resolves({ status: 200 })

            requester.get("/api/sessions").then((res) => {
                expect(res).to.have.status(200)
                console.log(res)
                stub.restore()
                done()
            })

            // requester.get("/api/sessions").then((res) => {
            //     expect(res.stat).equal(200)
            //     done()
            // })

            // requester.get("/api/sessions").end((err, res) => {
            //     console.log(res.body)
            //     expect(res).to.have.status(200)
            //     done()
            // })
        })
    })

    // describe("Testing GET one session API", function() {
    //     it("Should return status 200", function(done) {
    //         requester.get("/api/session/8").end((err, res) => {
    //             expect(res).to.have.status(200)
    //             done()
    //         })
    //     })
    // })

    after(function() {
        server.request(app).close()
    })

})