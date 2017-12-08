
'use strict';

/*------------------------------------*\
   Session service
\*------------------------------------*/

twopence.service('Session', function () {

  var session = {}; 

  session.create = function (userToken, userId) {
    session.userToken = userToken;
    session.userEmail = userId;
  };

  session.destroy = function () {
    session.userToken = null;
    session.userEmail = null;
  };

  return session; 

})
