
'use strict'; 

/*------------------------------------*\
    #Projects Controller
\*------------------------------------*/

humanautSite.controller('projectsCtrl', [
          '$timeout',  
          '$location',
          'allProjects',
          'Content', 
          'MetaInformation',
          'PageTitle',
          'Projects',
          function(
            $timeout,
            $location,
            allProjects, 
            Content, 
            MetaInformation,
            PageTitle,
            Projects
            ) {

    var vm = this; 


    vm.$onInit = function() {

      vm.pageContent = Content.items[0].fields; 
      
      vm.setUpMetaInfo(vm.pageContent);

      vm.allProjects = allProjects.items[0].fields;  

    }; 



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

}]); 


