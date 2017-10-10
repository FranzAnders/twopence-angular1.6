
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


    var user = {}; 


    //
    // Creates a user with email, phone and password 
    //
    user.create = function(pLoginInfo) {

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

    return user; 

}]);
