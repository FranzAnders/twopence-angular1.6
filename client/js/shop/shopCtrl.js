
'use strict';

/*------------------------------------*\
    #Shop Controller
\*------------------------------------*/

whiskersSite.controller('shopCtrl', 
      ['$stateParams', 
          function($stateParams) {

    var vm = this; 

    vm.products = [

    {'name': 'Navy Blue',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnail1.png',
     'id' : 1 },
    {'name': 'Purple',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnail2.png',
     'id' : 2 },
    {'name': 'Pink',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnail3.png',
     'id' : 3 },
    {'name': 'Light Blue',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnail4.png',
     'id' : 4 },
    {'name': 'Mint',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnail5.png',
     'id' : 5 },
    {'name': 'Orange',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnail6.png',
     'id' : 6 }

    ];

      vm.productsStriped = [

    {'name': 'Navy Blue',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnailStriped1.png',
     'id' : 1 },
    {'name': 'Purple',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnailStriped2.png',
     'id' : 2 },
    {'name': 'Pink',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnailStriped3.png',
     'id' : 3 },
    {'name': 'Light Blue',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnailStriped4.png',
     'id' : 4 },
    {'name': 'Mint',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnailStriped5.png',
     'id' : 5 },
    {'name': 'Orange',
     'price': '$9.99',
     'thumbnail': '../assets/images/thumbnailStriped6.png',
     'id' : 6 }

    ];

}]); 
