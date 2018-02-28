
'use strict'; 

/*------------------------------------*\
    Complex Calculator Directive
\*------------------------------------*/

twopence.directive('complexCalcDir', function() {

  return {

    scope: {}, 
    restrict: "E", 
    replace: true, 
    controller: ['EfficientWatch', function(EfficientWatch) {

      var vm  = this; 

      vm.withSponsorship = false; 

      vm.$onInit = function() {

        vm.graduateInfo = {
          'loan': 45000,
          'income': 75000,
          'has_sponsor': false,
          'interest_avoided': 16784,
          'years_reclaimed': 12.3
        };

        if(vm.type === 'sponsor') {
          
          vm.withSponsorship = true; 

        }

      }



      vm.calculate = function(studentLoanOutstanding, annualIncome, hasSponsorship){

            var pc = annualIncome/(250000 - 30000); /* the percentage slider value */
            var loc = (pc * 330) + 12;
            vm.loc = loc;
            console.log(loc);


            var interestAvoided = 0;
            var daysSaved = 0;

            var studentLoanOutstandingOriginal = studentLoanOutstanding;
            var annualIncomeGrowthRate= 0.02;
            var studentLoanInterestRate = 0.05;
            var numberOfSponsors = 0;
            
            var initGrossIncome = annualIncome;
            var repaymentTermInYears = 20;
            var monthlyRentPayment = 1000;
            var purchaserounding = 500;
            var monthlyDebtPayment = Math.round(formulajs.PMT(studentLoanInterestRate/12, repaymentTermInYears*12,-studentLoanOutstandingOriginal,0))
            var monthlySavings = 0;
            var numberOfMonthly1000Purchases = 1;
            var savingsRate = 0.10;
            var grossIncome = initGrossIncome;

            if(hasSponsorship == true) {
              numberOfSponsors = 1;
            }

            var dumbYouMonths = []
            var pickpocketUserMonths = [];
            var sponsoredPickpocketUserMonths = [];

            for(var i=1; i<=repaymentTermInYears * 12; i++){
              if(i % 12 == 0){
                grossIncome = Math.round(grossIncome * (1 + annualIncomeGrowthRate));
              }
              var netIncome = Math.round(grossIncome * (1-0.36));

              var monthlyDeductions = Math.round((monthlyRentPayment - purchaserounding) + monthlyDebtPayment + monthlySavings + (1000 - purchaserounding) * numberOfMonthly1000Purchases);
              var monthlyEligibleSpending = (netIncome/12) - monthlyDeductions;
              var pickpocketPayment = Math.round(monthlyEligibleSpending * savingsRate);

              var studentLoanOutstandingA = 0;
              if(i > 1){
                studentLoanOutstandingA = Math.round(dumbYouMonths[dumbYouMonths.length-1]) * -1;
              } else {
                studentLoanOutstandingA = studentLoanOutstanding * -1;
              }
              var dumbYou = Math.abs(Math.round(Math.min(0, studentLoanOutstandingA * Math.exp(studentLoanInterestRate/12) + monthlyDebtPayment)));
              if(dumbYou > 0){
                dumbYouMonths.push(dumbYou);
              }

              var studentLoanOutstandingB = 0;
              if(i > 1){
                studentLoanOutstandingB = Math.round(pickpocketUserMonths[pickpocketUserMonths.length-1])  * -1;
              } else {
                studentLoanOutstandingB = studentLoanOutstanding * -1;
              }
              var pickpocketUser = Math.abs(Math.round(Math.min(0, studentLoanOutstandingB * Math.exp(studentLoanInterestRate/12) + (monthlyDebtPayment + pickpocketPayment))));
              if(pickpocketUser > 0){
                pickpocketUserMonths.push(pickpocketUser);
              }

              var studentLoanOutstandingC = 0;
              if(i > 1){
                studentLoanOutstandingC = Math.round(sponsoredPickpocketUserMonths[sponsoredPickpocketUserMonths.length-1])  * -1;
              } else {
                studentLoanOutstandingC = studentLoanOutstanding * -1;
              }
              var sponsoredPickpocketUser = Math.abs(Math.round(Math.min(0, studentLoanOutstandingC * Math.exp(studentLoanInterestRate/12) + (monthlyDebtPayment + pickpocketPayment * (1+numberOfSponsors)))));
              if(sponsoredPickpocketUser > 0){
                sponsoredPickpocketUserMonths.push(sponsoredPickpocketUser);
              }
            }

            // Days Saved
            var totalTermMoment = moment().add(repaymentTermInYears, 'years');
            var pickPockUserMoment = moment().add(pickpocketUserMonths.length, 'months');
            var sponsoredPickpocketMoment = moment().add(sponsoredPickpocketUserMonths.length, 'months');

            var daysSavedPickpocket = totalTermMoment.diff(pickPockUserMoment, 'days');
            var sponsorshipAlone = pickPockUserMoment.diff(sponsoredPickpocketMoment, "days");
            var daysSavedPickpocketWithSponsor = daysSavedPickpocket + sponsorshipAlone;

            // Interest Avoided
            var dumbYouInterestPaid = Math.round(Math.abs(formulajs.CUMIPMT(studentLoanInterestRate/12,repaymentTermInYears*12,studentLoanOutstandingOriginal,1,repaymentTermInYears*12,0)));
            var pickpocketUserInterestPaid = Math.round(Math.abs(formulajs.CUMIPMT(studentLoanInterestRate/12,pickpocketUserMonths.length,studentLoanOutstandingOriginal,1,pickpocketUserMonths.length,0)));
            var pickpocketUserWithSponsorInterestPaid = Math.round(Math.abs(formulajs.CUMIPMT(studentLoanInterestRate/12,sponsoredPickpocketUserMonths.length,studentLoanOutstandingOriginal,1,sponsoredPickpocketUserMonths.length,0)));

            var interestAvoidedPickpocket = dumbYouInterestPaid - pickpocketUserInterestPaid;
            var interestAvoidedBySponsorAlone = pickpocketUserInterestPaid - pickpocketUserWithSponsorInterestPaid;
            var interestAvoidedPickpocketWithSponsor = interestAvoidedPickpocket + interestAvoidedBySponsorAlone;

            console.log({"daysSavedPickpocket":daysSavedPickpocket, 
                "daysSavedPickpocketWithSponsor": daysSavedPickpocketWithSponsor, 
                "interestAvoidedPickpocket": interestAvoidedPickpocket, 
                "interestAvoidedPickpocketWithSponsor": interestAvoidedPickpocketWithSponsor});

            vm.graduateInfo.interest_avoided = interestAvoidedPickpocket;
            vm.graduateInfo.years_reclaimed = daysSavedPickpocket / 360;


            if(hasSponsorship) {
              console.log('there is a sponsorship in place')
            }
        };


        // var result = vm.calculate(30000,75000,true);

        // console.log(result); 

    }], 
    bindToController:{
      'copy': "=",
      'type': "@"
    },
    controllerAs: 'calculator',
    templateUrl: 'js/calculators/complexCalc.html', 
    link: function() {

  /*  

        
        var div = document.getElementById('result');
        div.innerHTML += "daysSavedPickpocket:" + result["daysSavedPickpocket"] + ", should be: 5146.5 <br><br>";
        div.innerHTML += "daysSavedPickpocketWithSponsor:" + result["daysSavedPickpocketWithSponsor"] + ", should be: 5986 <br><br>";
        div.innerHTML += "interestAvoidedPickpocket: $" + result["interestAvoidedPickpocket"] + ", should be: $12,799 <br><br>";
        div.innerHTML += "interestAvoidedPickpocketWithSponsor: $" + result["interestAvoidedPickpocketWithSponsor"] + ", should be: $14,687 <br><br>";
*/
    }

  }

}); 