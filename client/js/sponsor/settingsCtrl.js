
'use strict';

/*------------------------------------*\
   Settings Controllers 
\*------------------------------------*/


twopence.controller('settingsCtrl', [
    'Sponsor',
    'User',
    '$fancyModal', 
    '$timeout',
    function(
      Sponsor, 
      User, 
      $fancyModal,
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

      }, 100); 


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

      var userSettings = pUserSettings;
      
      vm.resetForm(); 

      if(!userSettings.password) {
        delete userSettings.password
      }

      delete userSettings.confirmPassword

      if(pUserSettingsForm.$valid) {

        User.updateSettings(userSettings).then(function() {

           $fancyModal.open({
              templateUrl: 'js/modals/settings-change-success.html', 
              themeClass: 'fancymodal--primary  fancymodal--small',
              openingClass: 'is-open', 
              closingClass: 'is-closed',
              showCloseButton: false

          });


        }).catch(function() {

          alert("ERROR, something went wrong, try again."); 

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


}]); 
