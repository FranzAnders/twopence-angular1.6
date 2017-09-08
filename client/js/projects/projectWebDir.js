
'use strict'; 

/*------------------------------------*\
    #Project Web Directive
\*------------------------------------*/

humanautSite.directive('projectWebDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: ['$sce', function($sce) {

      var vm = this; 

      vm.$onInit = function() {

        vm.embed = $sce.trustAsHtml(vm.content.fields.webVideo); 

        
      }

    }], 
    controllerAs: 'projectWeb',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectWeb.html',
    link: function(scope, element, attrs) {}

  }

}); 
