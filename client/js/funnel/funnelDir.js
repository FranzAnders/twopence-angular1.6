
'use strict'; 


twopence.component('funnelDir', {
  bindings: {
    isHidden: '<'
  },
  templateUrl: 'js/funnel/funnel.html',
  controller: funnelCtrl,
  controllerAs: 'funnel'
});

funnelCtrl.$inject = ['$state', 'Funnel', '$cookies', 'UrlParams'];

function funnelCtrl($state, Funnel, $cookies, UrlParams) {
  this.isHidden = true;
  this.$onInit = function() {
    var vm = this;
    var modalHidden = UrlParams.getParams().modal;
    vm.isHidden = Funnel.getState();
    vm.isHidden = $cookies.get('trafficSplitterDisplayed') === 'true';
    if (modalHidden === 'false') vm.isHidden = true;
    if (modalHidden === 'true') vm.isHidden = false;
    
    var page = document.body;

    if(!vm.isHidden) {
      page.classList.add('is-hidden-by-funnel');
    }
  }
  this.revealPage = function() {  
    Funnel.setState(true);
    this.isHidden = Funnel.getState();
    var page = document.body;
    page.classList.remove('is-hidden-by-funnel');
    $cookies.put('trafficSplitterDisplayed', 'true');
  };
}
