  
'use strict';

/*------------------------------------*\
   Sign Up Controller
\*------------------------------------*/

twopence.controller('signUpCtrl', [
  '$filter',
  '$scope',
  '$state',
  '$timeout',
  '$fancyModal',
  'User',
  'Sponsor',
  'Auth',
  function(
    $filter,
    $scope,
    $state,
    $timeout,
    $fancyModal,
    User,
    Sponsor,
    Auth) {

    var vm = this;

    vm.formUnsubmitted = true;

    $scope.$state = $state;

    vm.loadingScreen = false; 



    //
    // We store the user info and user info as objects to then
    // inject into the requests
    //
    vm.userInfo = {};



    //
    // Checks if there is already a token in session from users
    //
    if (Auth.getToken()) {

      $state.go('main.signUp.identity');

    } else {

      $state.go('main.signUp.account');
    }



    //
    // Submits the first half of the user info needed to create one
    //
    vm.submitAccountInfo = function(form) {
       
      if (form.$valid) {
        delete vm.userInfo.confirmPassword;
        vm.loadingScreen = true; 

        $timeout(function() {
          
          $state.go('main.signUp.identity');
          vm.loadingScreen = false; 

        }, 1200); 


      } else {
        console.log('not yet boy');
        console.log(form); 

      }

    };


    //
    // Creates the sponsor fom the information provided and the logged in account
    //
    vm.createUser = function(pSponsorForm) {

      if (pSponsorForm.$valid) {
        vm.userInfo.dob = $filter('date')(vm.sponsorDob, 'yyyy-MM-dd');
        console.log("This is valid. Just to confirm your variables");

          User.create(vm.userInfo).then(function() {
            $state.go('main.signUp.confirmation');

            User.verify().then(function(initialised) {
              this.resolve(initialised);
            }).catch(function(err) {
              this.reject(err);
            });

          }).catch(function(err) {
            vm.status = err.data.message;
          })

      } else {

        console.log("ERROR: Form is not valid");

      }

    };

    vm.verifyEmail = function() {
      User.verify();
      $state.go('sponsor.dashboard');
    };

    vm.openTermsModal = function() {

      $fancyModal.open({

        templateUrl: 'js/home/signUp-terms.html',
        controller: 'signUpCtrl as signUp',
        themeClass: 'fancymodal--secondary fancymodal--medium',
        openingClass: 'is-open',
        closingClass: 'is-closed'

      });

    };



    // vm.processForm = function() {

    //   console.log("processing form...");

    //   console.log($scope.user);

    //   vm.formUnsubmitted = false;

    //   $timeout(function() {

    //     $state.go('main.signUp.confirmation');

    //   }, 1400);


    // };


  }
]);
