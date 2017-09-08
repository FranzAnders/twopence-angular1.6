
'use strict'; 

/*------------------------------------*\
    #Intro Section Directive
\*------------------------------------*/

whiskersSite.directive('introSectionDir',  
          ['$rootScope', 
           '$timeout',
      function(
         $rootScope, 
         $timeout) {

    return {

        restrict: 'E',
        replace: true, 
        templateUrl: 'js/home/introSection.html',
        scope: {},
        controller: function() {

          var vm = this;

          vm.$onInit = function() {

            vm.slides = [

              {'id' : 'image3', src:'../assets/images/tall_images3.png'},
              {'id' : 'image2', src:'../assets/images/slideshowImage1--medium.png'},
              {'id' : 'image1', src:'../assets/images/tall_images4.png'}

            ];

            vm.currentIndex = 0; 

          }

          vm.setCurrentSlideIndex = function(pIndex) {

            vm.currentIndex = pIndex; 

          };

          vm.isCurrentSlideIndex = function(pIndex) {

            return vm.currentIndex ===  pIndex;

          };

          vm.nextSlide = function() {

            vm.currentIndex = (vm.currentIndex <  vm.slides.length - 1) ? ++vm.currentIndex : 0; 

            vm.currentIndex = vm.currentIndex++;

          };

          vm.prevSlide = function() {

            vm.currentIndex = vm.currentIndex - 1;

          };

        },
        controllerAs: 'introSection',
        link:function(scope, element){
          

          console.log('hello')

        }

    }


}]);
