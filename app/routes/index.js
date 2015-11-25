"use strict";

let path = process.cwd(),
	moment = require("moment"),
	yahooFinance = require("yahoo-finance"),
	stockUtil = require("../utils/stockUtil");



module.exports = (app, passport) => {

	app.route("/api/symbols")
		.post((req, res) => {
			let symbol = req.query.symbol;

			stockUtil.addSymbol(symbol, (success, result) => {
				if(success === false) {
					return res.json({success: false, message: result});
				}

				res.json({success: true});
			});
		})
		.get((req, res) => {
			stockUtil.getAllSymbols((success, result) => {
				if(success === false) {
					return res.json({success: false, message: result})
				}

				res.json({success: true, result: result});
			});

		})
		.delete((req, res) => {
			let symbol = req.query.symbol;

			stockUtil.removeSymbol(symbol, (success, result) => {
				if(success === false) {
					return res.json({success: false, message: result})
				}

				res.json({success: true});
			});
		});

	app.route("/api/is_symbol_valid")
		.get((req, res) => {
			const DATE_FORMAT = "YYYY-MM-DD";

			let today = moment().format(DATE_FORMAT),
				aWeekAgo = moment().subtract(7, "days").format(DATE_FORMAT),
				symbol = req.query.symbol;

			yahooFinance.historical({
			  symbol: symbol,
			  from: aWeekAgo,
			  to: today
			}, (err, quotes) => {
				if(err || quotes.length < 1) { return res.json({isValid: false}); }

				res.json({isValid: true});
			});
		});

	app.get("/api/stock_quotes", (req, res) => {
		const DAYS_IN_YEAR = 365,
			  DATE_FORMAT = "YYYY-MM-DD";

		let today = moment().format(DATE_FORMAT),
			aYearAgo = moment().subtract(DAYS_IN_YEAR, "days").format(DATE_FORMAT),
			symbol = req.query.symbol;

		yahooFinance.historical({
		  symbol: symbol,
		  from: aYearAgo,
		  to: today
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
