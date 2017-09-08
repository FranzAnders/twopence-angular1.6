
'use strict'; 

/*------------------------------------*\
    #Project Header Directive 
\*------------------------------------*/

humanautSite.directive('projectHeaderDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: ['$timeout',  function($timeout) {

      var vm = this; 

    }], 
    controllerAs: 'projectHeader',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectHeader.html',
    link: function(scope, element, attrs) {}

  }


}); 
