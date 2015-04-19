# Etherpad lite GitHub authorization

## Install

In your etherpad-lite dir:

    npm install ep_github

Add to settings.json:

    "users": {
        "github": {
            "appId": "Replace with you app id",
            "appSecret": "Replace with your app secret",
            "config": {
              "organization": "Replace with your organization",
              "team": "org-team",
              "users": ["roger", "hanin"]
            }
        }
    },

## Licence

BSD

Copyright (C) 2015 by François de Metz
