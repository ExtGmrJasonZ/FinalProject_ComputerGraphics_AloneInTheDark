var Game = pc.createScript('game');

// initialize code called once per entity
Game.prototype.initialize = function() {
    this.app.itemCollected = 0;
    this.app.isTime = false;
};

// update code called every frame
Game.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Game.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/