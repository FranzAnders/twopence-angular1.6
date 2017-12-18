
'use strict';

/*------------------------------------*\
   Settings Controllers 
\*------------------------------------*/


twopence.controller('settingsCtrl', [
    'Sponsor',
    'User',
    '$timeout',
    function(
      Sponsor, 
      User, 
      $timeout) {

    var vm = this; 



    //
    // Sets up the user settings object that will contain the form data / payload
    //
    vm.userSettings = {

      'phone': '',
      'sms_preferred': '',
      'password': '', 
      'confirmPassword': ''

    };


    //
    // Gets the sponsor's current information and sets the respective properties
    // to the userSettings object that gets used in the form submission
    //
    User.getUserInfo().then(function(sponsorInfo) {

      vm.sponsorInfo = sponsorInfo;

      $timeout(function() {

        vm.userSettings.phone = vm.sponsorInfo.phone; 
        vm.userSettings.sms_preferred = vm.sponsorInfo.sponsor.sms_preferred; 

      }); 


    })  
    .catch(function(err) {

      console.log(err); 

    });


    //
    // Saves the changes by passing in the form and seeing if it validates
    // if it does, we make a patch request  with the userSettings object 
    // We also remove the confirm password prop everytime, not needed in payload
    //
    vm.saveChanges = function(pUserSettingsForm, pUserSettings) {

      console.log(pUserSettings); 
      console.log(pUserSettingsForm); 

      if(!pUserSettings.password) {

        delete pUserSettings.password

      }

      delete pUserSettings.confirmPassword

      if(pUserSettingsForm.$valid) {

        User.updateSettings(pUserSettings).then(function() {

          console.log('user has been updated!')
          vm.resetForm(); 

        }).catch(function() {

          alert("ERROR, something went wrong"); 

        }); 

      } else {

        console.log('Form is not valid'); 

      }

    }; 



    //
    // Resets the form and sets everything as $pristine 
    //
    vm.resetForm = function() {

      vm.userSettingsForm.$setPristine(); 
      vm.userSettings.password = ''; 
      vm.userSettings.confirmPassword = ''; 

    }; 

    console.log(vm.userSettings); 

}]); 
