var github = require('connect_auth_github');

var settings = require('ep_etherpad-lite/node/utils/Settings');
var exp = require('ep_etherpad-lite/node_modules/express');

exports.expressConfigure = function(hook_name, args, cb) {
    args.app.use(function(req, res, next) {
        if (req.path.match(/^\/(static|javascripts|pluginfw)/)) {
            next();
        } else {
            github.orgAccess({
                appId: settings.users.github.appId,
                appSecret: settings.users.github.appSecret,
                callback: settings.users.github.callback
            }, settings.users.github.org).handle(req, res, next);
        }
    });
}
