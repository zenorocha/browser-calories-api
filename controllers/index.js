var boom = require('boom');
var psi  = require('psi');

function controller(request, reply) {
  var url = decodeURIComponent(request.query.url);
  var options = controller.getOptions();

  psi(url, options).then(function(data) {
    var result = {};

    result = controller.toInt(data.pageStats);
    result.total = controller.toTotal(result);

    return reply(result);
  });
}

controller.getOptions = function() {
  var options;

  if (process.env.API_KEY) {
    options = {
      key: process.env.API_KEY
    };
  } else {
    options = {
      nokey: true
    };
  }

  return options;
};

controller.toInt = function(data) {
  return {
    html  : parseInt(data.htmlResponseBytes, 10) || 0,
    css   : parseInt(data.cssResponseBytes, 10) || 0,
    image : parseInt(data.imageResponseBytes, 10) || 0,
    js    : parseInt(data.javascriptResponseBytes, 10) || 0,
    other : parseInt(data.otherResponseBytes, 10) || 0
  };
}

controller.toTotal = function(data) {
  var total = 0;

  for (item in data) {
    if (data.hasOwnProperty(item)) {
      total += data[item];
    }
  }

  return total;
};

module.exports = controller;
