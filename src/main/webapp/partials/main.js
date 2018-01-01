(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('MainService', MainService)
        .controller('MainCtrl', MainCtrl);

    MainService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    MainCtrl.$inject = ['$log', '$rootScope', '$document', '$element',
                        '$mdSidenav', '$mdMedia', '$mdMenu', '$scope', 'MainService',
                        'CONSTANTS'];

    function MainService($rootScope, SERVICE, $http, $q, Utils) {
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

    function MainCtrl($log, $rootScope, $document, $element, $mdSidenav,
                        $mdMedia, $mdMenu, $scope, MainService, CONSTANTS) {
        var self = this;

        self.scrollActive = false;
        self.toolbarClass = "";
        self.toggleMenuScrollTop = 0;

        self.selectedFilters = [];
        self.sliceIndex = [];
        self.selected = "root";

        self.items = CONSTANTS.FILTERS["root"];

        self.onSelect = function(item){
            self.items = CONSTANTS.FILTERS[item];
            if(self.selected){
                self.selectedFilters.push(self.selected);
            }
            self.selected = item;
            self.sliceIndex = self.calcSliceIndex();
        }

        self.unselectFilter = function(index){
            if(index > 0 && self.sliceIndex[0] + index > 0){
                var item = self.selectedFilters[self.sliceIndex[0] + index];
                var newIndexOfSelectedItem = self.sliceIndex[0] + index - 1;
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
                self.onSelect('root');
            }
        }

        self.calcSliceIndex = function(){
            var totalCount = self.selectedFilters.length;

            if(totalCount == 0){
                return [0,0];
            }
            if($mdMedia('xs')){
                return [totalCount - 1, totalCount];
            }
            if($mdMedia('sm') || $mdMedia('md')){
                return [totalCount - 2, totalCount];
            }
            return [totalCount - 3, totalCount];
        }

        self.openMenu = function($mdMenu) {
            if(self.hasMoreItems()){
                $mdMenu.open();
            }
        };

        self.hasMoreItems = function(){
            return self.items.length > 0;
        }

        self.init = function() {

        };
    }
})();