# Browser Calories API

[![Build Status](http://img.shields.io/travis/zenorocha/browser-calories-api/master.svg?style=flat)](https://travis-ci.org/zenorocha/browser-calories-api)
[![Dependencies Status](http://img.shields.io/david/zenorocha/browser-calories-api.svg?style=flat)](https://david-dm.org/zenorocha/browser-calories-api)

> A microservice that fetches web performance metrics from a particular URL.

Built with [Node](http://nodejs.org/), [Hapi](http://hapijs.com/) and [PageSpeed](https://developers.google.com/speed/docs/insights/v2/getting-started). Hosted on [Heroku](https://heroku.com/). Monitored on [New Relic](https://newrelic.com/).

## Setup

Install dependencies:

```
npm install
```

Run it:

```
npm start
```

The server should be initialized at `localhost:4000`.

## Usage

Just include the `url` parameter on your request and have fun!

```
curl http://localhost:4000/?url=https://github.com/zenorocha
```

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
