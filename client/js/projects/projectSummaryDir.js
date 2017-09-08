
'use strict'; 

/*------------------------------------*\
    #Project Summary Directive
\*------------------------------------*/

humanautSite.directive('projectSummaryDir', function() {

  return {

    restrict: 'E',
    scope: {}, 
    replace: true, 
    controller: function() {

      var vm = this; 

    }, 
    controllerAs: 'projectSummary',
    bindToController: {

      content: "="

    }, 
    templateUrl: 'js/projects/projectSummary.html',
    link: function(scope, element, attrs) {}

  }

}); 
