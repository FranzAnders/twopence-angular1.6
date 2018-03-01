
'use strict';

twopence.filter('thousandsToKFilter', ['$filter', function($filter) {

    return function(input) {

      input = input.toString();  

      input = "$" + input.slice(0, -3) + "K"

      return input

    }; 

}]); 