
'use strict';

/*------------------------------------*\
   Settings Controllers 
\*------------------------------------*/


twopence.controller('settingsCtrl', [
    'Sponsor',
    'User',
    function(
      Sponsor, 
      User) {

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
    Sponsor.getSponsorInfo().then(function(sponsorInfo) {

      vm.sponsorInfo = sponsorInfo;

      vm.userSettings.phone = vm.sponsorInfo.phone; 
      vm.userSettings.sms_preferred = vm.sponsorInfo.sms_preferred; 

    })  
    .catch(function(err) {

      console.log(err); 

    });


    //
    // Saves the changes by passing in the form and seeing if it validates
    // if it does, we make a patch request  with the userSettings object 
    // We also remove the confirm password prop everytime, not needed in payload
    //
    vm.saveChanges = function(pUserSettingsForm) {

      if(vm.userSettings.password.length === 0) {

        delete vm.userSettings.password

      }

      delete vm.userSettings.confirmPassword

      if(pUserSettingsForm.$valid) {

        console.log(vm.userSettings); 

        User.updateSettings(vm.userSettings).then(function(pSuccess) {

          console.log(pSuccess)

        }); 

      } else {

        console.log('no changes have been made'); 

      }

    }; 


}]); 
