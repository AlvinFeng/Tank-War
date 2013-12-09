PlayerTank = Class.create(Tank,
    {
        initialize: function(x, y, chassiscolor, turretcolor, world) { //initialization
            Tank.call(this, x, y, chassiscolor, turretcolor, world);
            //game.assets["./assets/sounds/explosion.ogg"].play();
			this.movement=2;
			
<<<<<<< HEAD
			lifeLabel = new enchant.Label("");
			lifeLabel.color = "blue"
            lifeLabel.x = 950;
            lifeLabel.y = 580;
			lifeLabel.scale(3,3);
			
			game.currentScene.addChild(lifeLabel);

            this.fire_wrapper = function(x, y) {
                this.fire(x, y, this);
            }
			
=======
>>>>>>> 2b21c0e1002e03e410f9e7c639af6d62bdd8deb7
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