(function() {
    'use strict';

    angular.module('policlaudio', ['ngAnimate', 'ui.router', 'ngMaterial', 'duScroll'])

    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
        function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

              //themes are still defined in config, but the css is not generated
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('yellow')

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

    .filter('slice', function() {
      return function(arr, start, end) {
        return (arr || []).slice(start, end);
      };
    })

    .run(['$rootScope', '$log', '$timeout',
        function($rootScope, $log, $timeout) {
            $rootScope.initialized = true;
            $rootScope.showSpinner = false;
        }
    ])
})();