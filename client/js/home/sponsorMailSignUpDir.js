'use strict';

/*------------------------------------*\
    Sponsor Mail Sign Up Directive
\*------------------------------------*/

twopence.component('sponsorMailSignUpDir', {
  bindings: {
    inputLabel: '@'
  },
  templateUrl: "js/home/sponsorMailSignUp.html",
  controller: sponsorMailSignUpCtrl
});

sponsorMailSignUpCtrl.$inject = ['$element', 'UrlParams'];

function sponsorMailSignUpCtrl(element, UrlParams) {
  var form = $(element.children()[0]),
    button = form.find('button'),
    emailInput = form.find('input');

  form.click(function () {
    mixpanel.track('Waitlist Form Focused', {
      'User Type': 'Sponsor'
    });
  });

  form.submit(function (e) {
    e.preventDefault();
    var emailAddress = emailInput.val();

    var promise1 = mixpanel.alias(emailAddress);
    var promise2 = mixpanel.identify(emailAddress);
    $q.all([promise1, promise2])
      .then(() => {
        var peopleProperties = {
          '$created': new Date(),
          '$email': emailAddress,
        };

        var enrichedPeopleProperties = Object.assign(UrlParams.getParams() || {}, peopleProperties);
        return mixpanel.people.set(enrichedPeopleProperties);
      })
      .then(() => mixpanel.track('Waitlist Signup', {
          'User Type': 'Sponsor'
        }))
      .then(() => fbq('track', 'Lead', {
        content_category: 'sponsor'
      }))
      .then(() => form.unbind('submit').submit());
  })
}
