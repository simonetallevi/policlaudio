(function() {
    'use strict';

    angular.module('policlaudio')
        .factory('DialogSliderService', DialogSliderService)
        .controller('DialogSliderCtrl', DialogSliderCtrl);

    DialogSliderService.$inject = ['$rootScope', 'SERVICE', '$http', '$q', 'Utils'];
    DialogSliderCtrl.$inject = ['$log', '$rootScope', '$scope', 'DialogSliderService', '$timeout', '$q', 'CONSTANTS', 'inputs'];

    function DialogSliderService($rootScope, SERVICE, $http, $q, Utils) {
        var self = this;
        return {

        }
    }

    function DialogSliderCtrl($log, $rootScope, $scope, DialogSliderService, $timeout, $q, CONSTANTS, inputs) {
        var self = this;
        self.src="http://policlaudio.com/photos/"+inputs.img

        self.init = function() {

        };
    };
})();