
'use strict'; 

/*------------------------------------*\
    Home Page Controller
\*------------------------------------*/


humanautSite.controller('customizrCtrl', [
    'Customizr',
    '$scope', 
    '$rootScope',
    '$timeout', 
    function(Customizr, $scope, $rootScope, $timeout) {

      var vm = this; 


      vm.$onInit = function() {

        //
        // Choices for Visitor Type
        //
        vm.visitorChoices = [

          {id: 'random-human', name: 'random human'},
          {id: 'dissatisfied-creative', name: 'dissatisfied creative'},
          {id: 'fearless-client', name: 'fearless client'},
          {id: 'budding-startup', name: 'budding startup'},
          {id: 'internet-creeper', name: 'internet creeper'},
          {id: 'horse', name: 'horse'}

        ];


        //
        // Choices for search terms
        //
        vm.searchChoices = [
          {id: 'whatever', name: 'whatever'},
          {id: 'shareable-videos', name: 'shareable videos'},
          {id: 'brand-strategy', name: 'brand strategy'},
          {id: 'package-design', name: 'package design'},
          {id: 'lols', name: 'lols'},
          {id: 'advertising-y', name: 'ad-like objects'},
          {id: 'digital-thingies', name: 'digital thingies'},
          {id: 'logo', name: 'a logo'},
          {id: 'new-job', name: 'a new job please'},
          {id: 'experiments', name: 'experiments'},
          {id: 'hay', name: 'hay'}
        ];


        //
        // Keeps track of form states, sets them all as clean by default 
        //
        vm.formStates = {

            visitorType: {

              clean: true

            },
            visitorSearch: {

              clean: true

            },
            submittedForm: false

        }

        //
        // Listens for a breakpoint change to setup the default selects 
        //
        $rootScope.$on('breakpointChange', function(breakpoint, oldClass) {

          vm.setUpSelectDefaults(); 
          
        }); 


      };



      //
      // Call made to Contentful through Customizr service for all personas 
      // if there are none defined in service already 
      //
      if(!Customizr.personas) {

        Customizr.getAllPersonas().then(function(data) {

          vm.personas = data.items; 

          Customizr.personas = vm.personas; 

          $timeout(function() {

            vm.initLoad(); 

          }, 100); 

        }); 

      } else {

        vm.personas = Customizr.personas
        
        $timeout(function() {

          Customizr.showCaseStudies(Customizr.customContent, false);

          vm.setUpSelectPrevSearch(); 

          $rootScope.$broadcast('custom-content-ready'); 

        }, 200); 

      }



      //
      // Sets up the select's defaults. If there was content searched,
      // on large devices we show the last two search terms
      //
      vm.setUpSelectDefaults = function() {

        if(mediaCheck.checkIfSmall()) {

          vm.visitorSearchText = null; 

          vm.visitorTypeText = null;  

        } else {

          if(Customizr.customContent) {

            vm.setUpSelectPrevSearch(); 

          } else {  

            vm.visitorSearchText = vm.searchChoices[0];

            vm.visitorTypeText = vm.visitorChoices[0];
       
          }

        } 

      }; 



      //
      // Sets up the selects to have previous selection 
      //
      vm.setUpSelectPrevSearch = function() {

        if(!mediaCheck.checkIfSmall()) {

          vm.visitorTypeText = function() {

            for(var i = 0; i < vm.visitorChoices.length; i++) {

                if(Customizr.customContent.humanType == vm.visitorChoices[i].id){

                  return vm.visitorChoices[i];

                }

            }
        
          }(); 

          vm.visitorSearchText = function() {

            for(var i = 0; i < vm.searchChoices.length; i++) {

              if(Customizr.customContent.searchTerm == vm.searchChoices[i].id){

                return vm.searchChoices[i];

              }

            }
        
          }(); 

        }

      }




      //
      // Chooses the project combination based on visitor type and visitor search inputs
      //
      vm.chooseProjectCombination = function(pVisitorType, pVisitorSearch) {

        var choosenCombination = 0; 

        for(var key in vm.personas) {

          if(vm.personas[key].fields.humanType === pVisitorType &&  vm.personas[key].fields.searchTerm === pVisitorSearch) {

              return vm.personas[key]

          } 

        }

        return false; 

      };  



      vm.cleanFormElements = function() {  

        $timeout(function() {
          
          $scope.customizrForm.$setPristine(); 

          $scope.customizrForm.$setUntouched(); 

          vm.formStates.visitorType.clean = true;
          
          vm.formStates.visitorSearch.clean = true;

        }, 1600); 


        $timeout(function() {
          
          vm.setUpSelectDefaults(); 

        }, 2800); 

      };



      //
      // Dirties the form element by taking in a DOM target and an id for the states object
      //
      vm.dirtyFormElement = function(pFormId) {

        if(vm.visitorTypeText !== null) {

          vm.formStates[pFormId].clean = false;

        }

        if(vm.visitorSearchText !== null) {
          
          vm.formStates[pFormId].clean = false;

        }

        vm.submitForm(); 

      };


      //
      //Submits the form 
      //
      vm.submitForm = function() {

        $timeout(function() {

        if(!vm.formStates.visitorType.clean && !vm.formStates.visitorSearch.clean) {

          vm.customizeSite(vm.visitorTypeText, vm.visitorSearchText); 
            
        }

        }, 200); 

      }


      //
      // Function used to customize the site on command
      //
      vm.customizeSite = function(pVisitorType, pVisitorSearch) {

        var combination = vm.chooseProjectCombination(pVisitorType.id, pVisitorSearch.id);

        var customContent = combination.fields; 

        Customizr.showCaseStudies(customContent, true)

        vm.cleanFormElements(); 

      };  


      //
      //Initial Load that happens when the user first arrives on the page
      //
      vm.initLoad = function() {

        var combination = vm.chooseProjectCombination('random-human', 'whatever');
        
        var customContent = combination.fields; 

        Customizr.showCaseStudies(customContent, false); 

        vm.setUpSelectDefaults(); 

        $rootScope.$broadcast('custom-content-ready'); 

      };


}]); 
