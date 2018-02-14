
'use strict';

/*------------------------------------*\
    #Fixed CTA Directive
\*------------------------------------*/

twopence.directive('fixedCtaDir', [
    '$anchorScroll', 
     'MediaCheck', function(
        $anchorScroll, 
        MediaCheck) {

  return {

    restrict: "E",
    replace: true, 
    templateUrl: "js/home/fixedCta.html",
    controller: function() {}, 
    controllerAs: 'fixedCta',
    bindToController: true, 
    link: function(scopel, element, attrs, fixedCta) {  

      fixedCta.scrollToSection = function(pSection) {

        if(MediaCheck.checkIfSmall()) {

          $anchorScroll.yOffset = -170; 

        } else {
          $anchorScroll.yOffset = 80; 

        }
        $anchorScroll(attrs.target);

      }

    }

  }

}]); 
  