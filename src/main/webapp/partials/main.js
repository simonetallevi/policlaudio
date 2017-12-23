(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('MainService', MainService)
        .controller('MainCtrl', MainCtrl);

    MainService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    MainCtrl.$inject = ['$log', '$rootScope', '$document', '$mdSidenav', '$mdMedia', '$mdMenu', '$scope', 'MainService'];

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

    function MainCtrl($log, $rootScope, $document, $mdSidenav, $mdMedia, $mdMenu, $scope, MainService) {
        var self = this;

        self.scrollActive = false;
        self.toolbarClass = "";
        self.toggleMenuScrollTop = 0;

        self.selectedFilters = [];
        self.selected = "Categories";

        self.items = {
            "Animali":["Mammaria1", "ciccio", "pasticcio"],
            "Funghi":["Mammaria2", "ciccio", "pasticcio"],
            "Paesaggi":["Mammaria3", "ciccio", "pasticcio"]
        };

        self.onSelect = function(key, values){
            self.items = {};
            self.selectedFilters.push(self.selected);
            self.selected = key;
            values.forEach(function(val){
                self.items[val] = []
            });
        }

        self.openMenu = function($mdMenu) {
            $mdMenu.open();
        };

        $document.on('scroll', function() {
            if($document.scrollTop() >= 64 && !self.scrollActive){
                self.scrollActive = true;
                self.toolbarClass = "fixed-toolbar"
                $scope.$apply()
            }else if($document.scrollTop() < 64 && self.scrollActive){
                self.scrollActive = false;
                self.toolbarClass = ""
                $scope.$apply()
            }
        });

        self.init = function() {

        };

        self.closeMenu = function() {
            $mdSidenav('left').close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
        }
    }
})();