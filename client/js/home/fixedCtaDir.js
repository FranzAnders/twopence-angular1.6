
'use strict';

/*------------------------------------*\
    #Fixed CTA Directive
\*------------------------------------*/

twopence.component('fixedCtaDir', {
  bindings: {
    scrollToSection: '@'
  },
  templateUrl: "js/home/fixedCta.html",
  controller: fixedCtaCtrl
});

fixedCtaCtrl.$inject = ['$anchorScroll', 'MediaCheck']
function fixedCtaCtrl($anchorScroll, MediaCheck) {
  this.scrollToSection = function(pSection) {
    if(MediaCheck.checkIfSmall()) {
      $anchorScroll.yOffset = -170; 
    } else {
      $anchorScroll.yOffset = 80; 
    }
    $anchorScroll(attrs.target);
  }
}
