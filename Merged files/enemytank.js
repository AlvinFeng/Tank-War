EnemyTank = Class.create(Tank, {
	initialize: function(x,y,chassisColor,turretColor,world) {
        Tank.call(this, x, y, chassisColor, turretColor,world);
		//ai turns
		this.mode=0;
		this.turretMode=0;			

		//movespeed
		this.moveSpeed=2;
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
			//rotate clockwise
			case 1:
				this.rotate(2);
				this.delay--;
				if(this.delay<=0)
				{
					this.mode=0;
				}
				break;
			//rotate anti-clockwise
			case 2:
				this.rotate(-2);
				this.delay--;
				if(this.delay<=0)
				{
					this.mode=0;
				}
				break;
			//move foward
			case 3:
				this.move(2);
				this.delay--;
				if(this.delay<=0)
				{
					this.mode=0;
				}
				break;
			//move backwards
			case 4:
				this.move(-2);
				this.delay--;
				if(this.delay<=0)
				{
					this.mode=0;
				}
				break;
		}
		switch(this.turretMode)
		{
			case 0:
				action = random(2);
				delayT = random(30);
				this.turretDelay=delayT;
				this.turretMode=action;
				break;
			//rotate clockwise
			case 1:
				this.rotateTurret(2);
				this.turretDelay--;
				if(this.turretDelay<=0)
				{
					this.turretMode=0;
				}
				break;
			//rotate anti-clockwise
			case 2:
				this.rotateTurret(-2);
				this.turretDelay--;
				if(this.turretDelay<=0)
				{
					this.turretMode=0;
				}
				break;
		}
	}
});
	
function random(num){
    return Math.floor(Math.random()*num);   
}
