# Routil-cookie 
[![build status][1]][2]

Cookie manipulation on req and res

## Example

    var routilCookie = require("routil-cookie"),
        getCookie = routilCookie.getCookie,
        setCookie = routilCookie.setCookie,
        http = require("http")

    http.createServer(function (req, res) {
        var value = getCookie(req, name)

        setCookie(res, name, value, options)
    })

  [1]: https://secure.travis-ci.org/Raynos/routil-cookie.png
  [2]: http://travis-ci.org/Raynos/routil-cookie