
'use strict'; 

/*------------------------------------*\
    #Project Result Directive
\*------------------------------------*/

humanautSite.directive('projectPaginationDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.$onInit = function() {

        vm.previous = vm.content.previous; 

        vm.next = vm.content.next; 

      }

    }, 
    controllerAs: 'projectPagination',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectPagination.html',
    link: function(scope, element, attrs) {}

  }

}); 
