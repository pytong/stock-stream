'use strict';

((app) => {
    app.service("StockService", ["$resource", "$location", function($resource, $location) {
        let appUrl = $location.protocol() + "://" + $location.host();

        this.quotes = () => {
            return $resource(appUrl + "/api/stock_quotes?symbol=:symbol", {symbol: "@symbol"});
        }

        this.symbols = () => {
            return $resource(appUrl + "/api/symbols");
        }

    }]);
})(app);