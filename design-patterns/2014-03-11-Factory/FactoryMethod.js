
 
// Creamos un constructor para definir nuevos autos
function Car( options ) {
 
  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
 
}
 
// Lo mismo para camiones
function Truck( options){
 
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}
 
 
// FactoryMethod.js
 
// Definimos una estructura de fabrica de vehiculos
function VehicleFactory() {}
 
// Definimos los prototipos y utilidades de esta fabrica
 
// El vehicleClass por defecto es Car
VehicleFactory.prototype.vehicleClass = Car;
 
// Usando el patron Factory para crear nuevas instrancias de Vehiculu
VehicleFactory.prototype.createVehicle = function ( options ) {
 
  if( options.vehicleType === "car" ){
    this.vehicleClass = Car;
  }else{
    this.vehicleClass = Truck;
  }
 
  return new this.vehicleClass( options );
 
};
 
// Creamos una instancia de nuestra factory para definir autos
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );
 
 
// vemos si car es un subtipo de Car
console.log( car instanceof Car );
 
// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );