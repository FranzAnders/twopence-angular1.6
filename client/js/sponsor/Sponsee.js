
'use strict';

/*------------------------------------*\
   Sponsee Service 
\*------------------------------------*/

twopence.factory('Sponsee', [
    '$q', 
    function($q) {


  var sponsorSponsees = [

    {
      'name' : 'Guillermo Martinez',
      'email': 'hi.guillermocasanova@gmail.com',
      'plan' : {

          'type': 'matching',
          'limit': '100',
          'frequency': 'monthly'
      }
    },
    {
      'name' : 'Miguel Rodriguez',
      'email': 'cap@twopence.co',
      'plan' : {

          'type': 'matching',
          'limit': '',
          'frequency': 'inactive'
      }
    }

  ];

  var Sponsee = {}; 


  Sponsee.getSponsee = function(pSponseeEmail) {

    var deferred = $q.defer(); 

    for(var i = 0; i < sponsorSponsees.length; i++) {

      if(sponsorSponsees[i].email === pSponseeEmail) {

          deferred.resolve(sponsorSponsees[i]);
          break

      } 

    }

    deferred.reject(false);

    return deferred.promise;

  };


  Sponsee.addSponsee = function(pSponseeToAdd) {

    pSponseeToAdd.plan = {

      'type': '',
      'limit': '',
      'frequency': 'inactive'

    }

    sponsorSponsees.push(pSponseeToAdd); 

  };

  return Sponsee

}]); 
