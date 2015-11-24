'use strict';

((app) => {

    app.controller("MainController", ["$scope", "StockService", ($scope, StockService) => {

        let seriesOptions = [],
            seriesCounter = 0,
            symbols =['MSFT', 'AAPL', 'GOOG'];

            $.each(symbols, (index, symbol) => {

                StockService.quotes().get({symbol: symbol}, (res) => {
                    if(res.success === true) {

                        seriesOptions[index] = {
                            name: symbol,
                            data: res.closes
                        };

                        // As we're loading the data asynchronously, we don't know what order it will arrive. So
                        // we keep a counter and create the chart when all the data is loaded.
                        seriesCounter += 1;

                        if (seriesCounter === symbols.length) {
                            createChart($("#chart"), seriesOptions, seriesCounter, symbols);
                        }

                    } else {
                        $scope.errorMessage = res.message;
                    }
                });

            });

    }]);
})(app);
