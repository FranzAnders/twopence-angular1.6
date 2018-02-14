
'use strict'; 


twopence.directive('funnelDir', function() {

    return {

      restrict: "E", 
      scope: {}, 
      replace: true, 
      controller: ['Funnel', function() {

          var vm = this; 

      }],
      controllerAs: 'funnel', 
      bindToController: true, 
      templateUrl: "js/funnel/funnel.html", 
      link: function(scope, element, attrs, funnel) {

          var page = document.querySelector('[data-ui-component="funnel"]');

          page.classList.add('is-hidden-by-funnel');

          funnel.revealPage() = function() {  


          }; 

      }

    }

}); 