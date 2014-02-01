var genericState = function (my) {
	my = my || {};

	var name = 'Generic',
		that = {},
		entry = function () { console.log('entry called'); },
		exit = function () { console.log('exit called'); },
		stopBut = function () {},
		playBut = function () {},
		powerBut = function () {};

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
		};

	that.exit = exit;
	that.powerBut = powerBut;

	that.get_name = function () {
		return name;
	};

	return that;
};

var playState = function (my) {
	var name = 'Play',
		that = powerOn(my),
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
		that = powerOn(my),
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


	my.powerOff = powerOff(my);
	my.playState = playState(my);
	my.stopState = stopState(my);

	my.powerOnHistory = my.stopState;

	my.state = 	my.powerOff;

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
myPlayer.stopBut();