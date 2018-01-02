(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('HomeService', HomeService)
        .controller('HomeCtrl', HomeCtrl);

    HomeService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    HomeCtrl.$inject = ['$log', '$rootScope', '$scope', 'HomeService', 'MainService', '$timeout', '$mdDialog', '$q', 'CONSTANTS'];

    function HomeService($rootScope, SERVICE, $http, $q, Utils) {
        var self = this;
        return {

        }
    }

    function HomeCtrl($log, $rootScope, $scope, HomeService, MainService, $timeout, $mdDialog, $q, CONSTANTS) {
        var self = this;
        self.count = 1;

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

        var nextImg = function(index) {
            var length = self.count*index;
            if(CONSTANTS.PHOTOS.length >= length)
                self.count = 1;
            return CONSTANTS.PHOTOS[length];
        }

        self.tiles = [];

        self.loadMoreTiles = function() {
            for (var i = 0; i < 30; i++) {
                var span = randomSpan();
                self.tiles.push({
                    color: randomColor(),
                    colspan: span,
                    rowspan: span,
                    img: nextImg(i)
                });
            }
            self.count++;
        };

        self.selectImg = function(imgId, ev){
            $mdDialog.show({
              controllerAs: "DialogSlider",
              controller: function(inputs){
                var self = this;
                self.src="http://policlaudio.com/photos/"+inputs.img
                self.init = function() {

                };
              },
              templateUrl: 'partials/home/dialog.slider.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: true,
              escapeToClose: true,
              locals: {
                  inputs: {
                    img : imgId
                  }
               }
            })
            .then(
                function(answer) {},
                function() {}
            );
        }

        self.init = function() {
            self.loadMoreTiles();
        };
    };
})();