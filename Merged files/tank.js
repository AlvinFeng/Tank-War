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
        },
        onenterframe: function() {  
        }
    });