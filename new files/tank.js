Tank = enchant.Class.create(enchant.Group, 
    {
        initialize: function(x, y, chassiscolor, turretcolor, world) { //initialization
            enchant.Group.call(this); //initialization of the Group object

            this.chassis = new Sprite(64,64);
            this.chassis.image = game.assets['images/' + chassiscolor + 'tank.png'];
            this.chassis.frame = 0;
            this.addChild(this.chassis);

            this.turret = new Sprite(64,64);
            this.turret.image = game.assets['images/' + turretcolor + 'tank.png'];
            this.turret.frame = 1;
            this.addChild(this.turret);
            this.hit = false;
            this.hit_frame = 0;
            this.flash_count = 0;
			
			this.hp=3;
			
            this.world = world;
            this.collided = false;

            this.x = x;
            this.y = y;
            this.width = this.chassis.width;
            this.height = this.chassis.height;

            this.collisionPointsOffsetX=[19, 44, 19, 44, 31, 31, 25, 25, 38, 38, 19, 44];
            this.collisionPointsOffsetY=[13, 13, 50, 50, 13, 50, 13, 50, 13, 50, 38, 38];

            this.rotate = function(value)
            {
                var previousCollisionPointsX = [];
                var previousCollisionPointsY = [];
                for(var i =0;i<12;i++)
                {
                    var aux = this.getPositionOfCollisionPoint(i);
                    previousCollisionPointsX[i] = aux[0]+this.x;
                    previousCollisionPointsY[i] = aux[1]+this.y;
                }

                if ((this.chassis.rotation >= 360)||(this.chassis.rotation <= 0)) {
                    this.chassis.rotation = this.chassis.rotation%360;
                }
                this.chassis.rotation+=value;

                var currentCollisionPointsX = [];
                var currentCollisionPointsY = [];

                for(var i =0;i<12;i++)
                {
                    var aux = this.getPositionOfCollisionPoint(i);
                    currentCollisionPointsX[i] = aux[0]+this.x;
                    currentCollisionPointsY[i] = aux[1]+this.y;

                    var result = this.world.checkCollision(previousCollisionPointsX[i], previousCollisionPointsY[i], 
                                                            currentCollisionPointsX[i], currentCollisionPointsY[i]); 

                    this.collided = result[0];
                    if(result[0]==true)
                    {    
                        this.x = this.x- (this.x+ aux[0]) + result[1];
                        this.y = this.y - (this.y + aux[1]) + result[2];
                    }
                }
            }

            // maybe this rotation should be linked to the chassis turret
            this.rotateTurret = function(value)
            {
                if ((this.turret.rotation >= 360)||(this.turret.rotation <= 0)) {
                    this.turret.rotation = this.turret.rotation%360;
                }
                this.turret.rotation+=value;
            }

            this.move = function(value)
            {
                var nextx = this.x + value * Math.cos((Math.PI * (this.chassis.rotation-90))/180); 
                var nexty = this.y +value * Math.sin((Math.PI * (this.chassis.rotation-90))/180); 

                for(var i =0;i<12;i++)
                {
                   var aux = this.getPositionOfCollisionPoint(i);
                   var result = this.world.checkCollision(this.x+aux[0],this.y+aux[1], nextx + aux[0], nexty + aux[1]); 

                   this.collided = result[0];
                   if(result[0]==true)
                   {    
                        nextx = nextx - (nextx + aux[0]) + result[1];
                        nexty = nexty - (nexty + aux[1]) + result[2];
                   }
                }
                this.x=nextx;
                this.y=nexty;
            }  

            this.getPositionOfCollisionPoint = function(index)
            {
                var coordX, coordY;

                coordX = 32 + (this.collisionPointsOffsetX[index]-32) * Math.cos(Math.PI*(this.chassis.rotation)/180) - 
                              (this.collisionPointsOffsetY[index]-32) * Math.sin(Math.PI*(this.chassis.rotation)/180);
                coordY = 32 + (this.collisionPointsOffsetX[index]-32) * Math.sin(Math.PI*(this.chassis.rotation)/180) +
                              (this.collisionPointsOffsetY[index]-32) * Math.cos(Math.PI*(this.chassis.rotation)/180);

                return [coordX, coordY];
            }

            this.scale = function (x, y) 
            {
                this.chassis.scale(x,y);
                this.turret.scale(x,y);
            }

            this.rotateWholeTank = function (rotate) 
            {
                this.chassis.rotate(rotate);
                this.turret.rotate(rotate);
            }

            this.fire = function(x,y,owner)
            {
                this.turret.rotation = Math.atan( (y-(this.y + 18))/(x-(this.x + 21) )) *(180/Math.PI) + 90;
                if(x<(this.x + 21))
                    this.turret.rotation+=180
                var bullet = new Bullet(this.x + 21, this.y + 18, this.turret.rotation, 5, 5, this.world, "yellow", owner);
                this.world.addChild(bullet);
            }
        },
        onenterframe: function() {  
            Console.log("enter frame");
            if(this.hit == true) {
                console.log("this has been hit");
                if((this.age - this.hit_frame) > 4) {
                    console.log("Flashing");
                    this.hit_frame = this.age;
                    //flash
                    if(this.opacity != 0) {
                        this.opacity = 0;
                    }
                    else {
                        this.opacity = 100;
                    }
                    this.flash_count++;
                }
                if(this.flash_count == 5) {
                    this.flash_count = 0;
                    this.hit = false;
                }
            }
        }
    });