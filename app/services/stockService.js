'use strict';

((app) => {
    app.service("StockService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host(),
            port = ($location.port());

        if(port) {
            appUrl += (":" + port);
        }

        this.quotes = () => {
            return $resource(appUrl + "/api/stock_quotes?symbol=:symbol", {symbol: "@symbol"});
        }

        this.symbols = () => {
            return $resource(appUrl + "/api/symbols", {symbol: "@symbol"});
        }

        this.isValidSymbol = () => {
            return $resource(appUrl + "/api/is_symbol_valid", {symbol: "@symbol"});
        }

    }]);
})(app);