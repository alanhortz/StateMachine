var eventuality = function (that) {
	var registry = {};

	that.fire = function (event) {
		var array,
			func,
			handler,
			i,
			type = typeof event === 'string' ? event : event.type;

		if (registry.hasOwnProperty(type)) {
			array = registry[type];
			for (i = 0; i < array.length; i += 1) {
				handler = array[i];

				func = handler.method;
				if (typeof func === 'string') {
					func = this[func];
				}

				func.apply(this, handler.parameters || [event]);

			}

		}
		return this;
	};

	that.on = function (type, method, parameters) {
		var handler = {
			method: method,
			parameters: parameters
		};
		if (registry.hasOwnProperty(type)) {
			registry[type].push(handler);
		} else {
			registry[type] = [handler];
		}
		return this;
	};

	return that;
};

var genericState = function (my) {
	my = my || {};

	var name = 'Generic',
		that = {},
		entry = function () { console.log('entry called'); },
		exit = function () { console.log('exit called'); },
		stopBut = function () {},
		playBut = function () {};

	that.entry = entry;
	that.exit = exit;
	that.stopBut = stopBut;
	that.playBut = playBut;


	that.get_name = function () {
		return name;
	};
	return that;
};

var playState = function (my) {
	var name = 'Play',
		that = genericState(my),
		exit = function () {}; // Ajouter l'appel à la super méthode !!! pour surcharger !

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	that.stopBut = function () {
		exit();
		my.state = my.stopState;
		my.state.entry();
	};	

	return that;

};

var stopState = function (my) {
	var name = 'Stop',
		that = genericState(my),
		exit = function () {}; // Ajouter l'appel à la super méthode !!! pour surcharger !

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	that.playBut = function () {
		exit();
		my.state = my.playState;
		my.state.entry();
	};

	return that;		
};

var cassettePlayer = function (spec, my) {
	my = my || {};

	my.playState = playState(my);
	my.stopState = stopState(my);

	my.state = 	my.stopState;

	var that = {};

	that.stopBut = function () {
		my.state.stopBut();
	};
	that.playBut = function () {
		my.state.playBut();
	};

	my.stopPlay = function () {};
	my.startPlay = function () {};

	that.stopPlay = my.stopPlay;
	that.startPlay = my.startPlay;

	return that;

};

var myPlayer = cassettePlayer();

myPlayer.playBut();
myPlayer.stopBut();