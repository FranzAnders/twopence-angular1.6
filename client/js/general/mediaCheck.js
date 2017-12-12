
/*------------------------------------*\
    #Object that contains functions for checking devices
\*------------------------------------*/


'use strict'; 


var mediaCheck = (function() {

    // Media Query Breakpoints;
    var small = 680;
    var medium = 1024; 
    var large = 1441; 

    var windowWidth = window.innerWidth; 



    //
    //Function that can be used and inserted to check if we are on a mobile device
    //
    var checkIfSmall = function() {

      windowWidth = window.innerWidth; 

      if(windowWidth < small) {

          return true;

      } else {

          return false; 
      }

    };

    var checkIfMedium = function() {

      windowWidth = window.innerWidth; 

      if(windowWidth > small &&  windowWidth < medium) {

          return true;

      } else {

          return false; 
      }

    }

    var checkIfLarge = function() {

      windowWidth = window.innerWidth

      if(windowWidth > medium) {

          return true;

      } else {

          return false; 
      }  

    };


    var mediaCheck = {

        checkIfSmall: checkIfSmall,
        checkIfMedium: checkIfMedium,
        checkIfLarge: checkIfLarge

    }


    return mediaCheck


})(); 

