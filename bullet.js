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
        this.walls = this.currentScene.walls;

        x_delta = endx - startx;
        y_delta = endy - starty;
        total = Math.abs(x_delta) + Math.abs(y_delta);

        this.x_velocity = x_delta / total;
        this.y_velocity = y_delta / total;
    },
    onenterframe : function () {
        var tanks = this.currentScene.tanks;        

        if (this.x >  768 || this.y > 640) {
            this.currentScene.removeChild(this);
        }
        else if (this.x < 0 || this.y < 0) {
            this.currentScene.removeChild(this);
        }
        this.x += this.x_velocity * this.speed;
        this.y += this.y_velocity * this.speed;
        for(var i in tanks) {
            if(this.within(tanks[i], 20)) {
                tanks[i].die();
                tanks[i].remove();
                tanks.splice(i, 1);
                this.remove();
                
            }
        }


        for(var i in this.walls) {
            if(this.walls[i].intersect(this)) {
                this.num_bounces--;
                if(this.x  < this.walls[i].x) {
                    //bullet is left of wall
                    if(this.x_velocity > 0) {
                        //bullset is moving to the left
                        this.x_velocity *= -1;
                        //break;
                    }
                }
                else if(this.x > this.walls[i].x) {
                    //bullet is right of wall
                    if(this.x_velocity < 0) {
                        //bullet is moving to the right
                        this.x_velocity *= -1;
                        //break;
                    }
                }
                if(this.y > this.walls[i].y) {
                    //bullet is below block
                    if(this.y_velocity < 0) {
                        //bullet is moving upwards
                        this.y_velocity *= -1;
                        //break;
                    }
                }
                else if(this.y < this.walls[i].y) {
                    //bullet is above block
                    if(this.y_velocity > 0) {
                        //bullet is moving downwards
                        this.y_velocity *= -1;
                        //break;
                    }
                }
                break;
            }
        }

        if(this.num_bounces < 0) {
            this.currentScene.removeChild(this);
        }

    }

});

BulletUpgrade = enchant.Class.create(enchant.Sprite, {
    initialize: function (x, y, scene) {
        enchant.Sprite.call(this, 24, 32);
        this.image = game.assets['images/yellowbullet2.png'];
        this.x = x;
        this.y = y;
        this.currentScene = scene;
    },
    onenterframe : function () {
        if (this.intersect(this.currentScene.tankPlayer)) {
            console.log("Upgraded!");
        }
        if (this.rotation >= 355)
                this.rotation = 0;
            this.rotation++;
    }
});