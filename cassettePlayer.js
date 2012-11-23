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
		playBut = function () {},
		powerBut = function () {},
		speakerBut = function () {};

	that.entry = entry;
	that.exit = exit;
	that.stopBut = stopBut;
	that.playBut = playBut;
	that.powerBut = powerBut;


	that.get_name = function () {
		return name;
	};
	return that;
};

var powerOn = function (my) {
	var name = 'PowerOn',
		that = genericState(my),
		exit = function () {
			my.powerOnHistory = my.state;
		},
		powerBut = function () {
			exit();
			my.state = my.powerOff;
		};

	that.speakerState = {}; // Is it really necessary ??
	that.playerState = {}; // Is it really necessary ??
	that.speakerBut = function () {
		that.speakerState.speakerBut();
	};
	that.playBut = function () {
		that.playerState.playBut();
	};
	that.stopBut = function () {
		that.playerState.stopBut();
	};

	that.exit = exit;
	that.powerBut = powerBut;


	that.get_name = function () {
		return name;
	};

	return that;
};

var powerOff = function (my) {
	var name = 'PowerOff',
		that = genericState(my),
		exit = function () {},
		powerBut = function () {
			my.state = my.powerOnHistory;
			my.state.speakerState = my.speakerHistory;
			my.state.playerState = my.playerHistory;
		};

	that.exit = exit;
	that.powerBut = powerBut;

	that.get_name = function () {
		return name;
	};

	return that;
};
var player = function (my) {
	var name = 'Player',
		that = powerOn(my),
		exit = function () {};

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	return that;
};
var playState = function (my) {
	var name = 'Play',
		that = player(my),
		exit = function () {}; // Ajouter l'appel à la super méthode !!! pour surcharger !

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	that.stopBut = function () {
		exit();
		my.state.playerState = my.stopState;
		my.state.playerState.entry();
	};

	return that;

};

var stopState = function (my) {
	var name = 'Stop',
		that = player(my),
		exit = function () {}; // Ajouter l'appel à la super méthode !!! pour surcharger !

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	that.playBut = function () {
		exit();
		my.state.playerState = my.playState;
		my.state.playerState.entry();
	};

	return that;
};

var speaker = function (my) {
	var name = 'Speaker',
		that = powerOn(my),
		exit = function () {};

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	return that;
};



var leftState = function (my) {
	var name = 'LeftState',
		that = speaker(my),
		exit = function () {};

	that.exit = exit;

	that.get_name = function () {
		return name;
	};

	that.speakerBut = function () {
		exit();
		my.state.speakerState = my.rightState;
		my.state.speakerState.entry();
	};

	return that;
};

var rightState = function (my) {
	var name = 'RightState',
		that = speaker(my),
		exit = function () {};

	that.get_name = function () {
		return name;
	};

	that.speakerBut = function () {
		exit();
		my.state.speakerState = my.leftState;
		my.state.speakerState.entry();
	};


	return that;
};

var cassettePlayer = function (spec, my) {
	my = my || {};


	my.powerOff = powerOff(my);
	my.powerOn = powerOn(my);
	my.playState = playState(my);
	my.stopState = stopState(my);
	my.leftState = leftState(my);
	my.rightState = rightState(my);

	my.powerOnHistory = my.powerOn;
	my.speakerHistory = my.leftState;
	my.playerHistory = my.stopState;

	my.state = my.powerOff;

	var that = {};

	that.stopBut = function () {
		my.state.stopBut();
	};
	that.playBut = function () {
		my.state.playBut();
	};
	that.powerBut = function () {
		my.state.powerBut();
	};
	that.speakerBut = function () {
		my.state.speakerBut();
	};

	my.stopPlay = function () {};
	my.startPlay = function () {};

	that.stopPlay = my.stopPlay;
	that.startPlay = my.startPlay;

	return that;

};

var myPlayer = cassettePlayer();

myPlayer.powerBut();
myPlayer.playBut();
myPlayer.powerBut();
myPlayer.powerBut();
myPlayer.playBut();
myPlayer.speakerBut();
myPlayer.speakerBut();
myPlayer.stopBut();
