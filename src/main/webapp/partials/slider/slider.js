(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('SliderService', SliderService)
        .controller('SliderCtrl', SliderCtrl);

    SliderService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    SliderCtrl.$inject = ['$log', '$rootScope', '$scope', 'SliderService', '$timeout', '$q', 'CONSTANTS'];

    function SliderService($rootScope, SERVICE, $http, $q, Utils) {
        var self = this;
        return {

        }
    }

    function SliderCtrl($log, $rootScope, $scope, SliderService, $timeout, $q, CONSTANTS) {
        var self = this;
        self.src="http://policlaudio.com/photos/P1030584.jpg"

        self.init = function() {

        };
    };
})();