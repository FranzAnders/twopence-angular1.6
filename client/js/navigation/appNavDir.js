

'use strict'

/*------------------------------------*\
   App Navigation Directive
\*------------------------------------*/

twopence.directive('appNavDir', function() {

  return {

    restrict: "E", 
    scope: {}, 
    controller: ['$state', function($state) {

        var vm = this; 


        vm.isActive = function(pState) {

          console.log(pState); 
          
          return $state.is(pState); 

        }; 


    }], 
    controllerAs: 'nav', 
    bindToController: true, 
    templateUrl: "js/navigation/appNav.html",
    link: function(scope, attrs, element) {



    }

  }

}); 

