var cookie = require("cookie")

module.exports = {
    getCookie: getCookie,
    setCookie: setCookie
}

function setCookie(res, name, value, options) {
    if (typeof name === "object") {
        options = value
        var cookies = Object.keys(name).map(toCookie)
        res.setHeader("set-cookie", cookies)
        return
    }

    var serialized = cookie.serialize(name, value, options)
    res.setHeader("set-cookie", serialized)

    function toCookie(key) {
        return cookie.serialize(key, name[key], options)
    }
}

function getCookie(req, name) {
    if (!req.headers.cookie) {
        return null
    }
    var cookies = cookie.parse(req.headers.cookie),
        value = cookies[name]

    if (value === undefined) {
        return null
    }
    return value
}