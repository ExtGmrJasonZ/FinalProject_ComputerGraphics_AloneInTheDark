var Instructions = pc.createScript('menu');
var info;
var ui;

// initialize code called once per entity
Instructions.prototype.initialize = function() {
    var app = this.app;
    info = this.app.root.findByName('Info');
    ui = this.app.root.findByName('MainMenu');
    info.enabled = false;
    ui.enabled = true;
};

// update code called every frame
Instructions.prototype.update = function(dt) {
    
    var app = this.app;
    
    if(this.app.keyboard.wasPressed(pc.KEY_I)){
        if(info.enabled){
            info.enabled = false;

            }
        else {
            info.enabled = true;
        }
    } 
    if(this.app.keyboard.wasPressed(pc.KEY_ENTER)){
        ui.enabled = false;
        this.app.isTime = true;
    }


};

// swap method called for script hot-reloading
// inherit your script state here
// Menu.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/