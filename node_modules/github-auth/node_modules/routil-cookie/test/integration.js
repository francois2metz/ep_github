var http = require("http"),
    assert = require("assert"),
    request = require("request"),
    routilCookie = require("../index"),
    getCookie = routilCookie.getCookie,
    setCookie = routilCookie.setCookie,
    Jar = request.jar()

var handlers =  {
    "/get": function (req, res) {
        res.end(getCookie(req, "name"))
    },
    "/set": function (req, res) {
        setCookie(res, "name", "value")
        res.end()
    },
    "/null": function (req, res) {
        res.end(getCookie(req, "notExist") === null ? "null" : "fail")
    },
    "/multiple": function (req, res) {
        setCookie(res, {
            "foo": "bar",
            "foo2": "bar2"
        })
        res.end()
    }
}

describe("Integration tests", function () {
    var server

    before(function (done) {
        server = http.createServer(function (req, res) {
            handlers[req.url](req, res)
        })
        server.listen(3000, function () { done() })
    })

    it("should set a cookie", function (done) {
        makeRequest("/set", function (err, res, body) {
            assert.equal(res.headers["set-cookie"],
                "name=value", "set cookie header not set")
            done()
        })
    })

    it("should get a cookie", function (done) {
        makeRequest("/get", function (err, res, body) {
            assert.equal(body, "value", "cookie value is incorrect")
            done()
        })
    })

    it("should return null for non-existant cookie", function (done) {
        makeRequest("/null", function (err, res, body) {
            assert.equal(body, "null", "cookie value is incorrect")
            done()
        })
    })

    it("should set multiple cookies as an object", function (done) {
        makeRequest("/multiple", function (err, res, body) {
            var cookies = res.headers["set-cookie"]
            assert.equal(cookies[0], "foo=bar", "first cookie is incorrect")
            assert.equal(cookies[1], "foo2=bar2", "second cookie is incorrect")
            done()
        })
    })

    after(function () {
        server.close()
    })
})

function makeRequest(uri, cb) {
    request({
        uri: "http://localhost:3000" + uri,
        jar: Jar
    }, cb)
}