'use strict';

let path = process.cwd(),
	moment = require('moment'),
	yahooFinance = require('yahoo-finance');



module.exports = (app, passport) => {

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

	app.get('/api/stock_quotes', (req, res) => {
		const DAYS_IN_YEAR = 365,
			  DATE_FORMAT = 'YYYY-MM-DD';

		let currentDate = moment().format(DATE_FORMAT),
			aYearAgo = moment().subtract(DAYS_IN_YEAR, 'days').format(DATE_FORMAT),
			symbol = req.query.symbol;

		yahooFinance.historical({
		  symbol: symbol,
		  from: aYearAgo,
		  to: currentDate
		}, (err, quotes) => {
		  if(err || quotes.length < 1) { return res.json({success: false, message: "Stock not found."}); }

		  let date,
			epochTime,
			closes = quotes.map( (quote) => {
				date = new Date(quote.date);
				epochTime = date.getTime();
				return [epochTime, quote.close];
			});

		  res.json({success: true, closes});
		});
	});

	app.get("*", (req, res)  => {
			res.sendFile(path + '/public/index.html');
		});

};
