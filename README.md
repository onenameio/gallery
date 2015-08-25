# openname directory

[![Slack](http://slack.blockstack.org/badge.svg)](http://slack.blockstack.org/)

Hosted instances:
+ https://openname.org

### Installation

1) Install the node dependencies

```
$ npm install
```

2) Install the front-end JS dependencies

```
$ bower install
```

### Running in development

1) Start up the development app

```
$ grunt serve
```

2) Start up the API (comes bundled with the app used in deployment)

```
$ node app
```

3) Go to `localhost:9000`

### Running in deployment

1) Build and commit the app resources

```
$ grunt build
```

2) Copy the files in the repo to the server where you'd like to run the app

For example, to deploy to heroku:

```
$ heroku create
$ git add .
$ git commit -m "YOUR COMMIT MESSAGE HERE"
$ git push heroku master
```

3) Run the app off the build

```
$ node app
```
