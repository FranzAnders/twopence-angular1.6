
'use strict'; 

/*------------------------------------*\
    #Case Study Customizer Directive
\*------------------------------------*/

humanautSite.directive('customizrDir', [
    'Customizr', 
    '$rootScope', 
    '$timeout', function(
      Customizr, 
      $rootScope,
      $timeout) {

  return {

    replace: true, 
    scope: {}, 
    controller: 'customizrCtrl',
    controllerAs: 'customizr',
    templateUrl: 'js/customizr/customizr.html',
    link: function(scope, element, attrs, customizr) {

      customizr.scrollTop = function() {

        window.scrollTo(0, 0);

      };

      //
      // Displays the customizr
      //
      $('[data-ui-component="case-study-customizer"]').addClass('is-showing'); 
        
   }

  }

}]);

