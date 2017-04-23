var app = angular.module('greenHouse', [ 'ngRoute', 'ngCookies', 'ngSanitize', 'chart.js', 'ngMaterial', 'ngAnimate' ])

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/graph', {
        templateUrl: '/app/controllers/main/main.html',
        controller: 'MainCtrl'
    })
    .when('/data', {
        templateUrl: '/app/controllers/data/data.html',
        controller: 'DataCtrl'
    })
    .when('/welcome', {
        templateUrl: '/app/controllers/welcome/welcome.html',
        controller: 'WelcomeCtrl'
    })
    .otherwise({
        redirectTo: '/graph'
    })

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
})
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
})
