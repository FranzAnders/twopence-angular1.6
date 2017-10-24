

/*------------------------------------*\
    #App Init Code
\*------------------------------------*/


twopence = angular.module('twopence', [
     'ui.router',
     'vesparny.fancyModal',
     'ngCookies',
     'ngMessages'
      ]);


twopence.config(
        ['$stateProvider',
         '$urlRouterProvider',
         '$locationProvider',
         '$compileProvider',
         '$locationProvider',
         function(
            $stateProvider,
            $urlRouterProvider,
            $compileProvider,
            $locationProvider
            ) {

    //
    //If anything is unmatched just go to home
    //
    $urlRouterProvider.otherwise("no-longer-here/");
    //$httpProvider.interceptors.push(httpInterceptor);
    // function httpInterceptor($q, $log, $cookieStore) {
    //   return {
    //     request: function(config) {
    //       config.headers.Authorization =
    //         $cookieStore.get('authToken');
    //         return config;
    //     }
    //   };
    // }

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
          resolve: {
            initialised: function(User, $q) {
              var deferred = $q.defer();

              User.verify().then(function(initialised) {
                deferred.resolve(initialised);
              }).catch(function(err) {
                deferred.reject(err);
              });
              return deferred.promise;
            }
          },
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

          url: "sponsee/:sponseeId",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee.html",
              controller: "sponseeCtrl",
              controllerAs: "sponsee"

            }
          },
          params: {
            sponseeId: null
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

          url: "sponsorship/:sponseeId",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-sponsorship.html",
              controller: "sponseeSponsorshipCtrl",
              controllerAs: "sponseeSponsorship",
              reload: true
            }

          },
          params: {

            sponseeId: null,

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
     function(
        $rootScope,
        $document,
        $state,
        $timeout,
        $log,
        $http,
        $cookies,
        $location,
        Auth
        ) {


    $rootScope.$on('$stateChangeError', function(event) {

        console.log('state change error my boy!')

    });

    $rootScope.$on('stateChangeStart', function(event) {

    });


    // Attempting Login Check - Yay!
    // $rootScope.globals.currentUser.authData = $cookies.get('authToken') || {};
    // console.log("Your cookie ID is: ")
    $timeout(function () {
      console.log("I hope this works.....")
      var authChecker = Auth.checkIfVisited();
      var tokenCheck = Auth.getToken();
      console.log(authChecker);
      console.log(tokenCheck);
          if(authChecker == "true") {
            console.log("You've already logged in. Let's redirect you");
          //  $http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenCheck;
            $state.go("sponsor.dashboard");
          }
          else {
            console.log("Login again, my dude");
            $state.go("main.login");
          }
    }, 0);

    // tokenCheck = $cookies.get('authToken');
    // console.log(tokenCheck.length);
    console.log("Are you Authing?: " + Auth.checkIfVisited());

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
