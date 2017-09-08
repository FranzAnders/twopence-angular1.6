
'use strict';

/*------------------------------------*\
    #Meta Information Service
\*------------------------------------*/

whiskersSite.service('MetaInformation', ['$timeout', function($timeout) {

    var metaDescription = 'We are a Brand Invention and Advertising agency that makes things humans love. We specialize in building brands, sharable content and product experiences from scratch.';
    var metaKeywords = 'Humanaut, Chattanooga, Creative Agency, Design, Digital, Print';
    var metaBannerImage = ''; 
    var metaUrl = ''

    var MetaInformation = {};

    //Defaults
    var defaultMetaBannerImage = '';
    var defaultUrl = 'http://www.humanaut.is'
    //end Defaults

    Contentful.getAsset('4kkEsQHlXawsooyoMWiM8i')
      .then(function(metaBanner) {

        $timeout(function() {
        
        defaultMetaBannerImage = metaBanner.fields.file.url; 
        metaBannerImage = defaultMetaBannerImage; 

        }); 

    }); 




    MetaInformation.description = function() { return metaDescription; }

    MetaInformation.keywords = function() { return metaKeywords; }

    MetaInformation.bannerImage = function() { return metaBannerImage; }

    MetaInformation.url = function() { return metaUrl; }

    MetaInformation.reset = function() {

        metaDescription = 'We are a Brand Invention and Advertising agency that makes things humans love. We specialize in building brands, sharable content and product experiences from scratch.';
        metaKeywords = 'Humanaut, Chattanooga, Creative Agency, Design, Digital, Print';
        metaBannerImage = defaultMetaBannerImage; 
        metaUrl = defaultUrl; 

    }

    MetaInformation.setMetaDescription = function(pMetaDescription) {

      if(pMetaDescription) {
        
        metaDescription = pMetaDescription;

      } else {

        MetaInformation.reset(); 
        
      }

    }


    MetaInformation.setMetaBannerImage = function(pMetaBannerImage) {

      if(pMetaBannerImage) {
        
        metaBannerImage = pMetaBannerImage;

      } else {

        MetaInformation.reset(); 
        
      }

    }

    MetaInformation.setDefaultBannerImage = function() {

      metaBannerImage = defaultMetaBannerImage

    }

    MetaInformation.setMetaUrl = function(pMetaUrl) {

      metaUrl = pMetaUrl;

    }


    MetaInformation.appendMetaKeywords = function() {

      for(var key in newKeywords) {

        if(metaKeywords === '') {

          metaKeywords += newKeywords[key].name; 

        } else {

          metaKeywords += ', ' + newKeywords[key].name; 

        }

      }

    }

    return MetaInformation;

}]); 
