
'use strict';

/*------------------------------------*\
    Graduate Mail Sign Up Directive
\*------------------------------------*/

twopence.directive('graduateMailSignUpDir', ['UrlParams', function(UrlParams) {

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

      inputLabel: "@",
      buttonText: "@",
      altClass:"@"

    },
    link: function(scope, element, attrs) {
        var form = $(element.children()[0]),
            button = form.find('button'),
            emailInput = form.find('input');
            
        form.click(function(){
          mixpanel.track('Waitlist Form Focused', {'User Type': 'Graduate'});
        })

        form.submit(function(e){
          e.preventDefault();
          var emailAddress = emailInput.val();

          mixpanel.alias(emailAddress);
          mixpanel.identify(emailAddress);
          
          var peopleProperties = {
            '$created': new Date(),
            '$email': emailAddress,             
          };         
          
          var enrichedPeopleProperties = Object.assign(UrlParams.getParams() || {}, peopleProperties);   
          mixpanel.people.set(enrichedPeopleProperties);
          mixpanel.track('Waitlist Signup', {'User Type': 'Graduate'});
        
          fbq('track', 'Lead', {content_category: 'graduate'});
          
          /*
          All code above needs to run successfully.
          
          Without the timeout below, some mixpanel calls were not being
          successfully completed before the form.submit() below runs.
          Adam was only able to reproduce this error on mobile safari.
          
          A timeout is a poor man's solution. A better way would be to
          create promises for each call above, and then only run form.unbind('submit').submit()
          when all Promises have been resolved. 
          
          #TheAdamEffect
          */
          setTimeout(function () {
            form.unbind('submit').submit();             
          }, 200);

        })

    }

  }

}]);
