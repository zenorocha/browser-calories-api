var boom   = require('boom');
var budget = require('../data/budget');
var bytes  = require('byte-size');
var phantomas = require('phantomas');

function controller(request, reply) {
  var url = decodeURIComponent(request.query.url);

  phantomas(url, function(error, response) {
    if (error) {
      return reply(boom.create(error.code, error.message));
    }

    var site = {
      html  : response.metrics.htmlSize,
      css   : response.metrics.cssSize,
      image : response.metrics.imageSize,
      js    : response.metrics.jsSize,
      other : response.metrics.otherSize,
      total : response.metrics.contentLength
    };

    return reply({
      siteBytes: controller.toBytes(site),
      budgetBytes: controller.toBytes(budget),
      dailyPercentage: controller.toPercentage(site, budget)
    });
  });
}

controller.toBytes = function(data) {
  var obj = {};

  for (item in data) {
    if (data.hasOwnProperty(item)) {
      obj[item] = bytes(data[item], { precision: 1 });
    }
  }

  return obj;
}

controller.toPercentage = function(a, b) {
  var obj = {};

  for (item in a) {
    if (a.hasOwnProperty(item) && b.hasOwnProperty(item)) {
      obj[item] = Math.round((a[item] / b[item]) * 100) + '%';
    }
  }

  return obj;
}

module.exports = controller;
