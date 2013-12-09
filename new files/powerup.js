Powerup = enchant.Class.create(enchant.Sprite, 
{
	initialize: function(x,y,type,scene){
		enchant.Sprite.call(this,64,64);
		this.image = game.assets['images/' + 'powerup.png'];
		if(type==0)
		{
			this.frame = 0;
		}
		if(type==1)
		{
			this.frame=1;
		}
		this.type=type;
		this.x = x;
		this.y = y;
		this.currentScene = scene;
	},
	onenterframe : function () {

        if (this.rotation >= 355)
                this.rotation = 0;
            this.rotation++;
    }

	
});