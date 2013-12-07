Powerup = enchant.Class.create(enchant.Group, 
    {
		initialize: function(x,y,type,world){
			enchant.Group.call(this);
			this.up = new Sprite(64,64);
            this.up.image = game.assets['images/' + 'powerup.png'];
			if(type==1)
			{
				this.up.frame = 0;
			}
			if(type==2)
			{
				this.up.frame=1;
			}
            this.addChild(this.up);
			
			this.world = world;

            this.x = x;
            this.y = y;	
		},
		
    });