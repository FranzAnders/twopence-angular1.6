
'use strict';

/*------------------------------------*\
   Sponsor Service 
\*------------------------------------*/

twopence.factory('Sponsor', [
    '$q', 
    function($q) {



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


  var sponsorContributions = [

      {
        'date': '03/07/17',
        'amount' : '100.00',
        'sponsee' : {
          'name' : 'Miguel Rodriguez',
          'email': 'cap@twopence.co'    
        }
      },
      {
        'date': '02/07/17',
        'amount' : '20.00',
        'sponsee' : {
          'name' : 'Miguel Rodriguez',
          'email': 'cap@twopence.co'    
        }
      },
      {
        'date': '01/03/17',
        'amount' : '50.00',
        'sponsee' : {
          'name' : 'Miguel Rodriguez',
          'email': 'cap@twopence.co'    
        }
      },
      {
        'date': '03/07/17',
        'amount' : '22.00',
        'sponsee' : {
          'name' : 'Carol Danvers',
          'email': 'tiburon99@twopence.co'
        }
      },
      {
        'date': '02/07/17',
        'amount' : '500.00',
        'sponsee' : {
          'name' : 'Carol Danvers',
          'email': 'tiburon99@twopence.co'
        }
      },
      {
        'date': '01/03/17',
        'amount' : '1000.00',
        'sponsee' : {
          'name' : 'Carol Danvers',
          'email': 'tiburon99@twopence.co'
        }
      }

    ]


  var Sponsor = {}; 


  Sponsor.getSponsor = function() {



  };


  Sponsor.getSponsees = function() {

    var deferred = $q.defer(); 

    deferred.resolve(sponsorSponsees);

    return deferred.promise; 

  };


  Sponsor.getAllContributions = function() {

      var deferred = $q.defer(); 

      deferred.resolve(sponsorContributions);

      return deferred.promise;

  }; 


  return Sponsor

}]); 
