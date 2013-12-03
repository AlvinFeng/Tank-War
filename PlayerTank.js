Player = Class.create(Sprite,
    {
        initialize: function(x, y, scene) { //initialization
            Sprite.call(this, 32, 32); //initialization of the Sprite object
            this.image = game.assets['./assets/images/chara3.png'];
            this.frame = 12;
            this.x = x;
            this.y = y;
            scene.addChild(this);
            this.animCounter = 0;
            //game.assets["./assets/sounds/explosion.ogg"].play();
        },
        onenterframe: function() {  
         if(game.input.left && this.x >= 0){
                if (this.rotation == 0) {
                    this.rotation = 360;
                }
                this.rotation--;
            }
            if(game.input.right && this.x <= 320){
                if (this.rotation == 360) {
                    this.rotation = 0;
                }
                this.rotation++;
            }
            if(game.input.up && this.y >= 0){
                this.x += 1 * Math.cos((Math.PI * this.rotation)/180);
                this.y += 1 * Math.sin((Math.PI * this.rotation)/180);
            }
            if(game.input.down && this.y <= 320){
                this.x -= 1 * Math.cos((Math.PI * this.rotation)/180);
                this.y -= 1 * Math.sin((Math.PI * this.rotation)/180);
            }          
        }
    });