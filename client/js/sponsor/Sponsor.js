
'use strict';

/*------------------------------------*\
   Sponsor Service
\*------------------------------------*/

twopence.factory('Sponsor', [
    '$q',
    '$http',
    'Auth',
    'BASE_URL',
    function($q, $http, Auth, BASE_URL) {


  var Sponsor = {};

  Sponsor.addSponsee = function(pSponseeToAdd) {

    sponsorSponsees.push(pSponseeToAdd);

  };

  Sponsor.addContribution = function(pContribution) {

    var deferred = $q.defer();

    sponsorContributions.push(pContribution);

    deferred.resolve(pContribution);

    return deferred.promise;

  };


  //
  // Gets all the sponsees for a sponsor
  //
  Sponsor.getSponsees = function() {

    return $q(function(resolve, reject) {
      $http.get(BASE_URL + '/v1/sponsees ', {
        headers: {

          "Authorization": 'Bearer ' + Auth.getToken()

        }})
        .then(function(res) {
          console.log(res.data);
          resolve(res.data);
        }).catch(function(err) {
          reject(err);
        });
    });

  };



  //
  // Gets all the contributions made by a sponsor to date
  //
  Sponsor.getAllContributions = function() {

    return $q(function(resolve, reject) {
      $http.get(BASE_URL + '/v1/contributions ', {
        headers: {

          "Authorization": 'Bearer ' + Auth.getToken()

        }})
        .then(function(res) {
          console.log(res.data);
          resolve(res.data);
        }).catch(function(err) {
          reject(err);
        });
    });

  };


  //
  // Gets the dashboard data for a sponsor
  //
  Sponsor.getDashboard = function() {

      var jwtToken = Auth.getToken();

      console.log("Your JWT is: " + jwtToken);

      return $q(function(resolve, reject) {
        $http.get(BASE_URL + '/v1/sponsorships', {
          headers: {

            "Authorization": 'bearer ' + jwtToken

          }})
          .then(function(res) {
            console.log(res.data);
            resolve(res.data);
          }).catch(function(err) {
            reject(err);
          });
      });

    }

  //
  // Creates the sponsor object
  //
  Sponsor.create = function(pSponsorInfo) {

    return $q(function(resolve, reject) {
      $http.post(BASE_URL +  '/v1/sponsors', pSponsorInfo, {

        headers: {

          "Authorization": 'bearer ' + Auth.getToken()

        }

      }).then(function(res) {
          console.log(res);
          resolve(res.data);
        }).catch(function(err) {
          reject(err);
        });
    });

  };
  // Attempt At v2 Call for Creating new users

  Sponsor.new = function(pSponsorInfo) {

    return $q(function(resolve, reject) {
      $http.post(BASE_URL +  '/v1/users', pSponsorInfo, {

      }).then(function(res) {
          console.log(res);
          resolve(res.data);
        }).catch(function(err) {
          reject(err);
        });
    });

  };


  Sponsor.verifyEmail = function(emailToken) {

    console.log("Verify e-mail arg:");
    console.log(emailToken);

    return $q(function(resolve, reject) {
      $http.post(BASE_URL +  '/v1/verification/token', emailToken, {
        headers: {
          "Authorization": "Bearer " + Auth.getToken()
        }
      })
      .then(function(res) {
        console.log(res);
        resolve(res.data);
        }).catch(function(err) {
          reject(err);
        });
    });

  };



  return Sponsor

}]);
