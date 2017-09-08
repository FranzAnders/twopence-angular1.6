

humanautSite.directive('loadingScreenDir', [
     '$animate', 
     '$timeout', 
     '$rootScope',
    function(
        $animate, 
        $timeout, 
        $rootScope) {

    return {

        restrict: 'A',
        link: function(scope, element, attrs) {

           $animate.on('enter', element, function(element, phase) {

                if(phase === 'close') {

                    $rootScope.$emit('loadingAnimHasFinishedEntering'); 

                }

            });

            $animate.on('leave', element, function(element, phase) {
              
                if(phase === 'close') {
                    $rootScope.$emit('loadingAnimHasFinishedLeaving'); 
                }

            });

        }

    }

}]); 