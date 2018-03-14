
'use strict';

/*------------------------------------*\
   Focus Sibling Input Directive
\*------------------------------------*/


twopence.directive('focusSiblingInput', ['$timeout', function($timeout) {


  return {

    restrict: "A", 
    scope: {}, 
    link: function(scope, element, attrs) {

        $timeout(function() {

          var input = $(element[0]).find('input[type=number]');
          var checkbox = $(element[0]).find('input[type=checkbox]'); 

          input.focus(function() {

            $timeout(function() {
              checkbox.prop('checked', true);
            });

          });   

          input.change(function() {

            if(input.val().length < 0) {
              $timeout(function() {
              checkbox.prop('checked', false);
              });
            }

          })

          checkbox.change(function() {

            if(this.checked) {
              $timeout(function() {
              input.focus();
              }); 
            } 

          }); 

        }, 100); 

    }

  }

}]); 
