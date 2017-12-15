
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
    function(
      $filter,
      $q,
      $http,
      Auth,
      BASE_URL) {


   var sponsorship = {};


  //
  // Cacluating today's date to compare to termination Date in Pause / Unpause
  //
  var getTodaysDate = function() {

    var today = new Date();

    var dd = today.getDate();

    var mm = today.getMonth() + 1; 

    var yyyy = today.getFullYear();

    if (dd < 10) {

      dd = '0' + dd

    }

    if (mm < 10) {

      mm = '0' + mm

    }

    today = yyyy + '-' + mm + '-' + dd;

    return today; 

  };



  //
  // Gets the last schedule of a matching plan 
  //
  var getLastSchedule = function(pSchedules) {

    var lastScheduleIndex = pSchedules.length - 1;   

    return pSchedules[lastScheduleIndex]; 

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

    var tomorrowsDate =  new Date();  
    var todaysDate = $filter('date')(new Date(), 'yyyy-MM-dd')
    var lastPlan = getLastSchedule(pPlan.schedules);


    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    tomorrowsDate = $filter('date')(tomorrowsDate, 'yyyy-MM-dd'); 



    console.log(pPlan); 
    console.log(todaysDate);
    console.log(tomorrowsDate); 


    if(todaysDate === lastPlan.date_effective || tomorrowsDate === lastPlan.date_effective) {

      return true;

    } else {

      return false; 
    }


  };


  //
  // Returns the status of a plan based on sponsee info and a plan 
  //
  sponsorship.getPlanStatus = function(pPlan, pSponseeInfo) {

      var status = '';
      var planEndsToday = false; 
      var planStartsToday = false; 

      if(pPlan) {

        planEndsToday = sponsorship.checkIfTerminatesToday(pPlan);
        planStartsToday = sponsorship.checkIfStartsToday(pPlan);


      } else {

        planEndsToday = false;
        planStartsToday = false;

      }

      if(pPlan) {

        if(planEndsToday || !pPlan.status) {

          status = 'paused';

        }


        if(pPlan.status || planStartsToday) {

          status = 'active'; 

        }

      }
      

      if(pSponseeInfo.sponsee.status !== 'active') {

        status = 'invite pending'

      }

      console.log(status); 

      return status; 

  };

  return sponsorship;

}]);
