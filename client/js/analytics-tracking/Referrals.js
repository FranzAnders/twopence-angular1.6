
'use strict';

/*------------------------------------*\
    #Referrals Service
\*------------------------------------*/

twopence.service('Referrals', function() {

  var referrals = {};

  referrals.referral = undefined;

  referrals.setReferral = function(pReferralSource) {
    referrals.referral = pReferralSource;
  }

  referrals.getReferral = function() {
    return referrals.referral;
  }

  return referrals;

})


