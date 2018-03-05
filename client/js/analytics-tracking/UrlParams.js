
'use strict';

/*------------------------------------*\
    #UrlParams Service
\*------------------------------------*/

twopence.service('UrlParams', function() {

  var params = {};
  
  params.params = undefined;

  params.setParams = function(paramObject) {
    params.params = paramObject;
  }

  params.getParams = function() {
    return params.params;
  }

  return params;

})


