var deviceState = function (my) {
	my = my || {};

	var name = 'Generic',
		that = {};	

	that.get_name = function () {
		return name;
	};

	return that;	
}; 

var setupState = function (my) {
	var name = 'Setup',
		that = deviceState(my);

	that.start = function () {
		my.state = my.processingState;
		my.state.a = my.a1State;
		my.state.b = my.b1state;
	};

	that.get_name = function () {
		return name;
	};	

	return that;
};

var processingState = function (my) {
	var name = 'Processing',
		that = deviceState(my);

	that.a = {}; // Is it really necessary ? How to deal with unassigned substates ?	
	that.b = {}; 

	that.adone = function () {
		that.a.adone();
	};
	that.bdone = function () {
		that.b.bdone();
	};

	that.get_name = function () {
		return name;
	};
	return that;
};

var processAState = function (my) {
	var name = 'ProcessA',
		that = processingState(my);

	that.get_name = function () {
		return name;
	};

	return that;
};

var processBState = function (my) {
	var name = 'ProcessB',
		that = processingState(my);

	that.get_name = function () {
		return name;
	};

	return that;	
}; 

var a1State = function (my) {
	var name = 'A1',
		that = processAState(my);

	that.adone = function () {
		my.state.a = my.a2State;
		my.state.a.entry();
	};	

	that.get_name = function () {
		return name;
	};

	return that;
};

var a2State = function (my) {
	var name = 'A2',
		that = processBState(my);

	that.entry = function () {
		if (my.state.b.get_name() === 'B2') {
			my.state = my.cleanupState;
		}

	};

	that.get_name = function () {
		return name;
	};

	return that;
};

var b1State = function (my) {
	var name = 'B1',
		that = processBState(my);

	that.bdone = function () {
		my.state.b = my.b2State;
		my.state.b.entry();
	};

	that.get_name = function () {
		return name;
	};

	return that;
};

var b2State = function (my) {
	var name = 'B2',
		that = processBState(my);

	that.entry = function () {
		if (my.state.a.get_name() === 'A2') {
			my.state = my.cleanupState;
		}
	};	

	that.get_name = function () {
		return name;
	};

	return that;
};

var cleanupState = function (my) {
	var name = 'Cleanup',
		that = deviceState(my);

	that.get_name = function () {
		return name;
	};

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

	that = {};

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
myDevice.adone();
myDevice.bdone();
