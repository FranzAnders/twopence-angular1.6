
'use strict'; 

/*------------------------------------*\
    #Project Press List Directive
\*------------------------------------*/

humanautSite.directive('projectPressListDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.$onInit = function(){

        vm.press = vm.content.fields.list; 

      }

    }, 
    controllerAs: 'projectPressList',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectPressList.html',
    link: function(scope, element, attrs) {}

  }

}); 
