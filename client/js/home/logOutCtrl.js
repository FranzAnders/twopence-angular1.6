
'use strict';

/*------------------------------------*\
   Sign Up Controller
\*------------------------------------*/

twopence.controller('logOutCtrl', [
    '$filter',
    '$scope',
    '$state',
    '$timeout',
    '$window',
    '$cookies',
    'Auth',
    function(
      $filter,
      $scope,
      $state,
      $timeout,
      $window,
      $cookies,
      Auth) {

      var vm = this;

      $scope.$state = $state;

      Auth.logout();
      $cookies.put('loggedIn', false);
      $cookies.put('userToken', null);

      $state.go('main.login');

    }]);
