

'use strict'; 

/*------------------------------------*\
    Lace Slideshow Directive 
\*------------------------------------*/

whiskersSite.directive('aboutLaceDir', 
    ['$timeout', 
      function($timeout) {

    return {

        restrict: 'E',
        replace: true, 
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
        controllerAs: 'laceSlideshow',
        templateUrl: "js/home/aboutLace.html",
        link:function(scope, element, attrs, laceSlideshow){

          $timeout(function() {
            
              // $.stellar({
              //   horizontalScrolling: false,
              //   verticalScrolling: true,
              //   hideDistantElements: false,
              //  responsive: true,
              //  positionProperty: 'transform'
              // });


            // if(mediaCheck.checkIfMedium() || mediaCheck.checkIfLarge()) {
  
            //   function  activateElem(pId) {

            //     $timeout(function() {

            //       laceSlideshow.setCurrentSlideIndex(pId);

            //     }, 100); 

            //   }

            //   var scrollAnimLaceCtrl = new ScrollMagic.Controller(); 

            //   var scrollAnimSceneSecondary = new ScrollMagic.Scene(
            //             {triggerElement: "[data-ui-component='sticky-trigger-two']", 
            //              triggerHook: 'onCenter',
                        
            //              offset: 150,
            //              duration: '15%'})
            //             .setPin("[data-ui-component='pin-section-alt']")
            //             .addTo(scrollAnimLaceCtrl);

            //   // var scrollAnimLaceTimeline =  new TimelineMax()
            //   //   .to("[data-ui-component='pin-section-alt']", 0.5, {scale: 1})
            //   //   .call(activateElem, [0])
            //   //   .to("[data-ui-component='pin-section-alt']", 0.5, {scale: 1})
            //   //   .call(activateElem, [1])
            //   //   .to("[data-ui-component='pin-section-alt']", 0.5, {scale: 1})
            //   //   .call(activateElem, [2]);

            //   // var scrollSlideshow = new ScrollMagic.Scene({
            //   //   triggerElement: "[data-ui-component='sticky-trigger-two']",
            //   //   triggerHook: 'onEnter',
            //   //   duration: '250%',
            //   //   offset: 250,
            //   //   reverse: true
            //   // })
            //   // .setTween(scrollAnimLaceTimeline).
            //   // addTo(scrollAnimLaceCtrl);

            // }

          }, 200); 

        }

    }

}]); 
