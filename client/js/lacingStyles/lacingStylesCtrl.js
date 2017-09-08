
'use strict';

/*------------------------------------*\
    #Lacing Styles Controller
\*------------------------------------*/

whiskersSite.controller('lacingStylesCtrl', function() {

    var vm = this; 

    vm.styles = [

    {'name': 'The Hypotenuse',
     'thumbnail': '../assets/images/lacingStyle1.svg',
     'id' : 1 },
    {'name': 'The Cross Stitch',
     'thumbnail': '../assets/images/lacingStyle2.svg',
     'id' : 2 },
    {'name': 'The Gentleman',
     'thumbnail': '../assets/images/lacingStyle3.svg',
     'id' : 3 },
    {'name': 'The Handshake',
     'thumbnail': '../assets/images/lacingStyle4.svg',
     'id' : 4 },
    {'name': 'The Over-Under',
     'thumbnail': '../assets/images/lacingStyle5.svg',
     'id' : 5 },
    {'name': 'The Brigadier',
     'thumbnail': '../assets/images/lacingStyle6.svg',
     'id' : 6 }

    ];

    vm.openHowToLace = function(pStyleId) {

      alert('OPEN LACE STYLE YO');
    }


}); 
