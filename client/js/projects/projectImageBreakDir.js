
'use strict'; 

/*------------------------------------*\
    #Project Image Break Directive 
\*------------------------------------*/

humanautSite.directive('projectImageBreakDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.url = null;  

      vm.$onInit = function() {

        vm.url = vm.content.fields.large.fields.file.url; 

      }

    }, 
    controllerAs: 'projectImageBreak',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectImageBreak.html',
    link: function(scope, element, attrs) {}

  }


}); 
