var github = require('connect_auth_github');

var settings = require('ep_etherpad-lite/node/utils/Settings');
var exp = require('ep_etherpad-lite/node_modules/express');

exports.expressConfigure = function(hook_name, args, cb) {
    args.app.use(function(req, res, next) {
        if (req.url.match(/^\/static/) || req.url.match(/^\/javascripts/)) {
            next();
        } else {
            github.orgAccess({
                appId: settings.users.github.appId,
                appSecret: settings.users.github.appSecret,
                callback: settings.users.github.callack
            }, settings.users.github.org).handle(req, res, next);
        }
    });
}
