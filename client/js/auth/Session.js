'use strict';
// Attempt at making Sessions for userTokens / userEmail
twopence.service('Session', function () {
  this.create = function (userToken, userId) {
    this.userToken = userToken;
    this.userEmail = userId;
  };
  this.destroy = function () {
    this.userToken = null;
    this.userEmail = null;
  };
})
