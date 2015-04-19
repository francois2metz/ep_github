var settings = require('ep_etherpad-lite/node/utils/Settings'),
    ghSettings = settings.users.github,
    githubAuth = require('github-auth');

var ghConfig = ghSettings.config;
ghConfig.autologin = true;

var gh = githubAuth(ghSettings.appId,
                    ghSettings.appSecret,
                    ghConfig);

exports.expressConfigure = function(hook_name, args, cb) {
    var app = args.app;
    app.get('/login', gh.login);
    app.use(gh.authenticate);
    app.use(function(req, res, next) {
        if (req.path.match(/^\/(static|javascripts|pluginfw)/)) {
            // Don't ask for github auth for static paths
            next();
        } else {
            // Use Github Auth
            if (!req.github) return res.send('<a href="/login">Please login</a>');
            if (!req.github.authenticated) return res.send('You shall not pass');
            next();
        }
    });
}
