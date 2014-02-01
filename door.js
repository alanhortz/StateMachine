

var genericState = function (my) {
	my = my || {};

	var name = 'Generic',
		that = {},
		entry = function () { console.log('entry called'); },
		exit = function () { console.log('exit called'); },
		close = function () {},
		open = function () {};

	that.entry = entry;
	that.exit = exit;
	that.close = close;
	that.open = open;

	that.get_name = function () {
		return name;
	};

	return that;
};

var openState = function (spec, my) {
	var name = 'Open',
		that = genericState(my),
		exit = function () {};
	// Ajouter l'appel à la super méthode !!! pour surcharger !


	that.exit = exit;
	that.get_name = function () {
		return name;
	};

	that.close = function () {
		exit();
		my.state = my.closedState;
		my.fire('stateChanged');
		my.state.entry();
	};

	return that;
};
var closedState = function (spec, my) {
	var name = 'Closed',
		that = genericState(my),
		exit = function () {}; // Ajouter l'appel à la super méthode !!! pour surcharger !

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	that.open = function () {
		if (my.locked === false) {
			exit();
			my.state = my.openState;
			my.fire('stateChanged');
			my.state.entry();
		}
	};

	return that;
};

var door = function (spec, my) {
	my = my || {};

	my.openState = openState(spec, my);
	my.closedState = closedState(spec, my);

	my.state = my.openState;
	my.locked = false;

	var that = eventuality({}),

		lock = function () {
			if (my.locked === false) {
				my.locked = true;
			}
		},
		unlock = function () {
			if (my.locked === true) {
				my.locked = false;
			}
		};

	that.getStateName = function () {
		return my.state.get_name();
	};
	that.close = function () {
		my.state.close();
	};
	that.open = function () {
		my.state.open();
	};
	that.lock = lock;
	that.unlock = unlock;
	my.fire = that.fire;

	return that;
};


var myDoor = door();

// Event is the default but Parameters can also be used here with .on('', function (param1,param2) {}, ['value1', 'value2'])

myDoor.on('stateChanged', function (event) {
	console.log('State changed : ' + myDoor.getStateName());
});


myDoor.close();
myDoor.lock();
myDoor.open();
myDoor.unlock();
myDoor.open();

