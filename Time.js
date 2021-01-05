var Time = pc.createScript('time');
Time.attributes.add('Time', {type: 'number', default: 150});
var endsound;
var sfxkalah;
// Time.attributes.add('isTime',     {type: 'boolean', default: false});

// var wingame;
// var losegame;
    

// initialize code called once per entity
Time.prototype.initialize = function() {
    sfxkalah = this.app.root.findByName('Sound');
    sfxkalah.enabled = false;
    endsound = this.app.root.findByName('HorrorBGM');
    ResTime   = this.Time;
    this.reset();

};

Time.prototype.reset = function() {
    // this.isTime = false;
    
    this.app.root.findByName('Menue').findByName('TextTime').element.text  = Math.round(this.Time);
    Time = this.Time;
    // buat yg ulang
    
    wingame = this.app.root.findByName('WIN').findByName('wingame').enabled = false;
    losegame = this.app.root.findByName('LOSE').findByName('losegame').enabled = false;
    // jumpscare = this.app.root.findByName('LOSE').findByName('Sound');
    
    
    
    // wingame = false;
    // losegame = false;
};

// update code called every frame
Time.prototype.update = function(dt) {
    if(this.app.root.findByName('MainMenu').enabled === false){
        
         if(Time <= 0){
            // this.app.root.findByName('Menue').findByName('GameOver').enabled = true;
            this.app.isTime = false;
            // this.app.root.findByName('MainMenu').enabled = true;
            //Win logic
            endsound.sound.stop('SoundTrack');
        
            this.app.root.findByName('LOSE').findByName('losegame').enabled = true;
            sfxkalah.enabled = true;
             
                // setTimeout(function(){
               
               // this.reset();
               // window.location.reload();
               // }, 1000);  
            
            //Lose logic
            //(this.app.root.findByTag('item') > 0 && Time <= 0)
             
        } else {
            if(this.app.isTime === true){
                Time = Time - dt;
            }
            if(this.app.itemCollected == 5){
                this.app.isTime = false;
                console.log('halo', this.app.itemCollected);
                this.app.root.findByName('WIN').findByName('wingame').enabled = true;
                setTimeout(function(){
                // this.reset();
                window.location.reload();
                }, 1000);
                
            }
        }
    
    }
    this.app.root.findByName('Menue').findByName('TextTime').element.text = Math.round(Time);
    
    
   
   
        
};

// swap method called for script hot-reloading
// inherit your script state here
// Time.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/