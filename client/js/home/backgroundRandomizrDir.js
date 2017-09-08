
'use strict'; 

humanautSite.directive('backgroundRandomizrDir',  function() {

    return {

        restrict: 'A',
        scope: {},
        link:function(scope, element){

          var bgList = []; 

          Contentful.getEntries({'sys.id' : '3OzdUDw0D6aGgaqcWMwGKm', 'include' : 4}).then(function(backgrounds) {

            bgList = backgrounds.items[0].fields.list;

            chooseBackground(bgList); 

          });

            var chooseBackground = function(backgroundList) {

              var chosenBgId = Math.floor(Math.random() * backgroundList.length); 

              if(mediaCheck.checkIfSmall()) {

                var background = bgList[chosenBgId].fields.small.fields.file.url; 

              } else {

                var background = bgList[chosenBgId].fields.large.fields.file.url; 

              }

              $(element).css("backgroundImage", 'url(' + background + ')'); 

            }; 

        }

    }


});
