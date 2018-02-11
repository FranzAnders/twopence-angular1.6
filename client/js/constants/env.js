(function(angular, undefined) {
'use strict';

angular.module('constants', [])

.constant('ENV', {BASE_URL:'https://api.onepence.co',domain:'onepence.co',mixpanelToken:'8e3ed97d55d5b6ae0e17f190c9f8e100',plaidEnv:'sandbox',plaidPublicKey:'ee1d216ec4313d5efb386b0a97a06d',enableDebug:true,environment_name:'dev'})

;
})(angular);