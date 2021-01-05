// Create PlayerMovement script.
var PlayerMovement = pc.createScript('PlayerMovement');
var obstacle;
// var itemCollected;
var UIstart;
var start;
var score0;
var score1;
var score2;
var score3;
var score4;
var score5;



// Add attributes to the script.
PlayerMovement.attributes.add('movementSpeed', {
    type: 'number',
    default: 0.025
});

PlayerMovement.attributes.add('movementMultiplier', {
    type: 'number',
    default: 5.0
});

PlayerMovement.attributes.add('jumpPower', {
    type: 'number',
    default: 200.0
});

PlayerMovement.attributes.add('raycastPlayerBase', {
    type: 'entity'
});

PlayerMovement.attributes.add('cameraEntity', {
    type: 'entity'
});

// Initialisation code, runs only once.
PlayerMovement.prototype.initialize = function() {
    start = false;
    UIstart = this.app.root.findByName('MainMenu');
    console.log('UI start on', UIstart);
    UIstart.enabled = true;
    // this.app.itemCollected;
    obstacle = this.app.root.findByTag('item');
    score0 = this.app.root.findByName('0per5');
    score1 = this.app.root.findByName('1per5');
    score2 = this.app.root.findByName('2per5');
    score3 = this.app.root.findByName('3per5');
    score4 = this.app.root.findByName('4per5');
    score5 = this.app.root.findByName('5per5');
   
    
    
    score0.enabled = true;
    score1.enabled = false;
    score2.enabled = false;
    score3.enabled = false;
    score4.enabled = false;
    score5.enabled = false;
    
    
    
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.eulers = new pc.Vec3();
    this.force = new pc.Vec3();
    this.jumping = {
        state: false
    };
    this.running = {
        state: false
    };
    
};
PlayerMovement.prototype.onCollisionStart =  function(result) {
    if(result.other.rigidbody && result.other.tags.has('item')){
        console.log("Colission");
        var i;
        for (i = 0; i < obstacle.length; i++) {
          if(obstacle[i].name == result.other.name)
              {
                  obstacle[i].destroy();

                  this.app.itemCollected +=1;
                  break;
                  // console.log(itemCollected);
              }
            }

        }
    };

// Update code, runs every frame.
PlayerMovement.prototype.update = function(dt) {
    // Get application reference.
    var app = this.app;
    
    // Get players force vector.
    var force = this.force;
    
    // Get camera direction vectors.
    var forward = this.cameraEntity.forward;
    var right = this.cameraEntity.right;
    
    // Movement logic. Listen for key presses and apply changes to directional vector components.
    var x = 0;
    var z = 0;
    // Item Collected Logic.
    if (this.app.itemCollected == 1){
        score0.enabled = false;
        score1.enabled = true;
    }
    
    if (this.app.itemCollected == 2){
        score0.enabled = false;
        score1.enabled = false;
        score2.enabled = true;
    }
    
    if (this.app.itemCollected == 3){
        score0.enabled = false;
        score1.enabled = false;
        score2.enabled = false;
        score3.enabled = true;
    }
    
    if (this.app.itemCollected == 4){
        score0.enabled = false;
        score1.enabled = false;
        score2.enabled = false;
        score3.enabled = false;
        score4.enabled = true;
    }
    
    //Win Logic
    if (this.app.itemCollected == 5){
        score0.enabled = false;
        score1.enabled = false;
        score2.enabled = false;
        score3.enabled = false;
        score4.enabled = false;
        score5.enabled = true;
        
    }
    
    
    if (app.keyboard.isPressed(pc.KEY_W) && start) {
        x += forward.x;
        z += forward.z;
    }
    if (app.keyboard.wasPressed(pc.KEY_ENTER)) {
        start = true;
    }
    
    if (app.keyboard.isPressed(pc.KEY_A) && start) {
        x -= right.x;
        z -= right.z;
    }
    
    if (app.keyboard.isPressed(pc.KEY_S) && start) {
        x -= forward.x;
        z -= forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D) && start) {
        x += right.x;
        z += right.z;
    }
    if (app.keyboard.wasPressed(pc.KEY_Q) && start) {
        console.log('ui start off');
        UIstart.enabled = false;
    }
    
    
    if (app.keyboard.isPressed(pc.KEY_SHIFT) && start) {
        this.running.state = true;
    } else {
        this.running.state = false;
    }
    
    // Jump code, checking if the space key was pressed instead of is pressed. This is important as we don't want to call the jump code multiple times.
    // We set a jump state to ensure that we can't jump whilst already jumping.
    // The jump power is passed in from the script attributes. This should be a high number.
    if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
        if (this.jumping.state === false) {
            this.entity.rigidbody.applyImpulse(0, this.jumpPower, 0);
            this.jumping.state = true;
        }
    } else if (this.jumping.state === true) {
        // If the raycast finds a collision, we assume it is an obect we can land on, we therefor reset our jump state so we can jump again.
        if (this._checkBelow() !== null) {
            this.jumping.state = false;
        }
    }
    
    // Convert x and z directional vector components to a force vector, normalise and then scale to the movement speed.
    if (x !== 0 || z !== 0) {
        this._rotatePlayer();
        
        x *= dt;
        z *= dt;
        
        if (this.running.state === true) {
            force.set(x, 0, z).normalize().scale(this.movementSpeed * this.movementMultiplier);
        } else {
            force.set(x, 0, z).normalize().scale(this.movementSpeed);
        }
        
        this.entity.translate(force);
        this.entity.rigidbody.applyForce(force);
        this.entity.rigidbody.syncEntityToBody();
    }
};

// Rotate the player to face the same direction as the camera angle.
PlayerMovement.prototype._rotatePlayer = function() {
    var targetY = this.cameraEntity.script.PlayerCameraMovement.eulers.x;
    var targetAngle = new pc.Vec3(0, targetY, 0);
    
    this.entity.setEulerAngles(targetAngle);
    this.entity.rigidbody.syncEntityToBody();
};

// Raycast for checking if there is an entity below with collision and rigid body components. Returns null if no collision.
// Make sure the scene has a entity to use as a raycast point at the base of your character.
PlayerMovement.prototype._checkBelow = function() {
    return this.app.systems.rigidbody.raycastFirst(this.entity.getPosition(), this.raycastPlayerBase.getPosition());
};