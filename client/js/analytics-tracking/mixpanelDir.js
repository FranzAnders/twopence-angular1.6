
'use strict';

/*------------------------------------*\
    #Mixpanel Directive
\*------------------------------------*/

twopence.directive('mixpanelDir',[
    'ENV',
    '$timeout',
    '$location',
    function(ENV, $timeout, $location) {

  return {
    restrict: 'A',
    link:function(scope, element, attrs) {

      $timeout(function() {

        (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
        0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
        for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
        
        var loadedEvt = new Event('mixpanel-loaded');
        
        // Directive is an attr on <body>. Event is dispatched on <body>.
        mixpanel.init(ENV.mixpanelToken, {
          loaded: function(){
            element[0].dispatchEvent(loadedEvt);
          }
        });
        
        /* Doesn't use the UrlParams service because its value is set
           in mainCtrl.js, which hasn't been evaluated yet.
           Be careful about transforming UrlParams in the service, as this 
           won't be reflected here.
           #TheAdamEffect
        */
        var globalProps = Object.assign($location.search() || {}, {'Platform': 'Website'});

        mixpanel.register(globalProps);

      }, 0);

    }

  }

}]);
