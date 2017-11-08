
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
        $http.post(BASE_URL +  '/v1/users', pLoginInfo)
          .then(function(res) {
            console.log(res);
            Auth.setToken(res.data.token, res.data.username);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    };


    //
    // Sends out email verification to sponsor's email
    //
    User.verify = function() {
      return $q(function(resolve, reject) {
        console.log("Going for it: ");
        var jwtToken = Auth.getToken();
        $http.post(BASE_URL + '/v1/sponsors/verification', {}, {
            headers: {
              "Authorization": "Bearer " + jwtToken
            }
        })
        .then(function(res) {
          console.log("E-Mail sent");
        }).catch(function(err) {
           console.log(err);
        });
      });
    };


    //
    // Updates a user's settings
    //
    User.updateSettings = function(pSettingsToChange) {

      return $q(function(resolve, reject) {

        $http.patch(BASE_URL + '/v1/users', pSettingsToChange, {

          headers: {

            "Authorization" : "Bearer " + Auth.getToken()
          }

        })
        .then(function(res){

          resolve(res.data);

        }).catch(function(err){

          reject(err);

        })


      });

    };


    //
    // Get Users
    //
    User.getUserInfo = function() {

      return $q(function(resolve, reject) {

        $http.get(BASE_URL + '/v1/users', {

          headers: {

            "Authorization" : "Bearer " + Auth.getToken()
          }

        })
        .then(function(res){

          resolve(res.data);

        }).catch(function(err){

          reject(err);

        })


      });

    };


    return User;

}]);
