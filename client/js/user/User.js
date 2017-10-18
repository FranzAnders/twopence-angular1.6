
'use strict';

/*------------------------------------*\
   User Service
\*------------------------------------*/

twopence.factory('User', [
    '$q',
    '$http',
    'BASE_URL',
    'Auth',
  function(
    $q,
    $http,
    BASE_URL,
    Auth) {


    var User = {};


    //
    // Creates a user with email, phone and password
    //
    User.create = function(pLoginInfo) {

      return $q(function(resolve, reject) {
        $http.post(BASE_URL +  '/v1/users',pLoginInfo)
          .then(function(res) {
            console.log(res);
            Auth.setToken(res.data.token);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    };

    User.verify = function() {
      return $q(function(resolve, reject) {
        console.log("Going for it: ");
        var jwtToken = Auth.getToken();
        $http.post(BASE_URL + '/v1/sponsors/verification', {
          headers: {
            "Content-type": 'application/json',
            "Authorization": 'bearer ' + jwtToken

          }
        })
        .then(function(res) {
          console.log("E-Mail sent");
        }).catch(function(err) {
          reject(err);
        });
      });
    };

    return User;

}]);
