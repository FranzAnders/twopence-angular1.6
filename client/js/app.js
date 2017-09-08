

/*------------------------------------*\
    #App Init Code
\*------------------------------------*/

whiskersSite = angular.module('twopence', [
     'ui.router']);


whiskersSite.config(
        ['$stateProvider', 
         '$urlRouterProvider', 
         '$locationProvider', 
         '$compileProvider',
         function(
            $stateProvider, 
            $urlRouterProvider, 
            $locationProvider,
            $compileProvider
            ) {



    //If anything is unmatched just go to home
    $urlRouterProvider.otherwise("no-longer-here/");


    $stateProvider
        .state('main', { // we have a main state for persistent content
            abstract: true,
            url: "/",
            templateUrl: "js/main/main.html"

        })
        .state('main.home', {
            url: "",
            views: {

                'main' : {

                    templateUrl: "js/home/home.html",
                    controller: "homeCtrl",
                    controllerAs: "home"

                }
            },
            params: {

                back: null

            }

        })
        .state('main.sink', {
          url: "kitchen-sink/",
          views: {

            'main': {

              templateUrl: "js/kitchenSink/kitchenSink.html"

            }

          }

        })
        .state('main.404', {

            url: "no-longer-here/",
            views: {

               'main' : {

                  templateUrl: "js/404/404.html"

               }

            }

        });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');


}]);

whiskersSite.run(
    ['$rootScope', 
     '$document', 
     '$state', 
     '$timeout', 
     '$log',
     function(
        $rootScope, 
        $document, 
        $state, 
        $timeout, 
        $log
        ) {


    $rootScope.$on('$stateChangeError', function(event) {

        console.log('state change error my boy!')

    });


    // Function to set data-useragent attribute to document
    var _userAgentInit = function() {
            $document[0].documentElement.setAttribute('data-useragent', navigator.userAgent);
    };

    // Attaches FastClick to document body to avoid delay on mobile clicks/presses
    angular.element($document).ready(function() {

        FastClick.attach($document[0].body);
        _userAgentInit();

    });


}]);

