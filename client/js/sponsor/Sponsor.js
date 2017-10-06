
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
        'amount' : 100.00,
        'sponsee' : {
          'name' : 'Miguel Rodriguez',
          'email': 'cap@twopence.co'
        }
      },
      {
        'date': '02/07/17',
        'amount' : 20.00,
        'sponsee' : {
          'name' : 'Miguel Rodriguez',
          'email': 'cap@twopence.co'
        }
      },
      {
        'date': '01/03/17',
        'amount' : 50.00,
        'sponsee' : {
          'name' : 'Miguel Rodriguez',
          'email': 'cap@twopence.co'
        }
      },
      {
        'date': '03/07/17',
        'amount' : 22.00,
        'sponsee' : {
          'name' : 'Carol Danvers',
          'email': 'tiburon99@twopence.co'
        }
      },
      {
        'date': '02/07/17',
        'amount' : 500.00,
        'sponsee' : {
          'name' : 'Carol Danvers',
          'email': 'tiburon99@twopence.co'
        }
      },
      {
        'date': '01/03/17',
        'amount' : 1000.00,
        'sponsee' : {
          'name' : 'Carol Danvers',
          'email': 'tiburon99@twopence.co'
        }
      }

    ]


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

  Sponsor.getSponsees = function() {


    var deferred = $q.defer();

    deferred.resolve(sponsorSponsees);

    return deferred.promise;

  };

  Sponsor.getAllContributions = function() {

      // var deferred = $q.defer();
      //
      // deferred.resolve(sponsorContributions);
      //
      // return deferred.promise;

      var jwtToken = Auth.getToken();

      console.log("Your JWT is: " + jwtToken);


      return $q(function(resolve, reject) {
        $http.get(BASE_URL + '/v1/contributions ', {
          headers: {

            "Authorization": jwtToken

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
        $http.get(BASE_URL + '/v1/sponsors/dashboard', {
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

  }; 


  Sponsor.getSponsorInfo = function() {

      var jwtToken = Auth.getToken();

      console.log("Your JWT is: " + jwtToken);

      return $q(function(resolve, reject) {
        $http.get(BASE_URL + '/v1/sponsors', {
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


  return Sponsor

}]);
