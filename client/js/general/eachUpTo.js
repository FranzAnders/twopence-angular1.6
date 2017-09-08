

Handlebars.registerHelper('eachUpTo', function(arr, limit, start) {

    if(!isNaN(start)) {

      return arr.slice(start, limit);   

    } else {

      return arr.slice(0, limit);

    }
});