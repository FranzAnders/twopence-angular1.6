
'use strict';

/*------------------------------------*\
    Sponsor Mail Sign Up Directive
\*------------------------------------*/

twopence.directive('sponsorMailSignUpDir', function() {

  return {

    restrict: "E",
    scope: {}, 
    replace: true,
    templateUrl: "js/home/sponsorMailSignUp.html",
    controller: function() {

      var vm = this; 

    }, 
    controllerAs: "mailSignUp", 
    bindToController: {

      inputLabel: "@"

    },
    link: function(scope, element, attrs) {


    }

  }

}); 