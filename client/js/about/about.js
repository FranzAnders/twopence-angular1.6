
'use strict'; 

/*------------------------------------*\
    About Service
\*------------------------------------*/

humanautSite.factory('About', function() {

  var About = {};


  About.getContent = function() {


    return Contentful.getEntries({'sys.id' : '3WfRg1r9hmAuC0qwqgk8gU', 'include' : 3})


  }


  return About; 


}); 

