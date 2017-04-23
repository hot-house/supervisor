var app = angular.module('hotHouse', [ 'ngRoute', 'ngCookies', 'ngSanitize', 'chart.js' ])

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/app/controllers/main/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    })

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
})
