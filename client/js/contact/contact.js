
'use strict'; 

/*------------------------------------*\
    Contact Service
\*------------------------------------*/

humanautSite.factory('Contact', function() {
 
    var Contact = {}; 

    Contact.getContent = function() {

      return Contentful.getEntries({'sys.id' : '4iLPbrLJXWAEiwoMEQao0K', 'include' : 3})

    }

    return Contact; 


}); 
