var VehicleInterface = {
    speed: 0,

    startEngine: function () {
        var me = this;

        me.engine = setInterval(function () {
            console.log("Vehicle engine running at: " + me.speed);
        }, 1000);
    },

    stopEngine: function () {
        console.log('Vehicle engine stopped');
        clearInterval(this.engine);
    },

    accelerate: function (factor) {
        this.speed += factor;
    }
};

VehicleInterface.startEngine();

//Accelerate after 4s
setTimeout(function () {
    VehicleInterface.accelerate(40);
}, 3000);

//Stop the vehicle
setTimeout(function () {
    VehicleInterface.stopEngine();
}, 6000);
