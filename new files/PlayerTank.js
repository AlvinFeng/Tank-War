PlayerTank = Class.create(Tank,
    {
        initialize: function(x, y, chassiscolor, turretcolor, world) { //initialization
            Tank.call(this, x, y, chassiscolor, turretcolor, world);
            //game.assets["./assets/sounds/explosion.ogg"].play();
			this.movement=2;
			
			lifeLabel = new enchant.Label("");
			lifeLabel.color = "blue"
            lifeLabel.x = 950;
            lifeLabel.y = 580;
			lifeLabel.scale(3,3);
			
			game.currentScene.addChild(lifeLabel);

            this.fire_wrapper = function(x, y) {
                this.fire(x, y, this);
            }
			
        },
        
        onenterframe: function() {  
         if(game.input.left){
                this.rotate(-2);
            }
            if(game.input.right){
                this.rotate(2);
            }
            if(game.input.up){
                this.move(this.movement);
            }
            if(game.input.down){
                this.move(-this.movement);
          }
            if(this.hit == true) {
                console.log("this has been hit");
                if((this.age - this.hit_frame) > 4) {
                    console.log("Flashing");
                    this.hit_frame = this.age;
                    //flash
                    if(this.turret.opacity != 0) {
                        console.log("turret opacity set to 0");
                        this.turret.opacity = 0;
                        this.chassis.opacity = 0;
                    }
                    else {
                        console.log("turret opacity set to 100");
                        this.turret.opacity = 100;
                        this.chassis.opacity = 100;
                    }
                    this.flash_count++;
                }
                if(this.flash_count > 5) {
                    this.flash_count = 0;
                    this.hit = false;
                    this.turret.opacity = 100;
                    this.chassis.opacity = 100;
                }
            }
            if(this.flash_count > 5) {
                this.hit = false;
            }
		  
        }
    });