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
		  lifeLabel.text= "Life: "+ this.hp;
		  
        }
    });