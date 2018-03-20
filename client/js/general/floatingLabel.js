'use strict';

twopence.directive('floatingLabel', ['$timeout', 
function($timeout) {

    return {

        restrict: 'A', 
        require: 'ngModel',
        scope: {}, 
        link: function(scope, elem, attr, ctrl) {

          $timeout(function() {

            $(elem).change(function() {

              $(this).closest('.input-group').addClass('is-focused');

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

            //
            // Setup a watch for changes not done by ng-change 
            // TODO: unregister for changes made by controller since we won't need this 
            // after a user edits it. 
            scope.$watch(function() { return ctrl.$viewValue }, function(newVal, oldVal) {

                if($(elem).val().length > 0){
                    $(elem).closest('.input-group').addClass('is-filled');
                }
                else{
                    $(elem).closest('.input-group').removeClass('is-filled');
                }

            }); 

          }, 0); 

        }

    }

}]); 
