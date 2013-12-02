
enchant();

window.onload = function () {
    game = new Game(320, 320);
    game.fps = 24;

    game.score = 0;
    game.touched = false;

    game.preload('tank.png');
    game.preload('graphic.png');
    game.preload('map.png');

    game.onload = function() {
        player = new Tank(50, 50);
        walls = new Array();
        walls.push(new Wall(150, 150, true));
        tanks = new Array();
        tanks.push(player);
        tanks.push(new Tank(250, 250));
        tanks.push(new Tank(135, 250));
        tanks.push(new Tank(250, 135));
        tanks.push(new Tank(210, 200));

        for(var i = 0; i < this.height / 16; i++) {
            walls.push(new Wall(0, i * 16, false));
            walls.push(new Wall(this.height - 16, i * 16, false));
            walls.push(new Wall(i * 16, 0, false));
            walls.push(new Wall(i * 16, this.height - 16, false));
        }

        game.rootScene.addEventListener('touchend', function (e) {
            var s = new Bullet(player.x, e.x, player.y, e.y, 10, 10);
        });
    }
    game.start();
};

var Tank = enchant.Class.create(enchant.Sprite, {

    initialize: function (x, y) {
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['tank.png'];
        this.x = x;
        this.y = y;
        this.frame = 0;

        game.rootScene.addChild(this);
    }
});

var Bullet = enchant.Class.create(enchant.Sprite, {
    initialize: function (startx, endx, starty, endy, speed, num_bounces) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['graphic.png']
        this.x = startx;
        this.y = starty;
        this.speed = speed;
        this.num_bounces = num_bounces;
        this.frame = 3;

        x_delta = endx - startx;
        y_delta = endy - starty;
        total = Math.abs(x_delta) + Math.abs(y_delta);

        this.x_velocity = x_delta / total;
        this.y_velocity = y_delta / total;

        this.addEventListener('enterframe', function() {
            this.x += this.x_velocity * this.speed;
            this.y += this.y_velocity * this.speed;

            for(var i in tanks) {
                if(tanks[i].intersect(this)) {
                    if(tanks[i] != player) {
                        tanks[i].remove();
                        tanks.splice(i, 1);
                        this.remove();
                    }
                }
            }

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
            }

            if(this.num_bounces < 0) {
                this.remove();
            }
        });

        game.rootScene.addChild(this);
    },

    remove: function() {
        game.rootScene.removeChild(this);
        delete this;
    }
});

var Wall = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, destructible) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['map.png']
        this.frame = 3;
        this.x = x;
        this.y = y;
        this.destructible = destructible;

        game.rootScene.addChild(this);
    },

    remove: function() {
        game.rootScene.removeChild(this);
        delete this;
    }
});