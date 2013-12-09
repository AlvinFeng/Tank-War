EnemyTank = Class.create(Tank, {
	initialize: function(x,y,world,type) {
		var chassisColor,turretColor;

		switch(type)
		{
			case 0:
				chassisColor ="red";
				turretColor ="red";
				break;
			case 1:
				chassisColor ="yellow";
				turretColor ="yellow";
				break;
			case 2:
				chassisColor ="white";
				turretColor ="white";
				break;
		}

        Tank.call(this, x, y, chassisColor, turretColor, world);
        
		//ai turns
		this.mode=0;
		this.turretMode=0;
		this.movement=2;		
		this.type = type;
		this.shoot_count = 0;
		this.shoot_delay = 75 + random(75);

		this.die = function() {
			this.world.removeChild(this);
		}

		this.ai_collision = function(x, y, x2, y2, dsquared) {
			var distance_squared = Math.pow(x - x2, 2) + Math.pow(y - y2, 2);
			return distance_squared <= dsquared;
		}

		this.ai_shoot = function(playerx, playery) {
			var x_vel = this.x + 21 - playerx;
			var y_vel = this.y + 18 - playery;
			var d = Math.sqrt(Math.pow(x_vel, 2) + Math.pow(y_vel, 2));
			x_vel = x_vel/d;
			y_vel = y_vel/d;
			var x_pos = this.x + 21;
			var y_pos = this.y + 18;

			var hit = false;

			while(!hit) {
				x_pos -= x_vel;
				y_pos -= y_vel;

				if(this.ai_collision(playerx, playery, x_pos, y_pos, 500)) {
					this.fire(playerx, playery, this);
					hit = true;
					break;
				}

				for(var i in this.world.enemyTanks) {
					if(this.ai_collision(this.world.enemyTanks[i], 500)) {
						hit = true;
						break;
					}
				}

				var result = this.world.checkCollision(x_pos,y_pos,playerx, playery); 
				if(result[0] == true) {
					hit = true;
					break;
				}
			}
		}
	},

	onenterframe:function(){
		if(this.collided) {
				this.mode = 4;
				this.delay = 10  + random(10);
		}
		if(this.mode == 0) {
			action = random(100);
			delayT = random(50);
			this.delay=delayT;
			this.mode=action;
		}
		else if(this.mode > 0 && this.mode < 20) {
			//rotate clockwise
			this.rotate(2);
			this.delay--;
			if(this.delay<=0)
			{
				this.mode=0;
			}
		}
		else if(this.mode >= 20 && this.mode < 40) {
			//rotate anti-clockwise
			this.rotate(-2);
			this.delay--;
			if(this.delay<=0)
			{
				this.mode=0;
			}
		}
		else if(this.mode >= 40 && this.mode < 80) {
			//move foward
			this.move(this.movement);
			this.delay--;
			if(this.delay<=0)
			{
				this.mode=0;
			}
		}
		else {
			//move backwards
			this.move(-this.movement);
			this.delay--;
			if(this.delay<=0)
			{
				this.mode=0;
			}
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
		this.shoot_count++;
		if(this.shoot_count == this.shoot_delay) {
			this.ai_shoot(this.world.playerTank.x, this.world.playerTank.y);
			this.shoot_delay = 25 + random(25);
			this.shoot_count = 0;
		}
	}
});
	
function random(num){
    return Math.floor(Math.random()*num) + 1;   
}
