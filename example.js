var timerItem = pc.createScript('example');
timerItem.attributes.add('durationSecs', {type: 'number', title: 'Duration'});
timerItem.attributes.add('minimalXandZ', {type: 'number', title: 'Minimal'});
timerItem.attributes.add('maximumXandZ', {type: 'number', title: 'Maximum'});

// initialize code called once per entity
timerItem.prototype.initialize = function() {
    // this._paused = false;
    // this._timerHandle = pc.timer.add(this.durationSecs, this.moveToRandomPosition, this);
    // setTimeout(this.moveToRandomPosition, this.durationSecs);
    this.time = 0;
};


// update code called every frame
timerItem.prototype.update = function(dt) {
    this.time += dt;
    if(this.time > this.durationSecs){
        this.entity.rigidbody.teleport(pc.math.random(this.minimalXandZ, this.maximumXandZ), 0, pc.math.random(this.minimalXandZ, this.maximumXandZ));
        this.time -= this.durationSecs;
    }
    
//     if (this.app.keyboard.wasPressed(pc.KEY_P)) {
//         this._paused = !this._paused;
//         this.app.timeScale = this._paused ? 0 : 1;
//     }
    
//     if (this.app.keyboard.wasPressed(pc.KEY_R)) {
//         pc.timer.remove(this._timerHandle);
//     }
};


// timerItem.prototype.moveToRandomPosition = function () {
//     this.entity.setPosition(pc.math.random(-3, 3), 0, pc.math.random(-3, 3));
//     // console.log('rigidbody',this.entity.rigidbody);
//     // console.log('collision',this.entity.collision);
//     // this._timerHandle = pc.timer.add(this.durationSecs, this.moveToRandomPosition, this);
//     setTimeout(this.moveToRandomPosition, this.durationSecs);
// };

// swap method called for script hot-reloading
// inherit your script state here
// Example.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/