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
                    'images/gameover.png',
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
                    'sounds/laserShot.wav',
                    'sounds/upgrade.wav'
					);

    game.onload = function() {
        game.pushScene(new TitleScene());        
    };

    Level1Scene = Class.create(Scene, 
    {
        initialize: function()
        {
            Scene.apply(this);
            this.world = new World(0,'cyan','red', this);
            game.rootScene.addChild(this.world);

            game.rootScene.backgroundColor='black';

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
            this.tanks[0] = new EnemyTank(300,100,'violet','violet',this.world, this);
            this.addChild(this.tanks[0]);

            this.tanks[1] = new EnemyTank(500,100,'red','red',this.world, this);
            this.addChild(this.tanks[1]);            

            this.tankPlayer = new PlayerTank(100,100,'blue','blue',this.world);
            this.addChild(this.tankPlayer);
			
			var hpup= new Powerup(120,200,1,this);
			this.addChild(hpup);

            this.bUpgrade = new BulletUpgrade(300, 100, this, 2);
            this.addChild(this.bUpgrade);

            var bUpgrade = new BulletUpgrade(600, 500, this, 3);
            this.addChild(bUpgrade);

            this.addEventListener('touchend', function (e) {
                var b = new Bullet(this.tankPlayer.x + 20,e.x,this.tankPlayer.y + 25,e.y,10,4, this.world, game.currentScene);
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
            titleBG.ontouchend = function () {
                if (TitleScene.StartGame == true) {
                    game.popScene();
                    game.pushScene(new Level1Scene());
                    BulletUpgrade.TitleScreen = false;
                }
            };
            this.addChild(titleBG);
            //game.assets['sounds/bgMusic2.mp3'].play();
            world = new World(0,'cyan','red', this);
            this.tank = new PlayerTank(100,100,'blue','blue',world);
            this.tank.rotateWholeTank(90);
            this.tank.scale(5, 5);
            this.tank.x = 325;
            this.tank.y = 200;
            this.addChild(this.tank);

            this.bUpgrade = new BulletUpgrade(150, 50, this, 1);
            this.bUpgrade.scale(3, 3);
            this.addChild(this.bUpgrade);

            this.bUpgrade2 = new BulletUpgrade(350, 50, this, 2);
            this.bUpgrade2.scale(3, 3);
            this.addChild(this.bUpgrade2);

            this.bUpgrade3 = new BulletUpgrade(550, 50, this, 3);
            this.bUpgrade3.scale(3, 3);
            this.addChild(this.bUpgrade3);

            var titleBG = new Sprite(236, 48);
            titleBG.image = game.assets["images/start.png"];
            titleBG.ontouchend = function () {
                game.assets["sounds/select.wav"].play();
                game.currentScene.removeChild(this);
                game.currentScene.removeChild(game.currentScene.tank);
                game.currentScene.removeChild(game.currentScene.bUpgrade);
                game.currentScene.removeChild(game.currentScene.bUpgrade2);
                game.currentScene.removeChild(game.currentScene.bUpgrade3);

                var storyText = new enchant.Label("It is the year 3500 and the world is currently at war! Tank warfare and technology has progressed immensely and all warfare is now done online. You are the head commander of an elite tank platoon collectively known as The Earth Defenders. A group of cyber terrorists recently appeared in the Battle Net (where all warfare happens) and have been spotted trying to take it over! If the Battle Net is lost to the cyber terrorists then the world will collectively lose access to the internet! As the lead commander you are responsible for leading the charge against enemy tank platoons as well as going on covert missions deep into enemy cyber space.");
                storyText.color = "00FF00";//"white";
                storyText.textAlign = "center";
                storyText.scale(2, 2);
                storyText.x = 200;
                storyText.y = 100;
                game.currentScene.addChild(storyText);
                TitleScene.StartGame = true;               
            };
            titleBG.x = 250;
            titleBG.y = 350;
            this.addChild(titleBG);
        }
    });

    GameOverScene = Class.create(Scene, 
    {
        initialize: function(){
            Scene.apply(this);
            BulletUpgrade.TitleScreen = true;
            var titleBG = new Sprite(1422, 800);
            titleBG.image = game.assets["images/blackBG.png"];
            titleBG.ontouchend = function () {
                    game.popScene();
                    game.pushScene(new TitleScene());
            };
            this.addChild(titleBG);
            world = new World(0,'cyan','red', this);
            this.tank = new PlayerTank(100,100,'red','red',world);
            this.tank.rotateWholeTank(90);
            this.tank.scale(5, 5);
            this.tank.x = 325;
            this.tank.y = 200;
            this.addChild(this.tank);

            this.bUpgrade = new BulletUpgrade(150, 50, this, 1);
            this.bUpgrade.scale(3, 3);
            this.addChild(this.bUpgrade);

            this.bUpgrade2 = new BulletUpgrade(350, 50, this, 2);
            this.bUpgrade2.scale(3, 3);
            this.addChild(this.bUpgrade2);

            this.bUpgrade3 = new BulletUpgrade(550, 50, this, 3);
            this.bUpgrade3.scale(3, 3);
            this.addChild(this.bUpgrade3);

            var titleBG = new Sprite(189, 97);
            titleBG.image = game.assets["images/gameover.png"];

            titleBG.x = 250;
            titleBG.y = 350;
            this.addChild(titleBG);

            var score = new enchant.Label("Score: ");
            score.color = "white";
            score.scale(2, 2);
            score.x = 400;
            score.y = 500;
            this.addChild(score);
        }
    });
	
    //start game
    game.start();
};