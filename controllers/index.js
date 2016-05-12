var boom = require('boom');
var superagent = require('superagent');

function controller(request, reply) {
  superagent
    .get(controller.getUrl(request.query.url))
    .end(function(error, response) {
      if (error || !response.ok) {
        return reply(controller.getError(response.error));
      } else {
        return reply(controller.getResult(response.body.pageStats));
      }
    });
}

controller.getUrl = function(url) {
  var decodedUrl = decodeURIComponent(url);
  var endpoint = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + decodedUrl;

  if (process.env.API_KEY) {
    endpoint += '&key=' + process.env.API_KEY;
  }

  return endpoint;
}

controller.getError = function(data) {
  var message = JSON.parse(data.text).error.errors[0].message;

  return boom.create(data.status, message);
}

controller.getResult = function(data) {
  var result = {
    html  : parseInt(data.htmlResponseBytes, 10) || 0,
    css   : parseInt(data.cssResponseBytes, 10) || 0,
    image : parseInt(data.imageResponseBytes, 10) || 0,
    js    : parseInt(data.javascriptResponseBytes, 10) || 0,
    other : parseInt(data.otherResponseBytes, 10) || 0
  };

  result.total = result.html + result.image + result.css + result.js + result.other;

  return result;
}

module.exports = controller;
