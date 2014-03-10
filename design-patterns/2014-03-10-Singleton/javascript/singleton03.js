var VehicleInterface = (function () {
    var instance,
        speed;

    function init() {
        return {
            startEngine: function () {
                var me = this;

                me.engine = setInterval(function () {
                    console.log('Vehicle engine running at: ' + speed);
                }, 1000);
            },

            stopEngine: function () {
                console.log('Vehicle stopped');
                clearInterval(this.engine);
            },

            accelerate: function (factor) {
                speed += factor;
            }
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    }

})();


var interface = VehicleInterface.getInstance();

interface.startEngine();

setTimeout(function () {
    interface.accelerate(55);
}, 3000);

setTimeout(function () {
    interface.stopEngine();
}, 6000);
