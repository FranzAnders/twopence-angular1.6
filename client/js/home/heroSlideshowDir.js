
'use strict'; 

/*------------------------------------*\
    #Hero Slideshow Directive
\*------------------------------------*/

whiskersSite.directive('heroSlideshowDir',  function() {

    return {

        restrict: 'E',
        replace: true, 
        scope: {},
        controller: ['$timeout', function($timeout) {
          
          var INTERVAL = 4000; 

          var vm = this; 

          vm.$onInit = function() {

            vm.slides = [

              {'id' : 'image1', src:'../assets/images/heroHeader1--large.png'},
              {'id' : 'image2', src:'../assets/images/heroHeader5--large.png'},
              {'id' : 'image3', src:'../assets/images/heroHeader3--large.png'}

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

            $timeout(vm.nextSlide, INTERVAL);

          };

          vm.loadSlides = function() {

            $timeout(vm.nextSlide, INTERVAL);

          };

          vm.loadSlides(); 

        }],
        controllerAs: 'heroSlideshow',
        templateUrl: "js/home/heroSlideshow.html",
        link:function(scope, element){



        }


    }

}); 
