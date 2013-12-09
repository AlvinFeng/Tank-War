PlayerTank = Class.create(Tank,
    {
        initialize: function(x, y, chassiscolor, turretcolor, world) { //initialization
            Tank.call(this, x, y, chassiscolor, turretcolor, world);
            //game.assets["./assets/sounds/explosion.ogg"].play();
        },
        
        onenterframe: function() {  
         if(game.input.left){
                this.rotate(-2);
            }
            if(game.input.right){
                this.rotate(2);
            }
            if(game.input.up){
                this.move(2);
            }
            if(game.input.down){
                this.move(-2);
          }
        }
    });