
'use strict'; 

/*------------------------------------*\
    Simple Calculator Directive
\*------------------------------------*/

twopence.directive('simpleCalcDir', function() {

  return {

    scope: {}, 
    restrict: "E", 
    replace: true, 
    controller: ['EfficientWatch', function(EfficientWatch) {

      var vm  = this; 

      vm.withSponsorship = false; 


      vm.$onInit = function() {

        if(vm.type === 'sponsor') {

          vm.withSponsorship = true; 

        }

      }

    }], 
    bindToController:{
      'copy': "=",
      'type': "@"
    },
    controllerAs: 'calculator',
    templateUrl: 'js/calculators/simpleCalc.html', 
    link: function() {


    }

  }

}); 