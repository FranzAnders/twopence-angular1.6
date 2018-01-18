
'use strict';

/*------------------------------------*\
   Sponsorship Factory
\*------------------------------------*/


twopence.factory('Sponsorship', [
    '$filter',
    '$q',
    '$http',
    'Auth',
    'BASE_URL',
    'moment',
    function(
      $filter,
      $q,
      $http,
      Auth,
      BASE_URL,
      moment) {


   var sponsorship = {};


  //
  // Cacluating today's date to compare to termination Date in Pause / Unpause
  //
  var getTodaysDate = function() {

    var dateISO = moment().format();
    var convertedDate = $filter('date')(dateISO, 'yyyy-MM-dd');
    var today = convertedDate; 

    return today 

  };



  //
  // Gets the last schedule of a matching plan 
  //
  var getLastSchedule = function(pSchedules) {

    return pSchedules[0]; 

  }




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

          console.log(err); 
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

    return $q(function(resolve, reject) {

      $http.patch(BASE_URL + '/v1/sponsorships/' + pSponsorshipId + '/plans/' + pPlanId, load, {

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


  //
  // Checks if a plan terminates today 
  //
  sponsorship.checkIfTerminatesToday = function(pPlan) {

    var todaysDate = getTodaysDate(); 

    var lastPlan = getLastSchedule(pPlan.schedules);

    var planEndDate = lastPlan.date_termination; 

    return planEndDate === todaysDate; 

  }; 


  //
  // Checks if plan starts today 
  //
  sponsorship.checkIfStartsToday = function(pPlan) {

    var dateISO = moment().format();
    var convertedDate = $filter('date')(dateISO, 'yyyy-MM-dd');
    var todaysDate = convertedDate; 
    var lastPlan = getLastSchedule(pPlan.schedules);
    
    return todaysDate === lastPlan.date_effective;

  };


  //
  // Checks if plan starts tomorrow 
  //
  sponsorship.checkIfStartsTomorrow = function(pPlan) {

    var dateISO = moment().add(1, 'days').format();
    var convertedDate = $filter('date')(dateISO, 'yyyy-MM-dd');
    var tomorrowsDate = convertedDate; 
    var lastPlan = getLastSchedule(pPlan.schedules);

    return tomorrowsDate === lastPlan.date_effective; 

  }; 

  //
  // Returns the status of a plan based on sponsee info and a plan 
  //
  sponsorship.getPlanStatus = function(pPlan, pSponseeInfo) {

      var status = '';
      var planEndsToday = false; 
      var planStartsToday = false; 
      var planStartsTomorrow = false; 

      if(pPlan) {

        planEndsToday = sponsorship.checkIfTerminatesToday(pPlan);
        planStartsToday = sponsorship.checkIfStartsToday(pPlan);
        planStartsTomorrow = sponsorship.checkIfStartsTomorrow(pPlan);



      } else {

        planEndsToday = false;
        planStartsToday = false;

      }

      if(pPlan) {

        if(planEndsToday || !pPlan.active) {

          status = 'paused';

        }


        if((pPlan.active || planStartsToday) &&  !planEndsToday) {

          status = 'active'; 

        }

        if(planStartsTomorrow) {

          status = 'activating';

        }

      }
      

      if(pSponseeInfo.sponsee.status !== 'active') {

        status = 'invite pending'

      }

      return status; 

  };

  return sponsorship;

}]);
