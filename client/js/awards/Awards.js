
'use strict'; 

/*------------------------------------*\
    Press Service
\*------------------------------------*/


humanautSite.factory('Awards', function() {

    var Awards = {}; 

    Awards.getAllPress = function() {

        return Contentful.getEntries({'content_type' : 'pressPost', 'include' : 3})

    }

    Awards.getPressForYear = function(pYear) {

      return Contentful.getEntries({'content_type' : 'pressPost', 'fields.yearPublished': pYear})

    }

    Awards.getAllAwards = function() {

      return Contentful.getEntries({'content_type' : 'awardPost', 'include': 3})

    }

    Awards.getAwardsForYear = function(pYear) {

      return Contentful.getEntries({'content_type' : 'awardPost', 'fields.yearWon': pYear})

    }

    Awards.getContent = function() {

        return Contentful.getEntries({'sys.id' : '1E6QwcWT5u20gC4SqW0o8w', 'include' : 3})

    }

    return Awards; 

}); 

