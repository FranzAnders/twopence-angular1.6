
'use strict';

/*------------------------------------*\
   Auth Service
\*------------------------------------*/

twopence.factory('Auth', [
  '$q', 'BASE_URL', '$http',
  function(
    $q, BASE_URL, $http) {


    var auth = {};
    var token = null;


    //
    // Logs the user in if the account exists 
    //
    auth.login = function(pLoginInfo) {

      return $q(function(resolve, reject) {
        $http.post(BASE_URL +  '/v1/login',pLoginInfo)
          .then(function(res) {
            token = (res.data.token);
            console.log(res);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    };


    //
    // Gets the token created upon loging to  make calls
    //
    auth.getToken = function() {
        return token;
    };
    return auth
  }
]);
