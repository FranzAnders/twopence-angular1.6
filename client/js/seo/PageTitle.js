
'use strict';

/*------------------------------------*\
    #Page Title Service
\*------------------------------------*/

whiskersSite.service('PageTitle', function() {

  var title = 'Whiskers';

  var PageTitle = {};

  PageTitle.title = function() {return title;}

  PageTitle.reset = function() {title = 'Whiskers'}

  PageTitle.setTitle = function(pNewTitle) {

   if(pNewTitle) {
      
      title = pNewTitle;

    } else {

      PageTitle.reset(); 
      
    }

  }

  return PageTitle; 

});