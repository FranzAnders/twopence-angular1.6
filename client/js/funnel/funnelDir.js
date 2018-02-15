
'use strict'; 


twopence.directive('funnelDir', ['$timeout', 'Funnel', function($timeout, Funnel) {

    return {

      restrict: "E", 
      scope: {}, 
      replace: true, 
      controller: ['$state', 'Funnel', function($state, Funnel) {

          var vm = this; 

          if($state.is('main.home') || $state.is('main.sponsorHome')){

            vm.isHidden = Funnel.getState();

          } else {

            vm.isHidden = true;
            
          }

      }],
      controllerAs: 'funnel', 
      bindToController: true, 
      templateUrl: "js/funnel/funnel.html", 
      link: function(scope, element, attrs, funnel) {

          $timeout(function() {

            var page = document.body;

            if(!funnel.isHidden) {

              page.classList.add('is-hidden-by-funnel');

            }

            funnel.revealPage = function() {  
              Funnel.setState(true);
              funnel.isHidden = Funnel.getState();
              page.classList.remove('is-hidden-by-funnel');

            }; 

          }, 0); 

      }

    }

}]); 