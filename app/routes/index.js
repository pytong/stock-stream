'use strict';

var path = process.cwd();
	// searchUtil = require("../utils/searchUtil"),


module.exports = function (app, passport) {

	// app.route('/api/search')
	// 	.get(function(req, res) {
	// 		var location = req.query.location;

	// 		if(req.isAuthenticated()) {
	// 			req.user.lastSearchTerms = location;
	// 			req.user.save();
	// 		}

	// 		searchUtil.search(location, function(success, result) {
	// 			res.json({success: success, result: result})
	// 		});
	// 	});

	app.get("*", function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

};
