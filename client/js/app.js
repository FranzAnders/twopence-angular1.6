

/*------------------------------------*\
    #App Init Code
\*------------------------------------*/


twopence = angular.module('twopence', [
     'ui.router',
     'vesparny.fancyModal'
      ]);


twopence.config(
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

    //
    //If anything is unmatched just go to home
    //
    $urlRouterProvider.otherwise("no-longer-here/");

    //
    // Pretty URLs
    //
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('');



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
        .state('main.login', {

          url: "login",
          views: {

            'main' : {
              templateUrl: "js/home/login.html",
              controller: "loginCtrl",
              controllerAs: "login"
            }

          }

        })
        .state('main.signUp', {

          url: "sign-up",
          abstract: true,
          views: {

            'main' : {
              templateUrl: "js/home/signUp.html",
              controller: "signUpCtrl",
              controllerAs: "signUp"
            }

          }

        })
        .state('main.signUp.account', {

          url: "/account",
          views: {

            'form' : {
              templateUrl: "js/home/signUp-account.html",
            }

          }

        })
        .state('main.signUp.identity', {

          url: "/identity",
          views: {

            'form' : {
              templateUrl: "js/home/signUp-identity.html"
            }

          }

        })
        .state('main.signUp.confirmation', {

          url: "/confirmation",
          views: {

            'main@main' : {
              templateUrl: "js/home/signUp-confirmation.html"
            }

          }

        })
        .state('sponsor', {
          abstract: true,
          url: "/sponsor/",
          templateUrl: "js/sponsor/sponsor.html"

        })
        .state('sponsor.dashboard', {

          url: "dashboard/",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/dashboard.html",
              controller: "dashboardCtrl",
              controllerAs: "dashboard"

            }
          }

        })
        .state('sponsor.contributions', {

          url: "contributions/",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/contributions.html",
              controller: "contributionsCtrl",
              controllerAs: "contributions"

            }

          }

        })
        .state('sponsor.sponsee', {

          url: "sponsee/:sponseeEmail",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee.html",
              controller: "sponseeCtrl",
              controllerAs: "sponsee"

            }
          },
          params: {
            sponseeEmail: null
          }

        })
        .state('sponsor.edit', {

          url: "sponsee/:sponseeEmail/edit",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-plan-edit.html",
              controller: "sponseeCtrl",
              controllerAs: "sponsee"

            }
          },
          params: {
            sponseeEmail: null
          }

        })
        .state('sponsor.sponseeAdd', {

        url: "dashboard/add-sponsee",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-creation.html",
              controller: "sponseeCreationCtrl",
              controllerAs: "sponseeCreation"

            }
          },
          params: {

            cameFromEmail: null

          }

        })
        .state('sponsor.sponsorshipSetup', {

          url: "sponsorship/:sponseeEmail",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-sponsorship.html",
              controller: "sponseeSponsorshipCtrl",
              controllerAs: "sponseeSponsorship",
              reload: true
            }

          },
          params: {

            sponseeName: null,
            sponeeEmail: null

          }

        })
        .state('sponsor.settings', {

          url: "sponsor/settings.html",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/settings.html", 
              controller: "settingsCtrl",
              controllerAs: "settings"             

            }

          }

        }).state('sponsor.faq', {

          url: "sponsor/faq.html",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/faq.html"

            }

          }

        })
        .state('sponsor.sponsorshipSetup.options', {

          url: "/options",
          views: {

            'main': {

              templateUrl: "js/sponsor/sponsee-sponsorship-options.html"

            }

          }

        })
        .state('sponsor.sponsorshipSetup.matching', {

          url: "/options/matching",
          views: {

            'main': {

              templateUrl: "js/sponsor/sponsee-sponsorship-matching.html"

            }

          }

        })
        .state('sponsor.sponsorshipSetup.oneTime', {

          url: "/options/one-time",
          views: {

            'main': {

              templateUrl: "js/sponsor/sponsee-sponsorship-oneTime.html"

            }

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




}]).constant("BASE_URL", "http://localhost:8000/api");

twopence.run(
    ['$rootScope',
     '$document',
     '$state',
     '$timeout',
     '$log',
     '$http',
     function(
        $rootScope,
        $document,
        $state,
        $timeout,
        $log,
        $http
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


    // Code to make the page load at the top when a state changes
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
       document.body.scrollTop = document.documentElement.scrollTop = 0;

    });

    //
    // Headers for HTTP calls
    //
     $http.defaults.headers.common['Content-Type'] = "application/json";
     $http.defaults.headers.post['Content-Type'] = "application/json";
     $http.defaults.headers.get = {'Content-Type' : "application/json"};


}]);
