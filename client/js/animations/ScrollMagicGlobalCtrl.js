
'use strict'; 

/*------------------------------------*\
    #Scroll Magic Globals Service 
\*------------------------------------*/


twopence.factory('ScrollMagicGlobal', function() {

  var scrollMagic = {};

  scrollMagic.globalAnimCtrl =  new ScrollMagic.Controller(
  //   {

  //     globalSceneOptions: {
  //       reverse: false,
  //       offset: '-140'

  //     }

  // }
    ); 


  return scrollMagic; 


}); 