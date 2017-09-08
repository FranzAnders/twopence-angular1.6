
'use strict'; 

/*------------------------------------*\
    #Awards Page Controller
\*------------------------------------*/


humanautSite.controller('awardsCtrl', 
          [
           '$timeout', 
           '$location',
           'Awards', 
           'Content',
           'PageTitle',
           'MetaInformation',
           function(
             $timeout,
             $location,         
             Awards,
             Content,
             PageTitle,
             MetaInformation) {


    var vm = this; 

    vm.pageContent = null; 

    vm.awards = {}; 

    vm.press = {}; 


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



    //
    // Function sorts a list of elements by their date published from old to new 
    //
    vm.sortByDateOldToNew = function(a, b) {

      var dateA = Date.parse(a.fields.datePublished); 
      var dateB = Date.parse(b.fields.datePublished);

      if(dateA > dateB) {

        return -1

      } else if (dateB > dateA) {

        return 1

      } else if (dateB === dateA) {

        return 0;

      }

    } 


    //
    //Gets all the content for the awards page 
    //
    vm.pageContent = Content.items[0].fields;  
    
    vm.setUpMetaInfo(vm.pageContent); 



    //      
    //Gets all pressfor 2016 from contentful using the awards service and sort by old to new
    //
    Awards.getPressForYear(2016).then(function(data) {

        vm.press.press2016 = data;  

        vm.press.press2016.items.sort(vm.sortByDateOldToNew); 

        //      
        //Gets all pressfor 2016 from contentful using the awards service and sort by old to new
        //
        Awards.getPressForYear(2017).then(function(data) {

          $timeout(function() {

            vm.press.press2017 = data;  

            vm.press.press2017.items.sort(vm.sortByDateOldToNew); 

          }, 200); 

        }); 

    });


    //
    //Get awards from press service for 2017, 2016, and 2015
    //
    Awards.getAwardsForYear(2017).then(function(data) {

         vm.awards.awards2017 = data;  

        Awards.getAwardsForYear(2016).then(function(data) {

          vm.awards.awards2016 = data; 

        });

        Awards.getAwardsForYear(2015).then(function(data) {

          $timeout(function() {

          vm.awards.awards2015 = data;  

          }, 200); 


        });

    });



}]); 
