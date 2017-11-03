
'use strict';

/*------------------------------------*\
   Sponsee Service
\*------------------------------------*/

twopence.factory('Sponsee', [
    'Sponsor',
    '$http',
    '$q',
    'Auth',
    'BASE_URL',
    function(
      Sponsor,
      $http,
      $q,
      Auth,
      BASE_URL) {


  var Sponsee = {};

  //
  // Searchers for a sponsee via email
  //
  Sponsee.search = function(pSponseeInfo) {

    return $q(function(resolve, reject) {

      $http.post(BASE_URL + '/v1/users/action/find', pSponseeInfo, {

        headers: {

          'Authorization': 'bearer ' + Auth.getToken()
        }

      }).then(function(res) {

        console.log(res)
        resolve(res.data);

      }).catch(function(err){

        reject(err);

      })

    });

  };


  //
  // Gets a sponsee via id
  //
  Sponsee.getSponsee = function(pId) {

    return $q(function(resolve, reject) {

      $http.get(BASE_URL + '/v1/sponsorships/' + pId, {

        headers: {

          'Authorization': 'bearer ' + Auth.getToken()

        }

      }).then(function(res) {

        resolve(res.data);

      }).catch(function(err) {

        reject(err);

      })

    });

  };

  return Sponsee

}]);
