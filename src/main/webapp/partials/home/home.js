(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('HomeService', HomeService)
        .controller('HomeCtrl', HomeCtrl);

    HomeService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    HomeCtrl.$inject = ['$log', '$rootScope', '$scope', 'HomeService', '$timeout', '$q', 'CONSTANTS'];

    function HomeService($rootScope, SERVICE, $http, $q, Utils) {
        var self = this;
        return {

        }
    }

    function HomeCtrl($log, $rootScope, $scope, HomeService, $timeout, $q, CONSTANTS) {
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

        self.colorTiles = [];

        self.loadMoreTiles = function() {
            for (var i = 0; i < 30; i++) {
                var span = randomSpan();
                self.colorTiles.push({
                    color: randomColor(),
                    colspan: span,
                    rowspan: span
                });
            }
        };

//        $scope.$on('LOAD-MORE', function(){
//            self.loadTiles();
//            $timeout(function(){
//                Waypoint.refreshAll();
//            }, 250);
//            $scope.$apply();
//        });
//        self.createWayPoint = function(){
//            return new Waypoint({
//                    context: document.getElementById('main-view'),
//                    element: document.getElementById('basic-waypoint'),
//                    enabled: false,
//                    offset: 'bottom-in-view',
//                    handler: function(dir) {
//                         if(dir == 'down'){
//                           $log.info("Load more");
//                           $scope.$emit("LOAD-MORE")
//                         }
//                         $log.info(dir);
//                     }
//                   });
//        }

        self.init = function() {
            self.loadMoreTiles();
        };
    };
})();