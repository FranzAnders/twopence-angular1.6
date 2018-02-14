
'use strict'; 


twopence.directive('funnelDir', ['$timeout', 'Funnel', function($timeout, Funnel) {

    return {

      restrict: "E", 
      scope: {}, 
      replace: true, 
      controller: ['Funnel', function(Funnel) {

          var vm = this; 

          vm.isHidden = true;

      }],
      controllerAs: 'funnel', 
      bindToController: true, 
      templateUrl: "js/funnel/funnel.html", 
      link: function(scope, element, attrs, funnel) {

          $timeout(function() {

            var page = document.body;

            //page.classList.add('is-hidden-by-funnel');

            funnel.revealPage = function() {  
              Funnel.setState(true);
              funnel.isHidden = Funnel.getState();
              page.classList.remove('is-hidden-by-funnel');

            }; 

          }, 0); 

      }

    }

}]); 