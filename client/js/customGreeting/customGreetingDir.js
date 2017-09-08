

/*------------------------------------*\
    #Custom Greeting Directive
\*------------------------------------*/


humanautSite.directive('customGreetingDir', [
      'Customizr', 
      '$rootScope', function(
        Customizr,
        $rootScope) {

  return {

      replace: true, 
      scope: {}, 
      controller: ['$rootScope', function($rootScope) {

        var vm = this; 

        vm.headline = 'random human looking for whatever.'; 

        vm.message = 'Below you’ll find a smattering of the things we make. But if you tell us exactly who you are and what you’re looking for, we can customize our site for you and make it less smattery.'; 

        $rootScope.$on('user-customized-site', function(event, data) {

            vm.headline = data.content.headline;

            vm.message = data.content.greetingMessage; 

        });


      }],
      controllerAs: 'greeting',
      templateUrl: 'js/customGreeting/customGreeting.html', 
      link: function(scope, element) {

          var greetingBgsContainer = $('[data-ui-component="greeting-bg-container"]'); 

          var greetingBgs = $('[data-ui-component="greeting-bg"]');

          var activeBg = null; 


          //
          // Function that removes the existing background on the section and replaces it
          //
          function changeGreetingBg(pVisitorSearch) {

            var className = 'section-bg--' + pVisitorSearch; 
            
            $('[class*="section-bg--"]').removeClass(function (index, css) {

                return (css.match(/\bsection-bg--\S+/g) || []).join(' ');
            })

            setTimeout(function() { 

              greetingBgsContainer.addClass(className); 

            }, 200); 

          }
        

          // retryButton.on('click', function() {

          //  $('html, body').animate({

          //       scrollTop: 0

          //   }, 1600, 'easeInOutExpo');

          // }); 


          //
          // Listens for user-customized-site event to change greeting bg 
          //
          $rootScope.$on('user-customized-site', function(event, data) {

            changeGreetingBg(data.content.searchTerm);  

          }); 

      }

  }

}]); 
