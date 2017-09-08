
'use strict'; 

/*------------------------------------*\
    #Project Video Directive
\*------------------------------------*/

humanautSite.directive('projectVideoDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: ['$sce', function($sce) {

      var vm = this; 

      vm.$onInit = function() {

        vm.embed = $sce.trustAsHtml(vm.content.fields.embedCode); 

      }

    }], 
    controllerAs: 'projectVideo',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectVideo.html',
    link: function(scope, element, attrs) {}

  }

}); 
