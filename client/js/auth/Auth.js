
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
            $cookies.put('sponsorId', res.data.sponsor_id);
            var alias = 'Sponsor:' + res.data.sponsor_id;
            mixpanel.identify(alias);
            console.log("You are logged in: " + $cookies.get('loggedIn'));
            Session.create(res.data.token, pLoginInfo.email);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    };


    //
    // Logs the User Out
    //
    //
    auth.logout = function() {
      console.log("Logging you out fam");
      token = null;
      $cookies.remove('loggedIn');
      $cookies.remove('userToken');
      $cookies.remove('sponsorId');
    };

    auth.setVisited = function() {
      $cookies.put('loggedIn', true);
    };


    auth.checkIfVisited = function() {
            auth.userVisitedSite = $cookies.get('loggedIn');
            return auth.userVisitedSite;
    };


    //
    // Gets the token created upon loging to  make calls
    //
    auth.getToken = function() {

      token = $cookies.get('userToken');

      if(token === 'null') {

        token = null

      }

      return token;

    };


    //
    // Sets the token
    //
    auth.setToken = function(pToken, username) {
      token = pToken;
      username = username
      // var authData = Base64.encode(username + ':' + password);
      $cookies.put('userToken', token);
      $rootScope.globals = {
        currentUser: {
          username: username,
          authData: token
        }
      }

    };

    //
    // Gets the sponsor_id which serves as the Mixpanel alias for logged in user.
    //
    auth.getMixpanelDistinctId = function() {
      var sponsorId = $cookies.get('sponsorId');
      if (sponsorId === 'null') {
        return mixpanel.get_distinct_id();
      }
      return 'Sponsor:' +  sponsorId;
    };

    //
    // Sets the Mixpanel alias.
    //
    auth.setMixpanelDistinctId = function(sponsorId) {
      $cookies.put('sponsorId', sponsorId);
      alias = 'Sponsor:' + sponsorId;
      mixpanel.identify(alias);
    }


    //
    // Check if the user is Authenticated
    //
    auth.isAuthenticated = function() {
      return !!Session.userToken;
    }


    //
    // Check to see if user is authorized to see page
    //
    auth.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };


    return auth
  }
]);
