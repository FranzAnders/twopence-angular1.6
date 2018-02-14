
'use strict'; 

/*------------------------------------*\
    #Media Check Service
\*------------------------------------*/

twopence.service('MediaCheck', function() {
  

    //
    // Media Query Breakpoints;
    //
    var small = 640;
    var medium = 1024; 
    var large = 1440; 

    var windowWidth = window.innerWidth; 

    var mediaCheck = {}; 

    //
    //Function that can be used and inserted to check if we are on a mobile device
    //
    mediaCheck.checkIfSmall = function() {

      windowWidth = window.innerWidth; 

      if(windowWidth < small) {

          return true;

      } else {

          return false; 
      }

    };


    //
    // Checks if the device is medium device 
    //
    mediaCheck.checkIfMedium = function() {

      windowWidth = window.innerWidth; 

      if(windowWidth > small &&  windowWidth < medium) {

          return true;

      } else {

          return false; 
      }

    };


    //
    // Checks if it is a large device 
    //
    mediaCheck.checkIfLarge = function() {

      windowWidth = window.innerWidth

      if(windowWidth > medium) {

          return true;

      } else {

          return false; 
      }  

    };


   return mediaCheck; 

}); 
