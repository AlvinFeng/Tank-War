score= Class.create(Label,{
	initialized:function(x,y){
		this.x=x;
		this.y=y;
		this.color="white";
		enchant.Label.call(this, "Enemies Killed: 0");
	},
	remove:function()
	{
		this.score++;
		this.text="Enemies Killed: " + this.score;
	}
});