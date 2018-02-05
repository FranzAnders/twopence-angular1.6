
'use strict';

/*------------------------------------*\
   Plaid Auth Service
\*------------------------------------*/

twopence.factory('PlaidAuth', [
  '$q', 'ENV', 'Auth', '$http', '$cookies', '$rootScope',
  function(
    $q, ENV, Auth, $http, $cookies, $rootScope) {

    var plaidAuth = {};
    var loggedIn = false;
    var token = null;

    //
    // Logs the user in if the account exists
    //
    plaidAuth.login = function(plaidInfo) {
      console.log("Here is the call")
      return $q(function(resolve, reject) {
        $http.post(ENV.BASE_URL +  '/v1/plaid/token', plaidInfo, {
          headers: {
              'Authorization': 'bearer ' + Auth.getToken()
                }})
          .then(function(res) {
            console.log("Success!");
            console.log(res);
          }).catch(function(err) {
            reject(err);
          });
      });

    };


    return plaidAuth
  }
]);
