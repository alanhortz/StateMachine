var inherit = (function () {
    function F() {}
    return function (child, parent) {
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.superproto = parent.prototype;
        return child;
    };
})();
function State() {}
State.prototype = (function () {
    function entry() {}
    function exit() {}
})();

function OpenState(context) {
    this.context = context;
}
inherit(OpenState, State);
OpenState.prototype = (function () {
   
    
    function entry() {
        console.log('Entering Open state');
    }
    function exit() {
        console.log('Exit from Open state');
    }
    function close() {
        this.exit();
        this.context.state = this.context.stateClosed;
        this.context.state.entry();
    }
})();
function ClosedState(context) {
    this.context = context;
}
inherit(ClosedState, State);
ClosedState.prototype = (function () {
    
    
    
    function entry() {
        console.log('Entering Closed state');
    }
    function exit() {
        console.log('Exiting the Closed state');
    }

    function open() {
        console.log(this.context);
        if(this.context.locked === false)
        {
            this.exit();
            this.context.state = this.context.stateOpen;
            this.context.state.entry();       
        }
    }
    function lock() {
        this.context.locked = true;                   
    }
    function unlock() {
        this.context.locked = false;
    }

    return {
     constructor: ClosedState,
     open: open
    };
})();

function Door() {}
Door.prototype = (function () {
    var stateOpen = new OpenState(this);
    var stateClosed = new ClosedState(this);
    var state = stateClosed;
    
    function open() {
        state.open();
    }
    
    return {
        constructor: Door,
        state: stateOpen,
        stateOpen: stateOpen,
        stateClosed: stateClosed,
        open: open,
        close: state.close,
        locked: true
    }
})();

console.log('start');
var door = new Door();
door.open();