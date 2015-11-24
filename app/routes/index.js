"use strict";

let path = process.cwd(),
	moment = require("moment"),
	yahooFinance = require("yahoo-finance"),
	stockUtil = require("../utils/stockUtil");



module.exports = (app, passport) => {

	app.route("/api/symbols")
		.post((req, res) => {
			let symbol = req.query.symbol;

			stockUtil.addSymbol(symbol, function(success, result) {
				if(success === false) {
					return res.json({success: false, message: result});
				}

				res.json({success: true});
			});
		})
		.get((req, res) => {
			stockUtil.getAllSymbols(function(success, result) {
				if(success === false) {
					return res.json({success: false, message: result})
				}

				res.json({success: true, result: result});
			});

		});

	app.get("/api/stock_quotes", (req, res) => {
		const DAYS_IN_YEAR = 365,
			  DATE_FORMAT = "YYYY-MM-DD";

		let currentDate = moment().format(DATE_FORMAT),
			aYearAgo = moment().subtract(DAYS_IN_YEAR, "days").format(DATE_FORMAT),
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
			res.sendFile(path + "/public/index.html");
		});

};
