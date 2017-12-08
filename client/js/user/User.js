
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
            Auth.setToken(res.data.token, res.data.username);
            resolve(res); 
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
        $http.post(BASE_URL + '/v1/verification', {"type": "email"}, {
            headers: {
              "Authorization": "Bearer " + Auth.getToken()
            }
        })
        .then(function(res) {
          resolve(res); 
        }).catch(function(err) {
           reject(error); 
        });
      });
    };


    //
    // Updates a user's information object 
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
    // Gets User Information
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
