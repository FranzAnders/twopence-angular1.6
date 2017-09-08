
'use strict'; 

/*------------------------------------*\
    Project Factory
\*------------------------------------*/

humanautSite.factory('Projects', ['$q', function($q) {
 
    var Projects = {}; 

    Projects.getProjects = function() {

      return Contentful.getEntries({'sys.id' : '1idSk77BPq06KqSmG2UECa', 'include' : 3})

    }

    Projects.getContent = function() {

      return Contentful.getEntries({'sys.id' : '3vcZpvusZa6iiMeYkUCcCM', 'include' : 3})

    }

    Projects.getProject = function(pProjectHandle) { 

      return Projects.getProjects().then(function(projectsContent) {

          var project = null; 

          var projectList = projectsContent.items[0].fields.projects; 

          for(var i = 0; i < projectList.length; i++) {

              if(projectList[i].fields.id === pProjectHandle) {

                project = projectList[i];
                return project; 

              }

          }

      }); 

    }

    return Projects; 


}]); 

