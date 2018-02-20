
'use strict';

/*------------------------------------*\
    Graduate Mail Sign Up Directive
\*------------------------------------*/

twopence.directive('graduateMailSignUpDir', function() {

  return {

    restrict: "E",
    scope: {}, 
    replace: true,
    templateUrl: "js/home/graduateMailSignUp.html",
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