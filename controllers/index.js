var boom   = require('boom');
var budget = require('../data/budget');
var bytes  = require('byte-size');
var psi    = require('psi');

function controller(request, reply) {
	var url = decodeURIComponent(request.query.url);

	psi(url, function(err, res) {
		if (err) {
			return reply(boom.create(err.code, err.message));
		}

		site = controller.toInt(res.pageStats);
		site.total = controller.toTotal(site);

		return reply({
			siteBytes       : controller.toBytes(site),
			budgetBytes     : controller.toBytes(budget),
			dailyPercentage : controller.toPercentage(site, budget),
			numberResources : res.pageStats.numberResources
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