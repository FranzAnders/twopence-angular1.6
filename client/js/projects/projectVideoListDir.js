
'use strict'; 

/*------------------------------------*\
    #Project Result Directive
\*------------------------------------*/

humanautSite.directive('projectVideoListDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: ['$sce', function($sce) {

      var vm = this; 

      vm.$onInit = function() {

        vm.videos = vm.content.fields.list; 

      }

    }], 
    controllerAs: 'projectVideoList',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectVideoList.html',
    link: function(scope, element, attrs) {}

  }

}); 
