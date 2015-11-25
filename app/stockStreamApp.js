"use strict";

let app = angular.module("StockStreamApp", ["ngResource", "ngRoute"]);

app.config(($locationProvider, $routeProvider) => {

    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "/views/main.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});