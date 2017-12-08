
'use strict';

/*------------------------------------*\
   Sponsorship Factory
\*------------------------------------*/


twopence.factory('Sponsorship', [
    '$q',
    '$http',
    'Auth',
    'BASE_URL',
    function(
      $q,
      $http,
      Auth,
      BASE_URL) {


  var sponsorship = {};
  //
  // Creates a sponsorship plan between user and logged-in sponsor
  //
  sponsorship.create = function(pSponsorshipInfo) {

    return $q(function(resolve, reject) {

      $http.post(BASE_URL + '/v1/sponsorships', pSponsorshipInfo, {

        headers: {

          'Authorization': 'bearer ' + Auth.getToken()
        }

      }).then(function(res) {

        resolve(res.data);

      }).catch(function(err){

        reject(err);

      })

    });


  };


  //
  //  Looks up a sponsorship plan via an id
  //
  sponsorship.get = function(pPlanId) {

    return $q(function(resolve, reject) {

        $http.get(BASE_URL + '/v1/sponsorships/' + pPlanId, {

          headers: {

            'Authorization' : 'bearer ' + Auth.getToken()

          }

        }).then(function(res) {

          resolve(res.data);

        }).catch(function(err) {

          reject(err);

        });


    });

  };

  //
  // Creating new plan between Sponsor & Sponsee
  // Using SponseeID and Plan Info

  sponsorship.createNewPlan = function(pSponseeId, pSponseeInfo) {

    return $q(function(resolve, reject) {

        $http.post(BASE_URL + '/v1/sponsorships/' + pSponseeId + '/plans', pSponseeInfo, {

          headers: {

            'Authorization' : 'bearer ' + Auth.getToken()

          }

        }).then(function(res) {

          resolve(res.data);

        }).catch(function(err) {

          reject(err);

        });


    });

  }


  //
  // Gets all current sponsorships for a logged in user
  //
  sponsorship.getAll = function() {

    return $q(function(resolve, reject) {

        $http.get(BASE_URL + '/v1/sponsorships/', {

          headers: {

            'Authorization' : 'bearer ' + Auth.getToken()

          }

        }).then(function(res) {

          resolve(res.data);

        }).catch(function(err) {

          reject(err);

        });


    });

  };


  //
  // Patches the sponsorship specified for pausing or changing the plan details
  //
  sponsorship.patch = function(pSponsorshipId, pPlanId, load) {

    console.log("I'm patching my G");

    return $q(function(resolve, reject) {

      $http.patch(BASE_URL + '/v1/sponsorships/' + pSponsorshipId + '/plans/' + pPlanId, load, {

        headers: {

          'Authorization' : 'bearer ' + Auth.getToken(),

          'Content-type' : 'application/json'

        },

      }).then(function(res) {

        resolve(res.data);

      }).catch(function(err) {

        reject(err);

      });

    });

  };


  //
  //  Gets all the contributions made for a sponsorship
  //
  sponsorship.getContributions = function(pSponsorshipId) {

    return $q(function(resolve, reject) {

        $http.get(BASE_URL + '/v1/sponsorships/' + pSponsorshipId + '/contributions', {

          headers: {

            'Authorization' : 'bearer ' + Auth.getToken()

          }

        }).then(function(res) {

          resolve(res.data);

        }).catch(function(err) {

          reject(err);

        });


    });


  }

  return sponsorship;

}]);
