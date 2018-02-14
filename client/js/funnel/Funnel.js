
'use strict'; 


twopence.service('Funnel', function() {

  var Funnel = {};

  Funnel.isHidden = false; 

  Funnel.hide = function() {

    Funnel.isHidden = true; 
    
  }

  return Funnel;


}); 