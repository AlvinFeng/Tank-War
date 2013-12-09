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
            if (this.within(this.currentWorld.playerTank, 30)) {
                this.currentScene.removeChild(this);
                game.assets['sounds/upgrade.wav'].play();
				if(this.type==0)
				{
				
				}
				if(this.type==1)
				{
					this.currentScene.playerTank.movement++;
					this.currentScene.playerTank.movement++;
				}
            }
        if (this.rotation >= 355)
                this.rotation = 0;
            this.rotation++;
    }

	
});