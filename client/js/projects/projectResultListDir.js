
'use strict'; 

/*------------------------------------*\
    #Project Result Directive
\*------------------------------------*/

humanautSite.directive('projectResultListDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.$onInit = function() {


        vm.results = vm.content.fields.list; 

        console.log(vm.results); 

      }

    }, 
    controllerAs: 'projectResultList',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectResultList.html',
    link: function(scope, element, attrs) {}

  }

}); 
