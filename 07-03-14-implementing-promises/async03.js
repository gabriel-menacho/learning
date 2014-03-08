/*jshint nonew: true */
'use strict';

/**
 * Requirements: node.js
 * run with:
 *
 *		node async03.js [name]
 *
 * where name is each key of this map (first, second, third,...)
 */
var map = {

	// ##### PART ONE #####
	first: function () {
		function doSomething(cb) {
			var res = "I'm the result of a promise";
			cb(res);
		}

		// execution
		doSomething(function (result) {
			console.log(result);
		});
	},


	second: function () {
		function doSomething() {
			return {
				then: function (cb) {
					var res = "I'm the result of a promise";
					cb(res);
				}
			};
		}

		// execution
		var x = doSomething();
		x.then(function (result) {
			console.log(result);
		});
		x.then(function (result) {
			console.log(result);
		});
	},


	third: function () {

		var Promise = function (fn) {
			var callback = null;
			this.then = function (cb) {
				callback = cb;
			};

			function resolve(value) {
				
				// put the callback in the event queue
				setTimeout(function() {
					callback(value);				
				}, 0);

			}

			fn(resolve);
		};

		function doSomething() {

			function fn(resolve) {
				// works with async functions too
				setTimeout(function () {
					resolve(42);
				}, 0);
			}

			return new Promise(fn);
		}

		var p = doSomething();
		// TODO: make the then function async to make it fail
		// setTimeout(function (){			
			p.then(function (data) {
				console.log(data);
			});
		// }, 1000);
	
	},

	fourth: function () {

		var Promise = function (fn) {
			var state = 'PENDING',
				deferred,
				value;


			function resolve(v) {
				value = v;
				state = 'RESOLVED';

				// if there was a callback saved for this promise
				// execute it right away
				if (deferred) {
					handle(deferred);
				}
			}

			function handle(onResolved) {
				// if the original promise was not resolved
				// save the callback to be executed later
				if (state === 'PENDING') {
					deferred = onResolved;
					return;
				}

				// the promise is resolved so execute the resolve function
				onResolved(value);
			}

			this.then = function (onResolved) {
				handle(onResolved);
			};

			fn(resolve);
		};

		function doSomething() {

			function fn(resolve) {
				setTimeout(function () {
					resolve(42);
				}, 1000);
			}

			return new Promise(fn);
		}

		doSomething().then(function (value) {
			console.log(value);
		});
	},

	// ##### PART TWO #####
	fifth: function () {
		function Promise(fn) {
			var status = 'PENDING',
				value,
				deferred;

			function resolve(newValue) {
				status = 'RESOLVED';
				value = newValue;

				if (deferred) {
					handle(deferred);
				}
			}

			function handle(newDeferred) {
				if (status === 'PENDING') {
					deferred = newDeferred;
					return;
				}

				var onResolved = newDeferred.onResolved;
				var ret = onResolved(value);
				newDeferred.resolve(ret);
			}


			this.then = function (onResolved) {
				return new Promise(function (resolve) {
					handle({
						onResolved: onResolved,
						resolve: resolve
					});
				});
			};

			fn(resolve);
		}

		new Promise(function (resolve){
			resolve('this ');
		}).then(function (v) {
			console.log(v);
			return 'is ';
		}).then(function (v) {
			console.log(v);
			return 'a ';
		}).then(function (v) {
			console.log(v);
			return 'promise ';
		}).then(function (v) {
			console.log(v);
		});
	},

	sixth: function () {
		var id = 0;
		function Promise(fn) {
			var status = 'PENDING',
				value,
				deferred;

			function resolve(newValue) {
				if (newValue instanceof Promise) {
					newValue.then(resolve);
					return;
				}


				status = 'RESOLVED';
				value = newValue;

				if (deferred) {
					handle(deferred);
				}
			}

			function handle(newDeferred) {
				if (status === 'PENDING') {
					deferred = newDeferred;
					return;
				}

				var ret = newDeferred.onResolved(value);
				newDeferred.resolve(ret);
			}


			this.then = function (onResolved) {
				return new Promise(function (resolve) {
					handle({
						onResolved: onResolved,
						resolve: resolve
					});
				});
			};

			// this.id = id++;
			// console.log('id = ' + this.id);
			fn(resolve);
		}

		/*
			.then() <---------|
				new promise   |
					.then()	--|
			.then()	
		*/

		function factory(val) {
			return new Promise(function (resolve) {
				resolve(val);
			});
		}

		factory(5)
			.then(function (v) {
				return factory(5 + v);
			})
			.then(function (v) {
				console.log(v);
			});
	}

};


map[process.argv[2]]();