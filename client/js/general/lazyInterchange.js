

/*------------------------------------*\
    #Combination of jquery unveil + foundation interchange 
\*------------------------------------*/


(function($) {
    $.fn.lazyInterchange = function() {
      var selectors = this.each(function() {

        if($(this).attr('data-lazy')){
          $(this).attr('data-interchange',$(this).attr('data-lazy'));
          $(this).removeAttr('data-lazy');
          $(this).foundation('interchange', 'reflow');

        }

      });
      return selectors;
    };
}(jQuery));


$('img.img-lazy').unveil(100, function() {

    $(this).load(function() {

      $(this).lazyInterchange(); 

    this.style.opacity = 1; 


    }); 

}); 
