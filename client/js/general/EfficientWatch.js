
'use strict'; 

/*------------------------------------*\
   Efficient Watch  Service
\*------------------------------------*/

twopence.service('EfficientWatch', function() {

    this.watch = function (pop, controllerProto, func) {
        Object.defineProperty(controllerProto,
        pop, {
            get: function () {

                return this.prop;
            },
            set: function (newValue) {
                this.prop = newValue;

                //Call method on update
                if (typeof func == 'function') func(newValue);

            },
            enumerable: true,
            configurable: true
        });
    };

}); 

