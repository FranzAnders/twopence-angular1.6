
'use strict'; 

/*------------------------------------*\
    #Case Study Customizer Service
\*------------------------------------*/

humanautSite.factory('Customizr', ['$rootScope', function($rootScope) {

    var Customizr = {}; 

    Customizr.customContent = false; 

    Customizr.personas = false; 

    Customizr.prevSearchQuery = false; 

    Customizr.userCustomizedSite = false; 

    Customizr.curtainActive = false; 

    Customizr.showCaseStudies = function(pCustomContent, pUserCustomizedSite) {

      Customizr.customContent = pCustomContent;

      if(pUserCustomizedSite) {

        Customizr.userCustomizedSite = true; 
        
      }

      $rootScope.$broadcast('user-customized-site', {content: pCustomContent, userSearch: pUserCustomizedSite}); 

    }

    Customizr.getAllPersonas = function() {

      return Contentful.getEntries({'content_type' : 'customSitePersona', 'include' : 3})

    }

    return Customizr

}]); 
