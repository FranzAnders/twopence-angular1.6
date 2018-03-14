
'use strict'; 


twopence.directive('funnelDir', ['$timeout', 'Funnel', '$cookies', 'UrlParams', function($timeout, Funnel, $cookies, UrlParams) {

    return {

      restrict: "E", 
      scope: {}, 
      replace: true, 
      controller: ['$state', 'Funnel', '$cookies', 'UrlParams', function($state, Funnel, $cookies, UrlParams) {

          var vm = this; 
          
          // Traffic splitter will not display if url contains ?modal=false param
          var modalHidden = UrlParams.getParams().modal;
          vm.isHidden = Funnel.getState();
          
          // Traffic splitter will not display to users that have a cookie 
          // indicating it's already been displayed.
          vm.isHidden = $cookies.get('trafficSplitterDisplayed') === 'true';
          if (modalHidden === 'false') vm.isHidden = true;
          if (modalHidden === 'true') vm.isHidden = false;
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
              
              // Save a cookie indicating the user has seen the Traffic Splitter
              $cookies.put('trafficSplitterDisplayed', 'true');
            }; 

          }, 0); 

      }

    }

}]); 