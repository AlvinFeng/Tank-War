PlayerTank = Class.create(Tank,
    {
        initialize: function(x, y, chassiscolor, turretcolor, world) { //initialization
            Tank.call(this, x, y, chassiscolor, turretcolor, world);
            //game.assets["./assets/sounds/explosion.ogg"].play();
			this.movement=2;
			
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
		  
        }
    });