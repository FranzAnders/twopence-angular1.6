

'use strict'; 

/*------------------------------------*\
    #Case Study Customizer Content Directive
\*------------------------------------*/

humanautSite.directive('customizrContentDir',[
     'Customizr',
     '$rootScope', 
     '$timeout', function(
      Customizr, 
      $rootScope, 
      $timeout) {

  return {

    replace: true, 
    scope: {}, 
    controller: [
      'Customizr', 
      '$scope', 
      '$rootScope',
      '$timeout', function(
        Customizr, 
        $scope,
        $rootScope,
        $timeout) {

      var vm = this; 

      vm.caseStudies = null; 

      $rootScope.$on('user-customized-site', function(event, data) {

        vm.caseStudies = null; 

        vm.caseStudies = data.content.customContent; 

      });

    }],
    controllerAs: 'customizrContent',
    templateUrl: 'js/customizr/customizrContent.html',
    link: function(scope, element) {}

  }

}]); 
