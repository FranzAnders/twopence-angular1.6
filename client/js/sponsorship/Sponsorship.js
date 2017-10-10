
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

  return sponsorship; 

}]); 
