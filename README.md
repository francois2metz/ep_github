[![build status](https://secure.travis-ci.org/francois2metz/ep_github.png)](http://travis-ci.org/francois2metz/ep_github)
# Etherpad lite Github authorization

## Install

In your etherpad-lite dir:

    npm install ep_github

Add to settings.json:

    "users": {
        "github": {
            "appId": "Replace with you app id",
            "appSecret": "Replace with your app secret",
            "callback": "Replace with full url (including http) + /auth/github_callback: (http:\/\/localhost:9001/auth/github_callback)",
            "org": "Replace with your organisation"
        }
    },

## Licence

BSD

Copyright (C) 2012 by François de Metz
