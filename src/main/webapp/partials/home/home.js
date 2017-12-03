(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('HomeService', HomeService)
        .controller('HomeCtrl', HomeCtrl);

    HomeService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    HomeCtrl.$inject = ['$log', '$rootScope', 'HomeService', '$timeout', 'CONSTANTS'];

    function HomeService($rootScope, SERVICE, $http, $q, Utils) {
        var self = this;
        return {

        }
    }

    function HomeCtrl($log, $rootScope, HomeService, $timeout, CONSTANTS) {
        var self = this;

        var randomColor = function() {
            return CONSTANTS.COLORS[Math.floor(Math.random() * CONSTANTS.COLORS.length)];
        }

        var randomSpan = function() {
            var r = Math.random();
            if (r < 0.8) {
                return 2;
            } else {
                return 4;
            }
        }

        self.init = function() {
            self.colorTiles = (function() {
                var tiles = [];
                for (var i = 0; i < 100; i++) {
                    var span = randomSpan();
                    tiles.push({
                        color: randomColor(),
                        colspan: span,
                        rowspan: span
                    });
                }
                return tiles;
            })();
        };
    };
})();