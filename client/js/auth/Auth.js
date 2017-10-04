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
    auth.login = function(pLoginInfo) {
      return $q(function(resolve, reject) {
        $http.post(BASE_URL + '/v1/login', pLoginInfo,
          {
            // Had to apply header here cause default was adding UTF-8
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
          .then(function(res) {
            token = (res.data.token);
            console.log(res);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    };
    return auth
  }
]);
