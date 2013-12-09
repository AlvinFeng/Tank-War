Bullet = enchant.Class.create(enchant.Sprite, {
    initialize: function (startx, starty, direction, speed, num_bounces, world, color, owner) {
        enchant.Sprite.call(this, 24, 32);

        this.image = game.assets['images/' + color + 'bullet.png'];
        if (Bullet.upgradeLevel == 1)
            this.image = game.assets['images/yellowbullet.png'];
        if (Bullet.upgradeLevel == 2)
            this.image = game.assets['images/yellowbullet2.png'];
        if (Bullet.upgradeLevel == 3)
            this.image = game.assets['images/yellowbullet3.png'];
        
        this.x = startx;
        this.y = starty;
        this.speed = speed;
        this.num_bounces = num_bounces;
        this.world = world;
        this.rotation = direction;
        this.owner = owner;
        this.world.bullets.push(this);

        this.collisionPointsOffsetX = [11,11];
        this.collisionPointsOffsetY = [8,22];

        this.x_velocity = speed * Math.cos( ((direction-90)/180)*Math.PI );
        this.y_velocity = speed * Math.sin( ((direction-90)/180)*Math.PI );

        this.move = function()
        {
            var nextx = this.x + this.x_velocity;; 
            var nexty = this.y + this.y_velocity; 

            var aux = this.getPositionOfCollisionPoint(0);
            var result = this.world.checkCollision(this.x+aux[0],this.y+aux[1], nextx + aux[0], nexty + aux[1]); 
            if(result[0]==true)
            {
                nextx = nextx - (nextx + aux[0]) + result[1];
                nexty = nexty - (nexty + aux[1]) + result[2];
                this.num_bounces--;
                switch(result[3])
                {
                    case 0: // collided with the bottom side
                        this.y_velocity=-this.y_velocity;
                    break;
                    case 1: // collided with the left side
                        this.x_velocity=-this.x_velocity;
                    break;
                    case 2:// collided with the top side
                        this.y_velocity=-this.y_velocity;
                    break;
                    case 3:// collided with the right side
                        this.x_velocity=-this.x_velocity;
                    break;
                }

                this.rotation = Math.atan( (this.y_velocity/this.x_velocity)) *(180/Math.PI) + 90;
                if(this.x_velocity<0)
                    this.rotation+=180

                if (result[5] - 1 >= 0 && result[4] - 1 >= 0 && result[5] - 1 < 8 && result[4] - 1 < 10) {
                    this.world.removeDestructibleTile(result[5] - 1, result[4] - 1);
                    this.remove();
                    GameScene.bulletCount--;
                }
            }
            this.x=nextx;
            this.y=nexty;
        }  

        this.getPositionOfCollisionPoint = function(index)
        {
            var coordX, coordY;

            coordX = 12 + (this.collisionPointsOffsetX[index]-12) * Math.cos(Math.PI*(this.rotation)/180) - 
                          (this.collisionPointsOffsetY[index]-16) * Math.sin(Math.PI*(this.rotation)/180);
            coordY = 16 + (this.collisionPointsOffsetX[index]-12) * Math.sin(Math.PI*(this.rotation)/180) +
                          (this.collisionPointsOffsetY[index]-16) * Math.cos(Math.PI*(this.rotation)/180);

            return [coordX, coordY];
        }
    },
    onenterframe : function () {

        // Collision with tanks

        for(var i in this.world.bullets) {
            if(this.world.bullets[i] != this) {
                if(this.within(this.world.bullets[i], 10)) {
                    GameScene.bulletCount--;
                    this.world.bullets[i].remove();
                    this.world.bullets.splice(this.world.bullets.indexOf(this), 1);
                    this.world.bullets.splice(i, 1);
                    GameScene.bulletCount--;
                    this.remove();
                }
            }
        }
        for(var i in this.world.enemyTanks) {
            if(this.owner != this.world.enemyTanks[i] || this.age > 25) {
    			if(this.within(this.world.enemyTanks[i], 20)) {
    				if(this.world.enemyTanks[i].hp>1)
    				{
                        if (Bullet.upgradeLevel == 2) {
                            this.world.enemyTanks[i].hp-=2;
                        }
                        else if (Bullet.upgradeLevel == 3) {
                            this.world.enemyTanks[i].hp-=3;
                        }
                        else {
        					this.world.enemyTanks[i].hp--;
                        }
    				}
    				else
    				{
    					var blast=new Blast(this.x,this.y,world);
    					game.currentScene.addChild(blast);
    					game.assets['sounds/explosion.wav'].play();
						game.score++;
    					this.world.enemyTanks[i].die();
    					this.world.enemyTanks[i].remove();
    					this.world.enemyTanks.splice(i, 1);
    				}
                    this.world.bullets.splice(this.world.bullets.indexOf(this), 1);
                    GameScene.bulletCount--;
                    this.remove();
                    
                }
            }
        }

        if(this.owner != this.world.playerTank || this.age > 25) {
            if(this.within(this.world.playerTank, 20)) {
                
                if (Bullet.upgradeLevel == 2) {
                    this.world.playerTank.hp-=2;
                    game.hp -=2;
                }
                else if (Bullet.upgradeLevel == 3) {
                    this.world.playerTank.hp-=3;
                    game.hp -=3;
                }
                else {
                    this.world.playerTank.hp--;
                    game.hp --;
                }

                var blast=new Blast(this.world.playerTank.x, this.world.playerTank.y,world);
                game.currentScene.addChild(blast);
                game.assets['sounds/explosion.wav'].play();
                
                this.world.bullets.splice(this.world.bullets.indexOf(this), 1);
                GameScene.bulletCount--;
                this.remove();
                if (this.world.playerTank.hp < 0) {
                    game.popScene();
                }
            }
        }

        this.move();

        if(this.num_bounces < 0) {
            this.world.bullets.splice(this.world.bullets.indexOf(this), 1);
            GameScene.bulletCount--;
            this.world.removeChild(this);            
        }
    }
});

BulletUpgrade = enchant.Class.create(enchant.Sprite, {
    initialize: function (x, y, level, world) {
        enchant.Sprite.call(this, 24, 32);
        this.level = level;
        if (level == 1)
            this.image = game.assets['images/yellowbullet.png'];
        if (level == 2)
            this.image = game.assets['images/yellowbullet2.png'];
        if (level == 3)
            this.image = game.assets['images/yellowbullet3.png'];            
        this.x = x;
        this.y = y;
        this.world = world;
    },
    onenterframe : function () {
        if (!BulletUpgrade.TitleScreen){
            if (this.within(this.world.playerTank, 30)) {
                this.world.removeChild(this);
                if (this.level == 2)
                    Bullet.upgradeLevel = 2;
                if (this.level == 3)
                    Bullet.upgradeLevel = 3;
            }
        }
        this.rotation++;
        if (this.rotation >= 360)
            this.rotation = this.rotation%360;
    }
});
