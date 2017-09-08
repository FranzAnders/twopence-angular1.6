
'use strict'; 

/*------------------------------------*\
    #Project Image List Directive 
\*------------------------------------*/

humanautSite.directive('projectImageListDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

      vm.images = [];  

      vm.$onInit = function() {

         vm.images = vm.content.fields.images; 

      }

    }, 
    controllerAs: 'projectImageList',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectImageList.html',
    link: function(scope, element, attrs) {}

  }


}); 
