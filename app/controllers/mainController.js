'use strict';

((app) => {

    app.controller("MainController", ["$scope", "StockService", ($scope, StockService) => {

        $scope.drawChart = () => {
            StockService.symbols().get({}, (res) => {
                if(res.success === false) {
                    $scope.errorMessage = res.message;
                    return;
                }

                var seriesOptions = [],
                    seriesCounter = 0;

                $scope.symbols = res.result;
                $.each($scope.symbols, (index, symbol) => {

                    StockService.quotes().get({symbol: symbol}, (res) => {
                        if(res.success === true) {
                            seriesOptions[index] = {
                                name: symbol,
                                data: res.closes
                            };

                            // As we're loading the data asynchronously, we don't know what order it will arrive. So
                            // we keep a counter and create the chart when all the data is loaded.
                            seriesCounter += 1;

                            if (seriesCounter === $scope.symbols.length) {
                                createChart($("#chart"), seriesOptions, seriesCounter, $scope.symbols);
                            }

                        } else {
                                $scope.errorMessage = res.message;
                        }
                    });

                });
            });
        }

        $scope.addStock = (symbol) => {
            $scope.errorMessage = "";
            $(".symbol").val("");

            StockService.isValidSymbol().get({symbol: symbol}, (res) => {
                if(res.isValid === false) {
                    $scope.errorMessage = "Invalid symbol.";
                    return;
                }

                StockService.symbols().save({symbol: symbol}, (res) => {
                    if(res.success === true) {
                        $scope.drawChart();
                    } else {
                        $scope.errorMessage = res.message;
                    }
                });
            });
        }

        $scope.removeStock = (symbol) => {
            $scope.errorMessage = "";

            StockService.symbols().delete({symbol: symbol}, (res) => {
                if(res.success === true) {
                    $scope.drawChart();
                } else {
                    $scope.errorMessage = res.message;
                }
            })
        }

        $scope.drawChart();

    }]);
})(app);
