"use strict";

let Stock = require("../models/stocks");

module.exports = {
    
    getAllSymbols: (callback) => {
        Stock.find({}, (err, stocks) => {
            if(err) { return callback(false, "Failed to find stocks. Please try again later."); }

            callback(true, stocks);
        });
    },
    
    addSymbol: (symbol, callback) => {
        let errorMessage = "Failed to add stock. Please try again later.";
        
        Stock.findOne({symbol: symbol}, function(err, stock) {
            if(err) { return callback(false, errorMessage); }

            if(typeof(stock) === "undefined" || stock === null) {
                stock = new Stock();
                stock.symbol = symbol;

                stock.save(function(err) {
                   if(err) { return callback(false, errorMessage); }

                   callback(true);
                });
            }
        });
    }

}
