var VehicleInterface = (function () {
    var instance;

    function Instance() {
        this.speed = 0;
    }

    Instance.prototype.startEngine = function () {
        var me = this;

        me.engine = setInterval(function () {
            console.log('Vehicle engine running at: ' + me.speed);
        }, 1000);
    }

    Instance.prototype.stopEngine = function () {
        console.log('Vehicle stopped');
        clearInterval(this.engine)
    }

    Instance.prototype.accelerate = function (factor) {
        this.speed += factor;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = new Instance();
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
