
'use strict'; 

/*------------------------------------*\
    #Project CTA Directive 
\*------------------------------------*/

humanautSite.directive('projectCtaDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: ['$timeout',  function($timeout) {

      var vm = this; 

      vm.$onInit = function() {

        console.log('soterer');
      }

    }], 
    controllerAs: 'projectCta',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectCta.html',
    link: function(scope, element, attrs) {}

  }


}); 
