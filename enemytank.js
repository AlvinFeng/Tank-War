tank = Class.create(Sprite, {
		initialize: function(x,y) {
            Sprite.call(this, 32, 32);
			this.image = game.assets['tank.png'];
			this.x=x;
            this.y=y;
			//3= down 9= left 15=right 21=up
			
			//ai turns
			this.mode=0;
			
			//movespeed
			this.moveSpeed=3;
			
			//set delay
			//this.addEventListener(Event.ENTER_FRAME,this.movement);
			
			game.rootScene.addChild(this);
		},
		
		onenterframe:function(){
			switch(this.mode)
			{
				case 0:
					action = random(4);
					delayT = random(30);
					this.delay=delayT;
					this.mode=action;
					break;
				//move left
				case 1:
					this.x=this.x-this.moveSpeed;
					this.delay--;
					if(this.delay==0)
					{
						this.mode=0;
					}
					this.frame=9;
					break;
				//move right
				case 2:
					this.x=this.x+this.moveSpeed;
					this.delay--;
					if(this.delay==0)
					{
						this.mode=0;
					}
					this.frame=15;
					break;
				//move up
				case 3:
					this.y=this.y-this.moveSpeed;
					this.delay--;
					if(this.delay==0)
					{
						this.mode=0;
					}
					this.frame=21;
					break;
				//move down
				case 4:
					this.y=this.y+this.moveSpeed;
					this.delay--;
					if(this.delay==0)
					{
						this.mode=0;
					}
					this.frame=3;
					break;
			}
		}
	});
	
    game.start();
};

function random(num){
    return Math.floor(Math.random()*num);   
}
