
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

    }], 
    bindToController:{
      'copy': "=",
    },
    controllerAs: 'calculator',
    templateUrl: 'js/calculators/simpleCalc.html', 
    link: function() {


    }

  }

}); 