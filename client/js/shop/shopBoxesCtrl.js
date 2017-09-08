
'use strict';

/*------------------------------------*\
    #Shop Boxes Controller
\*------------------------------------*/

whiskersSite.controller('shopBoxesCtrl', 
      ['$stateParams', 
          function($stateParams) {

    var vm = this; 

    vm.products = [

    {'name': 'Nautical Madness',
     'price': '$49.99',
     'thumbnail': '../assets/images/boxPhoto1.png',
     'id' : 1 },
    {'name': 'Horror Show',
     'price': '$49.99',
     'thumbnail': '../assets/images/boxPhoto1.png',
     'id' : 2 },
    {'name': 'Nautical Madness',
     'price': '$49.99',
     'thumbnail': '../assets/images/boxPhoto1.png',
     'id' : 1 },
    {'name': 'Horror Show',
     'price': '$49.99',
     'thumbnail': '../assets/images/boxPhoto1.png',
     'id' : 2 }

    ];


}]); 
