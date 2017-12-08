

/*------------------------------------*\
    #App Init Code
\*------------------------------------*/


twopence = angular.module('twopence', [
     'ui.router',
     'vesparny.fancyModal',
     'ngCookies',
     'xeditable',
     'ngMessages',
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
            $compileProvider,
            plaidLinkProvider
            ) {
    //
    //If anything is unmatched just go to home
    //
    $urlRouterProvider.otherwise("/");

    // Pretty URLs
    //
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');



    $stateProvider
        .state('main', { // we have a main state for persistent content
            abstract: true,
            url: "/",
            templateUrl: "js/main/main.html",
            controller: "mainCtrl",
            controllerAs: "main"

        })
        .state('main.home', {
            url: "",
            views: {

                'main' : {

                    templateUrl: "js/home/home.html"

                }
            },
        })
        .state('main.login', {

          url: "login",
          views: {

            'main' : {
              templateUrl: "js/home/login.html",
              controller: "loginCtrl",
              controllerAs: "login"
            }

          },
          params: {
            camefromemail: false
          }

        })
        .state('sponsor.logout', {
          url: '/logout',
          views: {
            'sponsor' : {
              templateUrl: "js/home/logOut.html",
              controller: "logOutCtrl",
              controllerAs: "logOut"
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
        .state('main.verify', {
          url: 'verify/:verifyToken/',
          views: {

            'main': {
              templateUrl: "js/verify/verify.html",
              controller: "verifyCtrl",
              controllerAs: "verify"

            }
          },
          params: {
              verifyToken: null
          },
          resolve: {

            verify: ['$stateParams', '$state', 'Sponsor', function($stateParams, $state, Sponsor) {

                var token = $stateParams.verifyToken;

                console.log("Do I have Brackets?");
                console.log($stateParams);
                // To Do : Combine into 1 Regex
                var newtoken = token.replace(/{/, '');
                var finaltoken = newtoken.replace(/}/, '');

                console.log(finaltoken);

                var tokenObj = {
                  "token": finaltoken
                };

                Sponsor.verifyEmail(tokenObj).then(
                  function() {

                    $state.go("main.login", {camefromemail: true});
                    console.log("Token Verified");

                    return true;
                  }
                ).catch(

                );




            }]

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

          url: "sponsee/:sponseeId",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee.html",
              controller: "sponsorshipCtrl",
              controllerAs: "sponsorship"

            }
          },
          params: {
            sponseeId: null
          }

        })
        .state('sponsor.edit', {

          url: "editing/{plan:int}",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-plan-edit.html",
              controller: "sponseePlanEditCtrl",
              controllerAs: "sponseePlanEdit"

            }
          },
          params: {
            plan: null,
            sponsee: null
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

          url: "sponsorship/:sponseeId",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-sponsorship.html",
              controller: "sponseeSponsorshipCtrl",
              controllerAs: "sponseeSponsorship"
            }

          },
          params: {

            sponseeId: null

          }

        })
        .state('sponsor.settings', {

          url: "sponsor/settings",
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
        .state('main.kitchenSink', {
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


}]).constant("BASE_URL", "https://api.onepence.co");

twopence.run(
    ['$rootScope',
     '$document',
     '$state',
     '$timeout',
     '$log',
     '$http',
     '$cookies',
     '$location',
     'Auth',
     'editableOptions',
     function(
        $rootScope,
        $document,
        $state,
        $timeout,
        $log,
        $http,
        $cookies,
        $location,
        Auth,
        editableOptions
        ) {


    $rootScope.$on('$stateChangeError', function(event) {

        console.log('state change error my boy!')

    });

    $rootScope.$on('stateChangeStart', function(event) {

    });


    //
    // Checking if the user is logged in, if not, we take them to the homepage
    //
    // $timeout(function () {
    //   var authChecker = Auth.checkIfVisited();
    //   var tokenCheck = Auth.getToken();

    //       if(authChecker == "true") {
    //         console.log("You've already logged in. Let's redirect you");
    //       //  $http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenCheck;
    //         $state.go("sponsor.dashboard");
    //       }
    //       else {
    //         console.log("Login again, my dude");
    //       }

    // }, 0);

    // tokenCheck = $cookies.get('authToken');
    // console.log(tokenCheck.length);

    // Old script to save users and check auth in RootScope.
    // May use for reference before deleting.

    // $rootScope.currentUser = null;
    // $rootScope.userRoles = USER_ROLES;
    // $rootScope.isAuthorized = Auth.isAuthorized;

    /* $rootScope.setCurrentUser = function (user) {
      $rootScope.currentUser = user;
    }; */



    //
    // if (tokenCheck.length > 0) {
    //     $http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenCheck; // jshint ignore:line
    //     $state.go('main.home');
    // }

    // if (!tokenCheck) {
    //     $state.go('main.login');
    // }

    $rootScope.$on('$stateChangeStart', function (event, next, current) {
      // if (toState.authRequired && !Auth.isAuthenticated()){ //Assuming the AuthService holds authentication logic
      //   // User isn’t authenticated
      //   $state.transitionTo("login");
      //   event.preventDefault();
      // }
    });





    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      console.log(toParams);

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
     $http.defaults.headers.patch = {'Content-Type' : "application/json"};


}]);
