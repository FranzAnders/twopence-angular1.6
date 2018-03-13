

/*------------------------------------*\
    #App Init Code
\*------------------------------------*/

twopence = angular.module('twopence', [
     'ui.router',
     'ngAnimate',
     'vesparny.fancyModal',
     'ngCookies',
     'xeditable',
     'ngMessages',
     'angularMoment',
     '720kb.tooltips',
     // 'ngRaven',
     'constants'
]);

twopence.config(
        ['$stateProvider',
         '$urlRouterProvider',
         '$locationProvider',
         '$compileProvider',
         'ENV',
         function(
            $stateProvider,
            $urlRouterProvider,
            $locationProvider,
            $compileProvider,
            ENV
            ) {
    //
    //If anything is unmatched just go to home
    //
    $urlRouterProvider.otherwise("/");

    //
    // Pretty URLs activate if we're running  the production ENV (disabled for dev so we can refresh while deving)
    //
    if(ENV.environment_name === 'sandbox' || ENV.environment_name === 'prod') {

      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('');

    }



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

                    templateUrl: "js/home/home.html",
                    controller: 'homeCtrl'

                }
            },
        })
        .state('main.sponsorHome', {
            url: "home-sponsor",
            views: {

                'main' : {

                    templateUrl: "js/home/sponsor-home.html",
                    controller: 'homeCtrl'

                }
            },
        })
        .state('main.account', {
          abstract: true,
          views: {

            'main' : {
              templateUrl: "js/login/account.html"
            }
          },
          params: {
            camefromemail: false
          }

        })
        .state('main.account.login', {

          url: "login",
          views:  {

            'account': {

              templateUrl: "js/login/login.html",
              controller: "loginCtrl",
              controllerAs: "login"

            }

          }
        })
        .state('main.account.onboarding', {

          url: "login/onboarding",
          views:  {

            'account': {

              templateUrl: "js/login/login-onboarding.html",
              controller: "onboardingCtrl",
              controllerAs: "onboarding"

            }

          }

        })
        .state('main.account.resetPasswordEmail', {

          url: "account/password/reset",
          views:  {

            'account': {
              templateUrl: "js/login/login-resetPasswordEmail.html",
              controller: "resetPasswordCtrl",
              controllerAs: "resetPassword"

            }

          }

        })
        .state('main.account.resetPassword', {

          url: "reset/:token",
          views:  {

            'account': {
              templateUrl: "js/login/login-resetPassword.html",
              controller: "resetPasswordCtrl",
              controllerAs: "resetPassword"

            }

          },
          params: {

            token: null

          }

        })
        .state('sponsor.logout', {
          url: '/logout',
          views: {
            'sponsor' : {
              templateUrl: "js/login/logOut.html",
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
              templateUrl: "js/signUp/signUp.html",
              controller: "signUpCtrl",
              controllerAs: "signUp"
            }

          }

        })
        .state('main.signUp.account', {

          url: "/account",
          views: {

            'form' : {
              templateUrl: "js/signUp/signUp-account.html",
            }

          }

        })
        .state('main.signUp.identity', {

          url: "/identity",
          views: {

            'form' : {
              templateUrl: "js/signUp/signUp-identity.html"
            }

          }

        })
        .state('main.signUp.confirmation', {

          url: "/confirmation",
          views: {

            'form' : {
              templateUrl: "js/signUp/signUp-confirmation.html"
            }

          }

        })
        .state('main.signUp.verify', {
        url: '^/verify/:verifyToken',
          views: {

            'verify': {
              templateUrl: "js/signUp/verify.html",
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

              var finaltoken = token.replace(/{/, '').replace(/}/, '');

              var tokenObj = {
                "token": finaltoken
              };

              return Sponsor.verifyEmail(tokenObj).then(function(success) {
                  console.log(tokenObj);
                  console.log('verified');
                  return true;
                }
              ).catch(function(err) {

                  console.log(err);
                  return err

              });

            }]

          }

        })
        .state('sponsor', {
          abstract: true,
          url: "/sponsor/",
          controller: 'sponsorCtrl',
          controllerAs: 'sponsor',
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
          },
          resolve: {

            sponsorships: ['Sponsorship', function(Sponsorship) {

              //
              // Gets a sponsors' sponsorships and total contributions made are set on vm.totalContributions
              //
              return Sponsorship.getAll().then(function(sponsorships) {
                return sponsorships;
              }).catch(function(err){
                reject(err);
              });

            }]
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

          },
          resolve : {

            sponsorships:  ['Sponsorship', function(Sponsorship) {

              //
              // Gets all the sponsorships a sponsor is currently managing
              //
              return Sponsorship.getAll().then(function(sponsorships) {

                return sponsorships;

              }).catch(function(err){
                alert("ERROR: Sponsorships not coming up.")
                reject(err); 

              }); 

            }],
            contributions:  ['Sponsor', function(Sponsor) {

              //
              // Gets all contributions a sponsor has made 
              //
              return Sponsor.getAllContributions().then(function(contributions) {
                return contributions;
              }).catch(function(err) {
                alert("ERROR: Contributions not coming up."); 
                reject(err);

              })

            }]

           }

        })
        .state('sponsor.sponsee', {

          url: "^/graduate/:sponseeId",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee.html",
              controller: "sponsorshipCtrl",
              controllerAs: "sponsorship"

            }
          },
          resolve: {

            sponsorship: ['Sponsorship', '$stateParams', function(Sponsorship, $stateParams) {

              //
              // Gets information for a sponsorship
              //
              return Sponsorship.get($stateParams.sponseeId).then(function(sponsorship) {
                
                return sponsorship

              }).catch(function(err) {
                  reject(err);
              });

            }],
            contributions: ['Sponsorship', '$stateParams', function(Sponsorship, $stateParams) {

              //
              // Gets contributions made for a sponsor's sponsorship
              //
              return Sponsorship.getContributions($stateParams.sponseeId).then(function(contributions) {
                return contributions;
              }).catch(function(err) {
                  reject(err);
              });

            }]

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

         url: "dashboard/sponsor-graduates",
          views: {

            'sponsor': {

              templateUrl: "js/sponsor/sponsee-creation.html",
              controller: "sponseeCreationCtrl",
              controllerAs: "sponseeCreation"

            }
          },
          resolve: {

            checkForMissingPlans: ['Sponsorship', function(Sponsorship) {

              var vm = this;


              //
              // Checks if the sponsor has sponsorships with missing plans
              //
              vm.checkForMissingPlans = function(pUserSponsorships) {

                if(Sponsorship.getSponsorshipsMissingPlans(pUserSponsorships).length > 0) {

                  return true

                } else {

                  return false
                }

              };


              //
              // Gets a sponsors' sponsorships and total contributions made are set on vm.totalContributions
              //
              return Sponsorship.getAll().then(function(sponsorships) {

                  if(vm.checkForMissingPlans(sponsorships.data)) {

                    vm.sponsorshipsMissingPlans = Sponsorship.getSponsorshipsMissingPlans(sponsorships.data);

                    return {'plans': vm.sponsorshipsMissingPlans }

                  } else {

                    return false;

                  }

                }).catch(function(err){

                  console.log(err);

                });

            }]

          }

        })
        .state('sponsor.sponseeAdd.single', {
         url: "/single",
          views: {
            'form': {
              templateUrl: "js/sponsor/single-sponsee-creation.html"

            }
          }
        })
        .state('sponsor.sponseeAdd.inviters', {
         url: "/inviters",
          views: {
            'form': {
              templateUrl: "js/sponsor/inviter-sponsee-creation.html"
            }
          }
        })
        .state('sponsor.sponsorshipSetup', {

          url: "sponsorship/:email",
          abstract: true,
          views: {
            'sponsor': {
              templateUrl: "js/sponsor/sponsee-sponsorship.html",
              controller: "sponseeSponsorshipCtrl",
              controllerAs: "sponseeSponsorship"
            }
          },
          resolve: {
            userInfo: ['User', function(User) {
              //
              // Gets User info and sets it on the controller
              //
              return User.getUserInfo().then(function(userInfo) {

                return userInfo;

              }).catch(function(err) {

                return err;
              });
            }]
          },
          params: {
            identity: null,
            email: null
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
        })
        .state('main.terms', {
            url: "terms/",
            views: {
               'main' : {
                  templateUrl: "js/content/terms.html"
               }
            }
        })
        .state('main.privacy', {
            url: "privacy/",
            views: {
               'main' : {
                  templateUrl: "js/content/privacy.html"
               }
            }
        })
        .state('sponsor.terms', {
            url: "sponsor-terms/",
            views: {
               'sponsor' : {
                  templateUrl: "js/content/terms.html"
               }
            }
        })
        .state('sponsor.privacy', {
            url: "sponsor-privacy/",
            views: {
               'sponsor' : {
                  templateUrl: "js/content/privacy.html"
               }
            }
        });

}]);

twopence.run(
    ['$rootScope',
     '$document',
     '$window',
     'ENV',
     '$state',
     '$timeout',
     '$log',
     '$http',
     '$cookies',
     '$location',
     'Auth',
     'editableOptions',
     'User',
     'Sponsorship',
     function(
        $rootScope,
        $document,
        $window,
        ENV,
        $state,
        $timeout,
        $log,
        $http,
        $cookies,
        $location,
        Auth,
        editableOptions,
        User,
        Sponsorship) {

    //
    // When DOM Is loaded we remove the preload class that prevents animations from showing after 3 seconds
    //
    $timeout(function(){
      document.body.classList.remove('preload');
    }, 1400);


    var sponsorStartedSession = false; 

    //
    // We listen to the $stateChangeStart event:
    // If its going to sponsor.dashboard, we check the status of the sponsor and his sponsorships before taking him there
    //
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        
        if(toState.name === 'sponsor.dashboard' && !sponsorStartedSession) {
          event.preventDefault();
          User.getUserInfo().then(function(userInfo) {

          if(userInfo.sponsor.status === "onboarding") {
              sponsorStartedSession = true; 
            $state.go('main.account.onboarding');
          } 

          if(userInfo.sponsorships.length === 0) {
              sponsorStartedSession = true; 
            $state.go('sponsor.sponseeAdd');
          } else {  

            if(Sponsorship.getSponsorshipsMissingPlans(userInfo.sponsorships).length > 0) {
              sponsorStartedSession = true; 
              $state.go('sponsor.sponseeAdd.inviters');
            } else {
              sponsorStartedSession = true; 
              $state.go('sponsor.dashboard');

              console.log('going to dashboard from stateChangeStart');
            }

          }

        }).catch(function(){
            alert('ERROR: Something went wrong');
        });
      
      }

    }); 


    //
    // Function to set data-useragent attribute to document
    //
    var _userAgentInit = function() {
            $document[0].documentElement.setAttribute('data-useragent', navigator.userAgent);
    };

    //Inits user agent on the document
    angular.element($document).ready(function() {

        _userAgentInit();

    });


    //
    // Runs when a state changes
    //
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
      
       // Code to make the page load at the top when a state changes
       document.body.scrollTop = document.documentElement.scrollTop = 0;
       
       // Register a page view when the route changes. Required for SPA.
       if ($window.gtag) {
         $window.gtag('config', ENV.googleAnalyticsToken, {'page_path': $location.path()});
      }

    });


    //
    // For degubbing state changees 
    //
    // $rootScope.$on('$stateChangeError', function(event) {
    //     console.log('state change error my person!')

    // });


    //
    // Headers for HTTP calls
    //
     $http.defaults.headers.common['Content-Type'] = "application/json";
     $http.defaults.headers.post['Content-Type'] = "application/json";
     $http.defaults.headers.get = {'Content-Type' : "application/json"};
     $http.defaults.headers.patch = {'Content-Type' : "application/json"};


}]);
