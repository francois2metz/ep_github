var gh;
var reconfigure = function() {
    var settings = require('ep_etherpad-lite/node/utils/Settings'),
        ghSettings = settings.users.github,
        githubAuth = require('github-auth');

    var ghConfig = ghSettings.config;
    ghConfig.autologin = true;
    ghConfig.redirectUri = ghConfig.redirectUri || function(req) {
        return (ghConfig.redirectProtocol || 'https') + '://' + req.headers.host + '/ghredirect?to=' + req.originalUrl;
    };

    var gh = githubAuth(ghSettings.appId,
                        ghSettings.appSecret,
                        ghConfig);
};

exports.expressConfigure = function(hook_name, args, cb) {
    reconfigure();
    var app = args.app;
    app.get('/login', gh.login);
    app.use(gh.authenticate);
    app.use(function(req, res, next) {
        if (req.path.match(/^\/(static|javascripts|pluginfw|locales|favicon)/)) {
            // Don't ask for github auth for static paths
            next();
        } else {
            // Use Github Auth
            if (!req.github) return res.send('<a href="/login">Please login</a>');
            if (!req.github.authenticated) return res.send('You shall not pass');
            if(req.path.match(/^\/ghredirect/)) {
                var match = false;
                match = /^\/ghredirect\?to=(\/(p\/)?[A-Za-z0-9_\-]*?)(&code=.+)?$/.exec(req.originalUrl);
                var href = match ? match[1] : '/';
                if(!res.headerSent) {
                    res.statusCode = 302;
                    res.addTrailers({'Location': href});
                }
                return res.send('<a href="'+href+'">redirect to '+href+' in 2 seconds</a><script>setTimeout(function(){window.location.href="'+href+'"}, 2000)</script>');
            }
            next();
        }
    });
}
