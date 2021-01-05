var PlayerAnimation = pc.createScript('playerAnimation');
var start;
var player;
PlayerAnimation.states = {
    Idle: { 
        animation: 'Idle.glb' 
    },
     JogForwardLeft: { 
        animation: 'Run Forward Left.glb' 
    },
     JogForwardRight: { 
        animation: 'Run Forward Right.glb' 
    },
     JogForward: { 
        animation: 'Run Forward.glb' 
    },
     JogBackwardLeft: { 
        animation: 'Run Backward Left.glb' 
    },
     JogBackwardRight: { 
        animation: 'Run Backward Right.glb' 
    },
     JogBackward: { 
        animation: 'Run Backward.glb' 
    },
     JogLeft: { 
        animation: 'Run Left.glb' 
    },
    JogRight: { 
        animation: 'Run Right.glb' 
    }
};
// Define script-scoped variables.
var direction = 'Idle';

// Add attributes to the script.
PlayerAnimation.attributes.add('blendDuration', {
    type: 'number',
    default: 0.25
});

// Initialisation code, runs only once.
PlayerAnimation.prototype.initialize = function() {
    player = this.app.root.findByName('Player');
    start = player.script.PlayerMovement.start;
    var app = this.app;
    
    // Listeners for key up/down events. Fires a callback function to handle player animations.
    app.keyboard.on(pc.EVENT_KEYDOWN, this._keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this._keyChange, this);
    
    this.setState(direction);
};

// Update code, runs every frame.
PlayerAnimation.prototype.update = function(dt) {
    // Any code that needs to run such as timers for idle time or what not goes in here.
    console.log('has game started?',start);
};

// Setter function for player state. Function also serves to change animation on state change. Animation blend duration is set from an attribute.
PlayerAnimation.prototype.setState = function(state) {
    var states = PlayerAnimation.states;

    this.state = state;
    this.entity.animation.play(states[state].animation, this.blendTime);
};

// Direction logic, different combination of key inputs define different directions.
PlayerAnimation.prototype._checkKey = function() {
    var app = this.app;
    
    if (app.keyboard.isPressed(pc.KEY_W) && app.keyboard.isPressed(pc.KEY_S) === false && start) {
        if (app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_D) === false && start) {
            direction = ('JogForwardLeft');
        } else if (app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_A) === false && start) {
            direction = ('JogForwardRight');
        } else {
            direction = ('JogForward');
        }
    } else if (app.keyboard.isPressed(pc.KEY_S) && app.keyboard.isPressed(pc.KEY_W) === false && start) {
        if (app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_D) === false && start) {
            direction = ('JogBackwardLeft');
        } else if (app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_A) === false && start) {
            direction = ('JogBackwardRight');
        } else {
            direction = ('JogBackward');
        }
    } else if (app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_D) === false && start) {
        direction = ('JogLeft');
    } else if (app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_A) === false && start) {
        direction = ('JogRight');
    } else if(start) {
        direction = ('Idle');
    }
};

// Callback function to check if the direction has changed since a key down/up event.
PlayerAnimation.prototype._keyChange = function(e) {
    var previousDirection = direction;
    
    this._checkKey();
    
    if (previousDirection !== direction) {
        this.setState(direction);
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// PlayerAnimation.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/