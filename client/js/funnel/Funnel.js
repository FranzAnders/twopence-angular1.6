
'use strict'; 


twopence.service('Funnel', function() {

  var Funnel = {};

  Funnel.isHidden = false; 

  Funnel.hide = function() {

    Funnel.isHidden = true; 

  }

  Funnel.getState = function() {

    return Funnel.isHidden;  
    
  }

  Funnel.setState = function(pState) {

    Funnel.isHidden = pState; 
    
  }
  return Funnel;


}); 