
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

    vm.accountCreated = false;

    $scope.$state = $state;

    vm.loadingScreen = false;

    //
    // We store the user info and user info as objects to then
    // inject into the requests
    //
    vm.userInfo = {
      'sms_preferred' : true
    };



    //
    // Checks if there is already a token in session from users
    //
    if (Auth.getToken()  && !$state.is('main.signUp.verify')  && !$state.is('main.signUp.confirmation')) {
      $state.go('main.signUp.identity');
    }



    if(!vm.userInfo.email  && !$state.is('main.signUp.verify') && !$state.is('main.signUp.confirmation')) {
      $state.go('main.signUp.account');
    }


    if($state.is('main.signUp.confirmation') ||  $state.is('main.signUp.verify')) {

      vm.accountCreated = true;

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
        }, 800);
      } else {
        console.log('ERROR: Form is not valid.');
      }

    };



    //
    // Creates the sponsor fom the information provided and the logged in account
    //
    vm.createUser = function(pSponsorForm, pUserInfo) {

      var userInfo = pUserInfo;

      if(pSponsorForm.$valid) {

          var date = userInfo.dob;

          User.create(userInfo).then(function(res) {

            vm.accountCreated = true;

            const alias = 'Sponsor:' + res.data.sponsor_id.toString()
            console.log(alias)
            mixpanel.alias(alias);
            mixpanel.people.set_once({
              'User Type' : 'Sponsor'
              'Invited' : res.data.invited,
              '$email' : userInfo.email,
              'Date Signup' : new Date(),
              '$first_name' : userInfo.first_name,
              '$last_name' : userInfo.last_name,
              '$name' : userInfo.first_name + ' ' + userInfo.last_name,
              'DOB' : userInfo.dob
            });
            mixpanel.track('Signed Up')

            $state.go('main.signUp.confirmation');

          }).catch(function(err) {
            vm.statusText = err.data.message;
            console.log(err);

            if(vm.statusText === 'Email has already been taken.') {

              alert('No duplicates! It appears there is an account with this email.')

            }

          })

      } else {

        console.log("ERROR: Form is not valid");

      }

    };


    //
    // Opens the terms of agreement for the app
    //
    vm.openTermsModal = function() {

      $fancyModal.open({

        templateUrl: 'js/home/signUp-terms.html',
        controller: 'signUpCtrl as signUp',
        themeClass: 'fancymodal--secondary fancymodal--medium',
        openingClass: 'is-open',
        closingClass: 'is-closed'

      });

    };

  }
]);
