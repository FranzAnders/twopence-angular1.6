
'use strict'; 

/*------------------------------------*\
    #Project Result Directive
\*------------------------------------*/

humanautSite.directive('projectAwardListDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.$onInit = function() {

        vm.awards = vm.content.fields.list; 
        
      }

    }, 
    controllerAs: 'projectAwardList',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectAwardList.html',
    link: function(scope, element, attrs) {}

  }

}); 
