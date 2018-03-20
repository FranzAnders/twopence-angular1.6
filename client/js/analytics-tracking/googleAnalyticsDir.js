
'use strict';

/*------------------------------------*\
    #Google Analytics Directive
\*------------------------------------*/

twopence.directive('googleAnalyticsDir',[
    'ENV',
    '$timeout',
    function(ENV, $timeout) {

  return {
    restrict: 'A',
    link:function(scope, element, attrs) {
      // dynamically add external script tag
      var s = document.createElement('script');
      s.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id='+ENV.googleAnalyticsToken);
      s.async = true;
      document.head.appendChild(s);

      // init Google Analytics
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){dataLayer.push(arguments);}
      window.gtag('js', new Date());
      window.gtag('config', ENV.googleAnalyticsToken);
    }

  }

}]);
