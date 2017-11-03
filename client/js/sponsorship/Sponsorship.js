
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

  sponsorship.createPlan = function(pSponseePlan, pSponseeId) {

    return $q(function(resolve, reject) {

      $http.post(BASE_URL + '/v1/sponsorships/' + pSponseeId + '/plans/', pSponseePlan, {

        headers: {

          'Authorization': 'bearer ' + Auth.getToken()

        }
      }).then(function(res) {

        resolve(res);

      }).catch(function(err) {

        reject(err);

      });

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

  sponsorship.patch = function(load) {
    console.log("I'm patching my G");
    return $q(function(resolve, reject) {
      $http.patch(BASE_URL + '/v1/sponsorships/' + load.id, load, {
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

  return sponsorship;

}]);
