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

        $scope.$on("LOAD-MORE", function(){
            var previousIndex = self.tiles.length;
            self.loadMoreTiles();
            self.selectImg(previousIndex);
        });

        self.selectImg = function(index, ev){
            $mdDialog.show({
              controllerAs: "DialogSlider",
              controller: function(inputs){
                var dialog = this;
                dialog.timeoutCommands = null;
                dialog.timeoutPlay = null;
                dialog.hide = false;
                dialog.play = false;
                dialog.src="http://policlaudio.com/photos/"+inputs.images[inputs.currentIndex].img;
                dialog.next = function(){
                    if(inputs.currentIndex + 1 < inputs.images.length){
                        inputs.currentIndex += 1;
                        dialog.src="http://policlaudio.com/photos/"+inputs.images[inputs.currentIndex].img;
                        return;
                    }
                    $scope.$emit("LOAD-MORE");
                }

                dialog.back = function(){
                    if(inputs.currentIndex - 1 < 0){
                        return
                    }
                    inputs.currentIndex -= 1;
                    dialog.src="http://policlaudio.com/photos/"+inputs.images[inputs.currentIndex].img;
                }

                dialog.displayButtons = function(){
                    dialog.hide = false;
                    if(dialog.timeout != null){
                        $timeout.cancel(dialog.timeoutCommands);
                    }
                    dialog.timeoutCommands = dialog.hideButtons();
                }

                dialog.hideButtons = function(){
                    return $timeout(function(){
                        dialog.hide = true;
                    }, 5000);
                }

                dialog.playNext = function(){
                    if(dialog.play){
                        dialog.timeoutPlay = $timeout(function(){
                           dialog.next();
                           dialog.timeoutPlay = dialog.playNext();
                       }, 3000);
                   }
                }

                dialog.togglePlay = function(){
                    dialog.play = !dialog.play;
                    if(dialog.play){
                        dialog.playNext();
                    }else{
                        $timeout.cancel(dialog.timeoutPlay);
                    }
                }

                dialog.close = function(){
                    $mdDialog.hide();
                }

                dialog.keyEvents = function($event){
                    if ($event.keyCode == 39){
                        dialog.next();
                    } else if ($event.keyCode == 37){
                        dialog.back();
                    }
                }

                dialog.init = function() {
                    dialog.timeoutCommands = dialog.hideButtons();
                };
              },
              templateUrl: 'partials/home/dialog.slider.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:false,
              fullscreen: true,
              escapeToClose: true,
              locals: {
                  inputs: {
                    currentIndex: index,
                    images: self.tiles
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