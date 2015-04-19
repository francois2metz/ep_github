var settings = require('ep_etherpad-lite/node/utils/Settings');
var githubAuth = require('github-auth');
var config = {
    team: 'test',
    organization: settings.users.github.org,
    autologin: true // This automatically redirects you to github to login. 
};
var gh = githubAuth(settings.users.github.appId,settings.users.github.appSecret, config);

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
