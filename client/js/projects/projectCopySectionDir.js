
'use strict'; 

/*------------------------------------*\
    #Project Copy Section Directive 
\*------------------------------------*/

humanautSite.directive('projectCopySectionDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this;  

      vm.$onInit = function() {


      }

    }, 
    controllerAs: 'projectCopySection',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectCopySection.html',
    link: function(scope, element, attrs) {}

  }


}); 
