
'use strict';

/*------------------------------------*\
    Graduate Mail Sign Up Directive
\*------------------------------------*/

twopence.directive('graduateMailSignUpDir', ['$location', function(location) {

  return {

    restrict: "E",
    scope: {},
    replace: true,
    templateUrl: "js/home/graduateMailSignUp.html",
    controller: function() {

      var vm = this;

    },
    controllerAs: "mailSignUp",
    bindToController: {

      inputLabel: "@"

    },
    link: function(scope, element, attrs) {
        var form = $(element.children()[0]),
            button = form.find('button'),
            emailInput = form.find('input');

        button.click(function(){
          var emailAddress = emailInput.val();
          mixpanel.alias(emailAddress);
          mixpanel.identify(emailAddress);
          mixpanel.people.set({
            '$created': new Date(),
            '$email': emailAddress,
            'Referred By': location.search().referredby,
          })
        })


    }

  }

}]);
