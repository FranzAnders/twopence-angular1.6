
'use strict';

/*------------------------------------*\
   Auth Service
\*------------------------------------*/

twopence.factory('Auth', [
  '$q', 'BASE_URL', '$http', '$cookies', '$rootScope', 'Session',
  function(
    $q, BASE_URL, $http, $cookies, $rootScope, Session) {


    var auth = {};
    var loggedIn = false;
    var token = null;


    //
    // Logs the user in if the account exists
    //
    auth.login = function(pLoginInfo) {
      return $q(function(resolve, reject) {
        $http.post(BASE_URL +  '/v1/login', pLoginInfo)
          .then(function(res) {
            token = (res.data.token);
            $cookies.put('loggedIn', true);
            $cookies.put('userToken', token);
            console.log("You are logged in: " + $cookies.get('loggedIn'));
            Session.create(res.data.token, pLoginInfo.email);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    };

    auth.logout = function() {
      console.log("Logging you out fam");
      token = null;
    };

    auth.setVisited = function() {
      $cookies.put('loggedIn', true);
    };


    auth.checkIfVisited = function() {
            auth.userVisitedSite = $cookies.get('loggedIn');
            return auth.userVisitedSite;
    };

    //
    // Logs the User Out
    //
    //
    auth.logout = function() {

    }


    //
    // Gets the token created upon loging to  make calls
    //
    auth.getToken = function() {
        token = $cookies.get('userToken');
        return token;
    };


    //
    // Sets the token
    //
    auth.setToken = function(pToken) {
      token = pToken;
      // var authData = Base64.encode(username + ':' + password);

      $rootScope.globals = {
        currentUser: {
          username: username,
          authData: token
        }
      }

    };
    // Check if the user is Authenticated
    auth.isAuthenticated = function() {
      return !!Session.userToken;
    }
    // Check to see if user is authorized to see page
    auth.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };
      token = pToken;


    return auth
  }
]);
