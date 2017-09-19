
'use strict';

/*------------------------------------*\
   Sponsee Service 
\*------------------------------------*/

twopence.factory('Sponsee', [
    'Sponsor',
    '$q', 
    function(
      Sponsor,
      $q) {


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


  var Sponsee = {}; 


  Sponsee.getAllContributions = function() {

      var deferred = $q.defer(); 

      deferred.resolve(sponseeContributions);

      return deferred.promise;

  }; 


  Sponsee.getSponsee = function(pSponseeEmail) {

    var deferred = $q.defer(); 

    Sponsor.getSponsees().then(function(sponsorSponsees) {

      for(var i = 0; i < sponsorSponsees.length; i++) {

        if(sponsorSponsees[i].email === pSponseeEmail) {

            deferred.resolve(sponsorSponsees[i]);
            break

        } 

      }

      deferred.reject(false);

    });  


    return deferred.promise;

  };


  Sponsee.addSponseeToSystem = function(pSponsee) {

    sponseesInSystem.push(pSponsee); 

  };


  Sponsee.checkIfSponseeInSystem = function(pSponseeEmail) {

    var deferred = $q.defer(); 

    for(var i = 0; i < sponseesInSystem.length; i++) {

      if(sponseesInSystem[i].email === pSponseeEmail) {

          deferred.resolve(true);
          break

      } 

    }

    deferred.resolve(false);

    return deferred.promise; 

  };

  Sponsee.setPlan = function(pPlan, pSponseeEmail) {

    var deferred = $q.defer(); 

    Sponsee.getSponsee(pSponseeEmail).then(function(sponsee) {

      sponsee.plan = pPlan;
      sponsee.plan.frequency = 'monthly';
      
      Sponsee.checkIfSponseeInSystem(pSponseeEmail).then(function(pStatus) {
        
        sponsee.plan.frequency = 'monthly';

        if(pStatus) {
      
         console.log('sponsee is system'); 

          sponsee.plan.status = 'active';

        } else {

          console.log('sponsee is not system'); 

          sponsee.plan.status = 'unclaimed';
          
          Sponsee.addSponseeToSystem(sponsee); 

        }


        deferred.resolve(sponsee); 

      });   

    }).catch(function(error) {

      console.log('Sponsee was not found in users list of sponsors, so plan was not set');

      deferred.reject('Sponsee not in your list of sponsees found!');

    }); 

    return deferred.promise; 

  };

  return Sponsee

}]); 
