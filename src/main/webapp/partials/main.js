(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('MainService', MainService)
        .controller('MainCtrl', MainCtrl);

    MainService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', '$state', 'Utils'];
    MainCtrl.$inject = ['$log', '$rootScope', '$document', '$element',
                        '$timeout', '$window', '$mdMedia', '$mdMenu', '$scope', 'MainService',
                        'CONSTANTS'];

    function MainService($rootScope, SERVICE, $http, $q, $state, Utils) {
        var self = this;

        var _goTo = function(state, params) {
            self.currentState = state;
            $state.go(state, params);
        };

        return {
            goTo: function(state, params) {
                _goTo(state, params);
            }
        }
    }

    function MainCtrl($log, $rootScope, $document, $element, $timeout, $window,
                        $mdMedia, $mdMenu, $scope, MainService, CONSTANTS) {
        var self = this;

        self.scrollActive = false;
        self.toolbarClass = "";
        self.toggleMenuScrollTop = 0;

        self.selectedFilters = [];
        self.sliceIndex = [];
        self.selected = "categories";
        self.items = CONSTANTS.FILTERS[self.selected];
        self.hasMoreItems = self.items.length > 0;

        self.onSelect = function(item){
            self.items = CONSTANTS.FILTERS[item];
            self.hasMoreItems = self.items.length > 0;
            if(self.selected){
                self.selectedFilters.push(self.selected);
            }
            self.selected = item;
            self.sliceIndex = self.calcSliceIndex();
        }

        self.unselectFilterMenu = function(index){
            if(index >= 0){
                var item = self.selectedFilters[index];
                var newIndexOfSelectedItem = index - 1;
                if(newIndexOfSelectedItem >= 0){
                    self.selected = self.selectedFilters[newIndexOfSelectedItem];
                    self.selectedFilters = self.selectedFilters.slice(0, newIndexOfSelectedItem);
                }else{
                    self.selected = null;
                    self.selectedFilters = [];
                }
                self.onSelect(item);
            } else{
                self.selected = null;
                self.selectedFilters = [];
                self.onSelect('categories');
            }

        }
        self.unselectFilter = function(index){
            if(index >= 0 && self.sliceIndex[0] + index >= 0){
                var item;
                var newIndexOfSelectedItem;
                if(self.sliceIndex[0] <= 1){
                    item = self.selectedFilters[index];
                    newIndexOfSelectedItem = index - 1;
                }else{
                    item = self.selectedFilters[self.sliceIndex[0] + index];
                    newIndexOfSelectedItem = self.sliceIndex[0] + index - 1;
                }
                if(newIndexOfSelectedItem >= 0){
                    self.selected = self.selectedFilters[newIndexOfSelectedItem];
                    self.selectedFilters = self.selectedFilters.slice(0, newIndexOfSelectedItem);
                }else{
                    self.selected = null;
                    self.selectedFilters = [];
                }
                self.onSelect(item);
            } else{
                self.selected = null;
                self.selectedFilters = [];
                self.onSelect('categories');
            }
        }

        self.calcSliceIndex = function(){
            var totalCount = self.selectedFilters.length;
            if(totalCount === 0){
                return [0,0];
            }
            if($mdMedia('xs')){
                return [(totalCount - 1 < 0) ? 0 : (totalCount - 1), totalCount];
            }
            if($mdMedia('sm') || $mdMedia('md')){
                return [(totalCount - 2 < 0) ? 0 : (totalCount - 2), totalCount];
            }
            return [(totalCount - 3 < 0) ? 0 : (totalCount - 3), totalCount];
        }

        self.openSelectMenu = function($mdMenu) {
            if(self.hasMoreItems){
                $mdMenu.open();
            }
        };

        self.openUnSelectMenu = function($mdMenu) {
            $mdMenu.open();
        };

        self.loadMore = false;

//        $scope.$on("LOADED", function(event){
//            self.loadMore = false;
//        });
//        $timeout(function(){
//            angular.element(document.querySelector('#main-view')).bind('scroll', function($event){
//                var height = Math.max($event.currentTarget.scrollHeight,$event.currentTarget.offsetHeight);
//                var percentagePageScrolled = $event.currentTarget.scrollTop / height * 100;
//                if(!self.loadMore && percentagePageScrolled >= 70){
//                    $log.info("LOAD MORE");
//                    self.loadMore = true;
//                    $rootScope.$broadcast("LOAD-MORE", status);
//                }
//
//            });
//        }, 300);

        self.init = function() {

        };
    }
})();