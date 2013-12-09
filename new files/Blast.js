var Blast= enchant.Class.create(enchant.Sprite,{
	initialize: function(x,y,world,scene)
	{
		enchant.Sprite.call(this,16,16);
		this.x=x+19;
		this.y=y+19;
		this.image=game.assets['images/effect0.gif'];
		this.frame=0;
		this.duration=30;
		this.world = world;
		this.currentScene = scene;
		
		this.addEventListener('enterframe',function(){
			this.frame= Math.floor(this.age/this.duration*5);
			if(this.age==this.duration)this.remove();
		})
	},
	remove: function(){
		this.currentScene.removeChild(this)
	}
});