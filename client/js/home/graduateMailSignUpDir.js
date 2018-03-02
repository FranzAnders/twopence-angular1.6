
'use strict';

/*------------------------------------*\
    Graduate Mail Sign Up Directive
\*------------------------------------*/

<<<<<<< HEAD
twopence.directive('graduateMailSignUpDir', ['Referrals', function(Referrals) {
=======
twopence.directive('graduateMailSignUpDir', ['$location', function(location) {
>>>>>>> master

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
<<<<<<< HEAD
            button = form.find('button'),
            emailInput = form.find('input');
=======
        button = form.find('button'),
        emailInput = form.find('input');
>>>>>>> master

        button.click(function(){
          var emailAddress = emailInput.val();
          mixpanel.alias(emailAddress);
          mixpanel.identify(emailAddress);
          mixpanel.people.set({
            '$created': new Date(),
            '$email': emailAddress,
<<<<<<< HEAD
            'Referred By': Referrals.getReferral() || 'none'
          })
        })
=======
            'Referred By': location.search().referredby,
          })
      })
>>>>>>> master

    }

  }

}]);
