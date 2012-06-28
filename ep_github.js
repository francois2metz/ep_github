var express = require('express');
var github = require('connect_auth_github');
var settings = require('ep_etherpad-lite/node/utils/Settings');
var randomString = require('ep_etherpad-lite/static/js/pad_utils').randomString;

exports.expressConfigure = function(hook_name, args, cb) {
    args.app.use(express.cookieParser());
    args.app.use(express.session({ secret: randomString(32) }));
    args.app.use(github.orgAccess({
        appId: settings.users.github.appId,
        appSecret: settings.users.github.appSecret,
        callback: settings.users.github.callack
    }, settings.users.github.org));
}
