
'use strict'; 

/*------------------------------------*\
    #Project Controller
\*------------------------------------*/

humanautSite.controller('projectCtrl', 
      ['$stateParams', 
       '$timeout', 
       '$location',
       'MetaInformation',
       'PageTitle',
       'Project', 
       'Projects',
      function(
          $stateParams, 
          $timeout, 
          $location,
          MetaInformation,
          PageTitle,
          Project,
          Projects) {

    var vm = this; 


    vm.$onInit = function() {

      vm.caseStudy = Project.fields.caseStudy;
      
      vm.setUpMetaInfo(Project.fields); 

      vm.handle = $stateParams.projectHandle; 

      vm.pagination = {

          'next' : null, 
          'previous' : null

      }; 

      
      Projects.getProjects().then(function(data) { 

        $timeout(function() {
       
          var projects = data.items[0].fields.projects; 
          var nextId = null; 
          var prevId = null; 
          var lastId = null; 

          for(var i = 0; i < projects.length; i++) {

            if(vm.handle === projects[i].fields.id) {

                nextId = i + 1; 
                prevId = i - 1; 
                lastId = projects.length - 1; 

                vm.pagination.next = projects[nextId];
                vm.pagination.previous = projects[prevId];

                if(vm.pagination.previous == undefined) {

                  vm.pagination.previous = projects[lastId]; 

                }

                 if(vm.pagination.next == undefined) {

                  vm.pagination.next = projects[1]; 

                }

                return 

            }

          }

        });

      });

    }

    //
    // Gets The meta information for the page title and meta info 
    //
    vm.setUpMetaInfo = function(pPageContent) {

      var pageTitle = pPageContent.pageTitle; 

      var metaDescription = pPageContent.metaDescription; 

      var metaBanner = pPageContent.metaBanner.fields.file.url;

      var metaUrl =  String($location.absUrl()); 

      PageTitle.setTitle(pageTitle); 
      
      MetaInformation.setMetaDescription(metaDescription); 

      MetaInformation.setMetaBannerImage(metaBanner); 

      MetaInformation.setMetaUrl(metaUrl); 

    }

}]); 
