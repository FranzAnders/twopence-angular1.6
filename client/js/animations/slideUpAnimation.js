
'use strict'; 

/*------------------------------------*\
    #Slide Up Animation
\*------------------------------------*/


whiskersSite.animation('.a-slide-up', function() {

  return  {

    enter: function(element, done) {

      TweenMax.fromTo(element, 2, {opacity: '0' }, {opacity: '1', onComplete: done}); 

    },

    leave: function(element, done) {

      TweenMax.to(element, 2, {opacity: '0', onComplete: done});

    }

  }

}); 
