PlayerTank = Class.create(Tank,
    {
        initialize: function(x, y, chassiscolor, turretcolor) { //initialization
            Tank.call(this, x, y, chassiscolor, turretcolor);
            //game.assets["./assets/sounds/explosion.ogg"].play();
        },
        onenterframe: function() {  
         if(game.input.left){
                if (this.chassis.rotation <= 0) {
                    this.chassis.rotation = this.chassis.rotation%360;
                }
                this.chassis.rotation-=2;
            }
            if(game.input.right){
                if (this.chassis.rotation >= 360) {
                    this.chassis.rotation = this.chassis.rotation%360;
                }
                this.chassis.rotation+=2;
            }
            if(game.input.up){
                this.x += 2 * Math.cos((Math.PI * (this.chassis.rotation-90))/180);
                this.y += 2 * Math.sin((Math.PI * (this.chassis.rotation-90))/180);
            }
            if(game.input.down){
                this.x -= 2 * Math.cos((Math.PI * (this.chassis.rotation-90))/180);
                this.y -= 2 * Math.sin((Math.PI * (this.chassis.rotation-90))/180);
            }
        }
    });