(function() {
    'use strict';

    angular.module('policlaudio', ['ngAnimate', 'ui.router', 'ngMaterial', 'duScroll'])

    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
        function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

            $mdThemingProvider.disableTheming();

            // Routing
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "partials/home/home.html",
                    controller: 'HomeCtrl as Home'
                });

            $urlRouterProvider.otherwise("/");
        }
    ])

    .directive('setHeight', ['$window', function($window) {
        return {
            link: function(scope, element, attrs) {
                element.css('height', $window.innerHeight + 'px');
            }
        }
    }])

    .run(['$rootScope', '$log', '$timeout',
        function($rootScope, $log, $timeout) {
            $rootScope.initialized = true;
            $rootScope.showSpinner = false;
        }
    ])
})();