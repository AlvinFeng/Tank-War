enchant();

var game;

window.onload = function() {
    game = new Core(768, 640);
    game.fps = 30;

    game.keybind(65, 'left');
    game.keybind(68, 'right');
    game.keybind(87, 'up');
    game.keybind(83, 'down');
    game.preload('images/bluetiles.png',
                    'images/cyantiles.png',
                    'images/greentiles.png',
                    'images/orangetiles.png',
                    'images/pinktiles.png',
                    'images/redtiles.png',
                    'images/violettiles.png',                    
                    'images/whitetiles.png',                    
                    'images/yellowtiles.png',
                    'images/bluetank.png',
                    'images/cyantank.png',
                    'images/greentank.png',
                    'images/orangetank.png',
                    'images/pinktank.png',
                    'images/redtank.png',
                    'images/violettank.png',
                    'images/whitetank.png',
                    'images/yellowtank.png',
                    'images/start.png',
                    'images/blackBG.png',
                    'images/greybullet.png',
                    'images/redbullet.png',
					'images/powerup.png',
                    'images/yellowbullet.png',
                    'images/yellowbullet2.png',                    
                    'images/yellowbullet3.png',
                    'sounds/select.wav',
                    'images/blacksquare.png',
					'images/effect0.gif',
                    'sounds/bgMusic2.mp3',
                    'sounds/explosion.wav',
                    'sounds/laserShot.wav'
					);

    game.onload = function() {
        game.pushScene(new Level1Scene());
        game.pushScene(new TitleScene());        
    };

    Level1Scene = Class.create(Scene, 
    {
        initialize: function()
        {
            Scene.apply(this);
            world = new World(0,'cyan','red');
            game.rootScene.addChild(world);

            game.rootScene.backgroundColor='black';

            this.x+=this.vx;

            this.walls = new Array();
            for (var i = 0; i < levels[0].length;i++) {
                for (var j= 0; j < levels[0][i].length; j++){
                    var destruct = false;
                    if (levels[0][i][j] == 2)
                        destruct = true;
                    if (levels[0][i][j] == 1 || levels[0][i][j] == 2)
                        this.walls.push(new Wall((j + 1) * 64, (i + 1) * 64, destruct));          
                }        
            }
            for (var i = 0; i < 12; i++) {
                this.walls.push(new Wall(i * 64, 0, false));
                this.walls.push(new Wall(i * 64, 576, false));
                this.walls.push(new Wall(0, (i + 1) * 64, false));
                this.walls.push(new Wall(704, (i + 1) * 64, false));
            }
            Bullet.upgradeLevel = 1;
            this.tanks = [];
            this.tanks[0] = new EnemyTank(300,100,'violet','violet',world, this);
            this.addChild(this.tanks[0]);

            this.tanks[1] = new EnemyTank(500,100,'red','red',world, this);
            this.addChild(this.tanks[1]);            

            this.tankPlayer = new PlayerTank(100,100,'blue','blue',world);
            this.addChild(this.tankPlayer);
			
			//var hpup= new powerup(400,100,1,world);
			//this.addChild(hpup);

            this.bUpgrade = new BulletUpgrade(300, 100, this, 2);
            this.addChild(this.bUpgrade);

            var bUpgrade = new BulletUpgrade(600, 500, this, 3);
            this.addChild(bUpgrade);

            this.addEventListener('touchend', function (e) {
                var b = new Bullet(this.tankPlayer.x + 20,e.x,this.tankPlayer.y + 25,e.y,10,4, world, game.currentScene);
                this.addChild(b);
                game.assets["sounds/laserShot.wav"].play();
            });
        }
    });

    TitleScene = Class.create(Scene, 
    {
        initialize: function(){
            Scene.apply(this);
            BulletUpgrade.TitleScreen = true;
            var titleBG = new Sprite(1422, 800);
            titleBG.image = game.assets["images/blackBG.png"];
            this.addChild(titleBG);
            //game.assets['sounds/bgMusic2.mp3'].play();
            world = new World(0,'cyan','red');
            var tank = new PlayerTank(100,100,'blue','blue',world);
            tank.rotateWholeTank(90);
            tank.scale(5, 5);
            tank.x = 325;
            tank.y = 200;
            this.addChild(tank);

            var bUpgrade = new BulletUpgrade(150, 50, this, 1);
            bUpgrade.scale(3, 3);
            this.addChild(bUpgrade);

            bUpgrade = new BulletUpgrade(350, 50, this, 2);
            bUpgrade.scale(3, 3);
            this.addChild(bUpgrade);

            bUpgrade = new BulletUpgrade(550, 50, this, 3);
            bUpgrade.scale(3, 3);
            this.addChild(bUpgrade);

            var titleBG = new Sprite(236, 48);
            titleBG.image = game.assets["images/start.png"];
            titleBG.ontouchend = function () {
                game.assets["sounds/select.wav"].play();
                game.popScene();
                BulletUpgrade.TitleScreen = false;
            };
            titleBG.x = 250;
            titleBG.y = 350;
            this.addChild(titleBG);
        }
    });
	
    //start game
    game.start();
};