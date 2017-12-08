'use strict';

twopence.directive('floatingLabel',
function() {

    return {

        restrict: 'A', 
        scope: {}, 
        link: function(scope, elem, attr ) {  
            
            console.log(elem); 

            $(elem).change(function() {

                console.log('hello');

            }); 


            $(elem).focusout(function() {
                $('.input-group').removeClass('is-focused');
            });

            $(elem).focus(function() {
                $(this).closest('.input-group').addClass('is-focused');
            });

            /// Input Kepress Filled  Focus
            $(elem).keyup(function() {
                if($(this).val().length > 0){
                    $(this).closest('.input-group').addClass('is-filled');
                }

                else{
                    $(this).closest('.input-group').removeClass('is-filled');
                }
            });

            /// Input Check Filled Focus
            var $formControl = $(elem);
            var values = {};

            var validate =  function(pElem) {
                if($(pElem).val().length > 0){
                    $(pElem).closest('.input-group').addClass('is-filled');
                }
                else{
                    $(pElem).closest('.input-group').removeClass('is-filled');
                }
            }

            validate(elem); 

        }

    }

}); 
