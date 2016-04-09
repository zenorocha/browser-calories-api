var boom = require('boom');
var phantomas = require('phantomas');

function controller(request, reply) {
  var url = decodeURIComponent(request.query.url);

  phantomas(url, function(err, res) {
    if (err) {
      return reply(controller.formatError(err.message));
    }

    return reply(controller.formatResponse(res.metrics));
  });
}

/*
 * Converts Phantomas exit errors to HTTP status codes
 * Reference: https://git.io/vVScR
 */
controller.formatError = function(exitCode) {
  var statusCode = 500;

  switch (exitCode) {
    case "252":
      statusCode = 408;
      break;
    case "253":
      statusCode = 418;
      break;
    case "254":
      statusCode = 400;
      break;
    case "255":
      statusCode = 405;
      break;
  }

  return boom.create(statusCode);
};

/*
 * Sanitizes Phantomas success response object
 */
controller.formatResponse = function(data) {
  return {
    html  : data.htmlSize,
    css   : data.cssSize,
    image : data.imageSize,
    js    : data.jsSize,
    other : data.otherSize,
    total : data.contentLength
  };
};

module.exports = controller;
