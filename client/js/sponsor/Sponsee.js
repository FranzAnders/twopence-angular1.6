
'use strict';

/*------------------------------------*\
   Sponsee Service 
\*------------------------------------*/

twopence.factory('Sponsee', [
    '$q', 
    function($q) {


  var sponseesInSystem = [

    {
      'name' : 'Guillermo Martinez',
      'email': 'hi.guillermocasanova@gmail.com',
      'plan' : {

          'type': 'matching',
          'limit': '100',
          'frequency': 'monthly',
          'status': 'active'
      }
    },
    {
      'name' : 'Miguel Rodriguez',
      'email': 'cap@twopence.co',
      'plan' : {

          'type': 'matching',
          'limit': '',
          'frequency': 'monthly',
          'status' : 'inactive'
      }
    },
    {
      'name' : 'Cotto Rodriguez',
      'email': 'tiburon99@twopence.co',
      'plan' : {

          'type': 'matching',
          'limit': '400',
          'frequency': 'monthly',
          'status' : 'unclaimed'
      }
    },
    {
      'name' : 'Gustavo Martinez',
      'email': 'guillermo@humanaut.is',

      'plan' : {

          'type': '',
          'limit': '',
          'frequency': '',
          'status' : 'none'
      }
    }

  ];



  var sponsorSponsees = [
    {
      'name' : 'Carol Danvers',
      'email': 'tiburon99@twopence.co',
      'plan' : {

          'type': 'matching',
          'limit': '400',
          'frequency': 'monthly',
          'status' : 'unclaimed'
      }
    },
    {
      'name' : 'Guillermo Martinez',
      'email': 'hi.guillermocasanova@gmail.com',
      'plan' : {

          'type': 'matching',
          'limit': '100',
          'frequency': 'monthly',
          'status': 'active'
      }
    },
    {
      'name' : 'Miguel Rodriguez',
      'email': 'cap@twopence.co',
      'plan' : {

          'type': 'matching',
          'limit': '',
          'frequency': 'monthly',
          'status' : 'none'
      }
    }

  ];

  var Sponsee = {}; 

  Sponsee.getAllSponsees = function() {

      var deferred = $q.defer(); 

      deferred.resolve(sponsorSponsees);

      return deferred.promise;

  };


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
      'frequency': 'none'

    }

    sponsorSponsees.push(pSponseeToAdd); 

  };

  Sponsee.setPlan = function(pPlan, pSponseeEmail) {

    var deferred = $q.defer(); 

    Sponsee.getSponsee(pSponseeEmail).then(function(sponsee) {

      sponsee.plan = pPlan;
      sponsee.plan.frequency = 'monthly';
      
      deferred.resolve(sponsee); 


    }).catch(function(error) {

      console.log('User was not found in system, so plan was not set');

      deferred.reject('User not found!');

    }); 

    return deferred.promise; 

  };

  return Sponsee

}]); 
