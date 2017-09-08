
'use strict'; 

/*------------------------------------*\
    Contact Controller
\*------------------------------------*/

humanautSite.controller('contactCtrl', 
          [
           '$timeout',
           '$location',
           'Content', 
           'MetaInformation',
           'PageTitle', 
           function(
            $timeout,
            $location,
            Content, 
            MetaInformation,
            PageTitle
            ) {

    var vm = this; 

    //
    // Gets The meta information for the page title and meta info 
    //
    vm.setUpMetaInfo = function(pPageContent) {

      var pageTitle = pPageContent.metaTitle; 

      var metaDescription = pPageContent.metaDescription; 

      var metaUrl =  String($location.absUrl()); 

      MetaInformation.setMetaUrl(metaUrl); 
      
      MetaInformation.setDefaultBannerImage(); 

      MetaInformation.setMetaDescription(metaDescription); 

      PageTitle.setTitle(pageTitle); 

    }

    vm.pageContent = Content.items[0].fields;  

    vm.setUpMetaInfo(vm.pageContent);


}]); 
