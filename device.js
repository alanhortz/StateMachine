var deviceState = function (my) {
	my = my || {};

	var name = 'Generic',
		that = {};	

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

	return that;
};

var processingState = function (my) {
	var name = 'Processing',
		that = deviceState(my);

	that.a = {}; // Is it really necessary ? How to deal with unassigned substates ?	
	that.b = {}; 

	that.adone = function () {
		a.adone();
	};
	that.bdone = function () {
		b.done();
	};

	return that;
};

var processAState = function (my) {
	var name = 'ProcessA',
		that = processingState(my);

	return that;
};

var processBState = function (my) {
	var name = 'ProcessB',
		that = processingState(my);

	return that;	
}; 

var a1State = function (my) {
	var name = 'A1',
		that = processAState(my);

	that.adone = function () {
		my.state.a = my.a2State;
		my.state.a.entry();
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

	return that;
};

var b1State = function (my) {
	var name = 'B1',
		that = processBState(my);

	that.bdone = function () {
		my.state.b = my.b2State;
		my.state.b.entry();
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

	return that;
};

var cleanupState = function (my) {
	var name = 'Cleanup',
		that = deviceState(my);

	return that;
};

