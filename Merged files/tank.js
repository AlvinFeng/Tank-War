Tank = enchant.Class.create(enchant.Group,
    {
        initialize: function(x, y, chassiscolor, turretcolor) { //initialization
            enchant.Group.call(this); //initialization of the Group object

            this.chassis = new Sprite(64,64);
            this.chassis.image = game.assets['images/' + chassiscolor + 'tank.png'];
            this.chassis.frame = 0;
            this.addChild(this.chassis);

            this.turret = new Sprite(64,64);
            this.turret.image = game.assets['images/' + turretcolor + 'tank.png'];
            this.turret.frame = 1;
            this.addChild(this.turret); 

            this.x = x;
            this.y = y;

            this.rotate = function(value)
            {
                if ((this.chassis.rotation >= 360)||(this.chassis.rotation <= 0)) {
                    this.chassis.rotation = this.chassis.rotation%360;
                }
                this.chassis.rotation+=value;
            }

            this.move = function(value)
            {
                this.x += value * Math.cos((Math.PI * (this.chassis.rotation-90))/180);
                this.y += value * Math.sin((Math.PI * (this.chassis.rotation-90))/180); 
            }
        },
        onenterframe: function() {  
        }
    });