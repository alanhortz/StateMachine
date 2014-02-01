var deviceState = function (my) {
	my = my || {};

	var that = {};

	that.name = 'AbstractState';

	that.entry = function () {
		console.info('Entering ' + that.name);
	};
	that.exit = function () {
		console.info('Exiting ' + that.name);
	};

	that.get_name = function () {
		return that.name;
	};

	return that;
};

var setupState = function (my) {
	var that = deviceState(my);

	that.name = 'Setup';

	that.start = function () {
		that.exit();
		my.state = my.processingState;
		my.state.a = my.a1State;
		my.state.b = my.b1state;
		my.state.entry();
	};

	return that;
};

var processingState = function (my) {
	var that = deviceState(my);

	that.name = 'Processing';

	that.a = {}; // Is it really necessary ? How to deal with unassigned substates ?	
	that.b = {};

	that.adone = function () {
		that.a.adone();
	};
	that.bdone = function () {
		that.b.bdone();
	};

	return that;
};

var processAState = function (my) {
	var that = processingState(my);
	that.name = 'ProcessA';
	return that;
};

var processBState = function (my) {
	var that = processingState(my);
	that.name = 'ProcessB';
	return that;
};

var a1State = function (my) {
	var that = processAState(my);

	that.name = 'A1';

	that.adone = function () {
		my.state.a.exit();
		my.state.a = my.a2State;
		my.state.a.entry();
	};

	return that;
};

var a2State = function (my) {
	var that = processBState(my);

	that.name = 'A2';

	that.entry = function () {
		if (my.state.b === my.b2State) {
			my.state.exit();
			my.state = my.cleanupState;
			my.state.entry();
		}

	};

	return that;
};

var b1State = function (my) {
	var that = processBState(my);

	that.name = 'B1';

	that.bdone = function () {
		my.state.b.exit();
		my.state.b = my.b2State;
		my.state.b.entry();
	};

	return that;
};

var b2State = function (my) {
	var that = processBState(my);

	that.name = 'B2';

	that.entry = function () {
		if (my.state.a === my.a2State) {
			my.state.exit();
			my.state = my.cleanupState;
			my.state.entry();
		}
	};

	return that;
};

var cleanupState = function (my) {
	var that = deviceState(my);

	that.name = 'Cleanup';

	return that;
};

var device = function (spec, my) {
	my = my || {};

	my.setupState = setupState(my);
	my.cleanupState = cleanupState(my);
	my.processingState = processingState(my);
	my.a1State = a1State(my);
	my.a2State = a2State(my);
	my.b1state = b1State(my);
	my.b2State = b2State(my);

	my.state = my.setupState;

	var that = {};

	that.start = function () {
		my.state.start();
	};
	that.adone = function () {
		my.state.adone();
	};
	that.bdone = function () {
		my.state.bdone();
	};

	return that;
};

var myDevice = device();
myDevice.start();
myDevice.bdone();
myDevice.adone();

