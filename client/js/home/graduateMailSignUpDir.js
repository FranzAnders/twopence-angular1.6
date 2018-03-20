
'use strict';

/*------------------------------------*\
    Graduate Mail Sign Up Directive
\*------------------------------------*/
twopence.component('graduateMailSignUpDir', {
  bindings: {
    inputLabel: '@',
    buttonText: '@',
    altClass: '@'
  },
  templateUrl: "js/home/graduateMailSignUp.html",
  controller: graduateMailSignUpCtrl,
  controllerAs: 'mailSignUp'
});

graduateMailSignUpCtrl.$inject = ['$element', 'UrlParams', '$q'];

function graduateMailSignUpCtrl(element, UrlParams, $q) {
  var form = $(element.find('form')),
    button = form.find('button'),
    emailInput = form.find('input');

  form.click(function () {
    mixpanel.track('Waitlist Form Focused', {
      'User Type': 'Graduate'
    });
  })

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
          'User Type': 'Graduate'
        }))
      .then(() => fbq('track', 'Lead', {
        content_category: 'graduate'
      }))
      .then(function(){
        // fire LinkedIn conversion pixel
        var linkConvPixel = document.createElement("IMG");
        linkConvPixel.setAttribute("src", "https://dc.ads.linkedin.com/collect/?pid=297394&conversionId=338442&fmt=gif");
        linkConvPixel.setAttribute("style", "display:none");
        linkConvPixel.setAttribute("height", "1");
        linkConvPixel.setAttribute("width", "1");
        document.body.appendChild(linkConvPixel);
      })
      .then(() => form.unbind('submit').submit());
  })
}
