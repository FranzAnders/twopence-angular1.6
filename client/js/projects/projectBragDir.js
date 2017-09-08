
'use strict'; 

/*------------------------------------*\
    #Project Brag Directive
\*------------------------------------*/

humanautSite.directive('projectBragDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.showQuotes = false; 

      vm.$onInit = function() {

        vm.brag = vm.content.fields; 

        vm.showQuotes = true; 

      }; 

    }, 
    controllerAs: 'projectBrag',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectBrag.html',
    link: function(scope, element, attrs) {}

  }

}); 
