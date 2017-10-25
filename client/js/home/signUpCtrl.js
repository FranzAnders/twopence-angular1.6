
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

      vm.userCreationForm = {};

      vm.sposorCreationForm = {};


      //
      // We store the sponsor info and user info as objects to then
      // inject into the requests
      //
      vm.sponsorInfo = {
        'sms_preferred': false,
        'accepted_tc': false
      };


      vm.userInfo = {
        'phone': ''
      };


      //
      // We store the DOB in a separate property because angular 1.3+
      // ng-model for type='date' in input fields expects dates and not strings
      // or converted dates
      vm.sponsorDob = new Date('2017', 9, 22);


      if(Auth.getToken()) {

        console.log('theres a token');

        $state.go('main.signUp.identity');

      } else {

        $state.go('main.signUp.account');
      }


      //
      // Creates the user from the information provided
      //
      vm.createUser = function(form) {

        if(form.$valid) {

          delete vm.userInfo.confirmPassword;

          User.create(vm.userInfo).then(function() {

            console.log('yep, it passes ');

            $state.go('main.signUp.identity');


          });

        } else {

          console.log('not yet boy');

        }

      };


      //
      // Creates the sponsor fom the information provided and the logged in account
      //
      vm.createSponsor = function(pSponsorForm) {

        if(pSponsorForm.$valid) {

          vm.sponsorInfo.dob = $filter('date')(vm.sponsorDob, 'yyyy-MM-dd');

          Sponsor.create(vm.sponsorInfo).then(function() {
            console.log('valid');
            $state.go('main.signUp.confirmation');


            User.verify().then(function(initialised) {
              this.resolve(initialised);
            }).catch(function(err) {
              this.reject(err);
            });

          });
        } else {


          console.log('not valid')


        }

      };

      vm.verifyEmail = function() {
        console.log("Starting verification");
        User.verify();
        $state.go('sponsor.dashboard');
      };

      vm.openTermsModal = function() {
        console.log("Attempting opening of Modal");
        $fancyModal.open({

          templateUrl: 'js/home/signUp-terms.html',
          controller: 'signUpCtrl as signUp'

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


    }]);
