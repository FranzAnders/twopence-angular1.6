
'use strict';

twopence.directive('robustAmountInputDir', ['EfficientWatch', function(EfficientWatch) {

  return {
      restrict: "E",
      replace: true,
      bindToController: true,
      scope: {}, 
      controller: function() {

        var vm = this; 

        //  
        // Increases the Boost amount by 5
        //
        vm.increaseAmount = function(pIncrease) {
          //vm.resetBoostingView()

          if(!vm.customAmount) {
            vm.customAmount = 0 
          }
          
          vm.customAmount += pIncrease;
        }; 


        //
        // Decreases the Boost amount by a specified amount
        //
        vm.decreaseAmount = function(pDecrease) {

          if(vm.customAmount <0 || !vm.customAmount) {
            vm.customAmount = 0;
          } else {
            vm.customAmount = vm.customAmount - pDecrease;
          }

          if(vm.customAmount < 0) {
            vm.customAmount  = 0; 
          }

        };


      }, 
      controllerAs: 'robustAmountInput',
      bindToController: {

          customAmount: "=amount"
      },
      require: ["robustAmountInputDir", "ngModel", "^form"],
      templateUrl: 'js/general/robustAmountInput.html',
      link: function(scope, element, attrs, controllers) {

          var robustAmountInput = controllers[0];
          var ngModel = controllers[1]; 
          var form = controllers[2];

          EfficientWatch.watch('customAmount', robustAmountInput, function() {
            ngModel.$setViewValue(robustAmountInput.customAmount);
          });
      }

  }

}]); 
