# Etherpad lite GitHub authorization

## Install

In your etherpad-lite dir:

    npm install ep_github

## Configure

Add to settings.json:

    "users": {
        "github": {
            "appId": "Replace with you app id",
            "appSecret": "Replace with your app secret",
            "config": {
                "organization": "Replace with your organization"
            }
        }
    },

### To authenticate users on a specific team

    "config": {
      "organization": "Replace with your organization",
      "team": "the team"
    }

### To authenticate only specific users

    "config": {
      "users": ["francois2metz"]
    }

See [github-auth](https://github.com/e-conomic/github-auth) to see all possible options.

## Licence

BSD

Copyright (C) 2015 by François de Metz
