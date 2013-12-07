Bullet = enchant.Class.create(enchant.Sprite, {
    initialize: function (startx, endx, starty, endy, speed, num_bounces, world, scene, color) {
        enchant.Sprite.call(this, 16, 16);
        //this.image = game.assets['images/' + color + 'bullet.png'];
        this.image = game.assets['images/yellowbullet.png'];
        this.x = startx;
        this.y = starty;
        this.speed = speed;
        this.num_bounces = num_bounces;
        this.frame = 3;
        this.world = world;
        this.currentScene = scene;

        x_delta = endx - startx;
        y_delta = endy - starty;
        total = Math.abs(x_delta) + Math.abs(y_delta);

        this.x_velocity = x_delta / total;
        this.y_velocity = y_delta / total;

        /*this.addEventListener('enterframe', function() {
            this.x += this.x_velocity * this.speed;
            this.y += this.y_velocity * this.speed;

            var tanks = scene.tanks;
            for(var i in tanks) {
                if(tanks[i].intersect(parent)) {
                    if(tanks[i] != player) {
                        console.log("hitting!");
                        tanks[i].die();
                        tanks[i].remove();

                        tanks.splice(i, 1);
                        this.remove();
                    }
                }
            }*/
/*
            for(var i in walls) {
                if(walls[i].intersect(this)) {
                    this.num_bounces--;
                    if(this.x  < walls[i].x) {
                        //bullet is left of wall
                        if(this.x_velocity > 0) {
                            //bullset is moving to the left
                            this.x_velocity *= -1;
                            //break;
                        }
                    }
                    else if(this.x > walls[i].x) {
                        //bullet is right of wall
                        if(this.x_velocity < 0) {
                            //bullet is moving to the right
                            this.x_velocity *= -1;
                            //break;
                        }
                    }
                    if(this.y > walls[i].y) {
                        //bullet is below block
                        if(this.y_velocity < 0) {
                            //bullet is moving upwards
                            this.y_velocity *= -1;
                            //break;
                        }
                    }
                    else if(this.y < walls[i].y) {
                        //bullet is above block
                        if(this.y_velocity > 0) {
                            //bullet is moving downwards
                            this.y_velocity *= -1;
                            //break;
                        }
                    }
                    break;
                }
            }*/

            if(this.num_bounces < 0) {
                //this.remove();
            }

        
        
    },
    onenterframe : function () {
        

        var tanks = this.currentScene.tanks;
        for(var i in tanks) {
            //console.log("Bullet (x,y)  tank (x, y) " + this.x, + " " + this.y + " (" + tanks[i].x + " " + tanks[i].y + ")");
            if(this.intersect(tanks[i])) {
                console.log("firing");
                if(tanks[i] != player) {
                    console.log("hitting!");
                    tanks[i].die();
                    tanks[i].remove();

                    tanks.splice(i, 1);
                    this.remove();
                }
            }
        }

        if (this.x >  768 || this.y > 640) {
            this.currentScene.removeChild(this);
        }
        else if (this.x < 0 || this.y < 0) {
            this.currentScene.removeChild(this);
        }
        this.x += this.x_velocity * this.speed;
        this.y += this.y_velocity * this.speed;
    }

});