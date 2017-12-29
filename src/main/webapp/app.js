(function() {
    'use strict';

    angular.module('policlaudio', ['ngAnimate', 'ui.router', 'ngMaterial', 'duScroll'])

    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // Routing
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "partials/home/home.html?v1",
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