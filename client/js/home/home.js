




$(document).on('ready', function() {


      var getBackgrounds =  function() {

         return Contentful.getEntries({'sys.id' : 'ID3OzdUDw0D6aGgaqcWMwGKm', 'include' : 1});

      }; 

       getBackgrounds().then(function(pData) {

          //console.log(pData); 

       }); 

    var backgrounds = [

        'assets/images/heroHeader--2.jpg',
        'assets/images/heroHeader--2.jpg',
        'assets/images/heroHeader--4.jpg',
        'assets/images/heroHeader--5.jpeg',
        'assets/images/header15--small.jpg',
        'assets/images/heroHeader--7.jpg'

    ]; 

    var chooseBackground = function() {

      var chosenBgId = Math.floor(Math.random() * 5) + 0; 

      var background = backgrounds[chosenBgId]; 

      $('[data-ui-component="hero-background"]').css("backgroundImage", 'url(' + background + ')'); 

    }; 

    chooseBackground(); 

}); 

