
'use strict';

/*------------------------------------*\
   Auth Service
\*------------------------------------*/

twopence.factory('Auth', [
  '$q', 'ENV', '$http', '$cookies', '$rootScope', 'Session', 'Funnel',
  function(
    $q, ENV, $http, $cookies, $rootScope, Session, Funnel) {


    var auth = {};
    var loggedIn = false;
    var token = null;


    //
    // Logs the user in if the account exists
    //
    auth.login = function(pLoginInfo) {
      return $q(function(resolve, reject) {
        $http.post(ENV.BASE_URL +  '/v1/login', pLoginInfo)
          .then(function(res) {
            token = (res.data.token);
            $cookies.put('loggedIn', true);
            $cookies.put('userToken', token);
            $cookies.put('sponsorId', res.data.sponsor_id);
            Funnel.setState(false); 
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

      var token = auth.getToken(); 

       return $q(function(resolve, reject) {
        $http.post(ENV.BASE_URL +  '/v1/logout', {},  {
          headers: {

          "Authorization": 'Bearer ' + token

          }})
          .then(function(res) {
            console.log("Logging you out fam");
          token = null;
          $cookies.remove('loggedIn');
          $cookies.remove('userToken');
          $cookies.remove('sponsorId');  
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });
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

      console.log(token);

      return token;

    };


    //
    // Sets the token
    //
    auth.setToken = function(pToken, username) {
      token = pToken;
      username = username
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
      var alias = 'Sponsor:' + sponsorId;
      mixpanel.identify(alias);
    }


    //
    // Check if the user is Authenticated
    //
    auth.isAuthenticated = function() {
      return !!Session.userToken || !!$cookies.get('userToken');
    }


    return auth
  }
]);
