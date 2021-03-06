enchant();

var game;

window.onload = function() {
    game = new Core(768, 640);
    game.fps = 30;
	game.hp=3;
	game.score=0;
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
					'images/tutorial.png',
                    'sounds/bgMusic2.mp3',
                    'sounds/explosion.wav',
                    'sounds/laserShot.wav'
					);

    game.onload = function() { 
	
        game.pushScene(new GameOverScene());
        game.pushScene(new GameScene()); 
		game.pushScene(new Tutorial());
        game.pushScene(new TitleScene());     
    };

    GameScene = Class.create(Scene, 
    {
        initialize: function()
        {
            enchant.Scene.call(this);
            this.currentWorld = new World(0);
            this.addChild(this.currentWorld);
            this.currentWorld.removeDestructibleTile(4,0);
            this.currentlevel =0;
            this.backgroundColor='black';
            this.newWorldAnimation = false;            
            GameScene.bulletCount = 0;
            GameScene.touchframe = 0;

            this.addEventListener('touchstart', function (e) {
                if(this.age - GameScene.touchframe > 15) {
                    if(GameScene.bulletCount < 5)
                    {
                        this.currentWorld.playerTank.fire_wrapper(e.x,e.y);                
                        game.assets["sounds/laserShot.wav"].play();
                        GameScene.bulletCount++;
                    }
                    GameScene.touchframe = this.age;
                }
            });

            this.textAnimation=true;
            this.levelText = new Label();
            this.levelText.color = "white"; 
            this.levelText.font = "48px arial";
            this.levelText.text = "Level " + (this.currentlevel+1);
            this.levelText.x = 768;
            this.levelText.y = 300;
            this.addChild(this.levelText);
			
			//HP FOR THE PC TANK AND THE SCORE
			lifeLabel = new enchant.Label("");
			lifeLabel.color = "blue"
			lifeLabel.x = 950;
			lifeLabel.y = 580;
			lifeLabel.scale(3,3);
			this.addChild(lifeLabel);
			
			//ENEMIES KILLED SCORE
			score = new enchant.Label("");
			score.color = "blue"
			score.x = 350;
			score.y = 580;
			score.scale(3,3);
			score.text= "Enemies killed: "+ game.score;
			this.addChild(score);
			
			
            Bullet.upgradeLevel = 1;

        },
        onenterframe: function() {  
            if(this.currentWorld.enemyTanks.length == 0)
            {
                if (this.currentWorld.levelNumber == 9)
                {
                    game.popScene();
                    game.pushScene(new WinScene());
                }
                this.previousWorld = this.currentWorld;
                this.currentlevel++;
                this.currentWorld = new World(this.currentlevel);
                this.currentWorld.x=768;
                this.addChild(this.currentWorld);
                this.newWorldAnimation=true;
                this.textAnimation=true;
                this.levelText = new Label();
                this.levelText.color = "white"; 
                this.levelText.font = "48px arial";
                this.levelText.text = "Level " + (this.currentlevel+1);
                this.levelText.x = 768;
                this.levelText.y = 300;
                this.addChild(this.levelText);
            }

            if(this.textAnimation==true)
            {   
                this.levelText.x-=12;
                if(this.levelText.x<=-200)
                {
                    this.removeChild(this.levelText);
                    this.textAnimation=false;
                }
            }

            if(this.newWorldAnimation == true)
            {
                this.currentWorld.x = this.currentWorld.x*0.95;
                this.previousWorld.x = this.currentWorld.x - 768;
                if(this.currentWorld.x<=1)
                {
                    this.newWorldAnimation=false;
                    this.removeChild(this.previousWorld);
                }
            }
			
			lifeLabel.text= "Life: "+ game.hp;
			score.text="Enemies killed: "+ game.score;
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
                    BulletUpgrade.TitleScreen = false;
                }
            };
            this.addChild(titleBG);
            game.assets['sounds/bgMusic2.mp3'].play();
            world = new World(0);
            this.tank = new PlayerTank(100,100,'blue','blue',world);
            this.tank.rotateWholeTank(90);
            this.tank.scale(5, 5);
            this.tank.x = 325;
            this.tank.y = 200;
            this.addChild(this.tank);

            this.bUpgrade = new BulletUpgrade(150, 50, 1, world);
            this.bUpgrade.scale(3, 3);
            this.addChild(this.bUpgrade);

            this.bUpgrade2 = new BulletUpgrade(350, 50, 2, world);
            this.bUpgrade2.scale(3, 3);
            this.addChild(this.bUpgrade2);

            this.bUpgrade3 = new BulletUpgrade(550, 50, 3, world);
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
                storyText.x = 225;
                storyText.y = 50;
                game.currentScene.addChild(storyText);
                TitleScene.StartGame = true;               
            };
            titleBG.x = 250;
            titleBG.y = 350;
            this.addChild(titleBG);
        }
    });
	
	Tutorial = Class.create(Scene,
	{
		initialize: function(){
            Scene.apply(this);
            var tut = new Sprite(768, 640);
            tut.image = game.assets["images/tutorial.png"];
            tut.ontouchend = function () {
                    game.popScene();
            };
			this.addChild(tut);
		},
	});

    GameOverScene = Class.create(Scene, 
    {
        initialize: function(){
            Scene.apply(this);
            BulletUpgrade.TitleScreen = true;
            var titleBG = new Sprite(1422, 800);
            titleBG.image = game.assets["images/blackBG.png"];
            
            this.addChild(titleBG);
            world = new World(0);
            this.tank = new PlayerTank(100,100,'red','red',world);
            this.tank.rotateWholeTank(90);
            this.tank.scale(5, 5);
            this.tank.x = 325;
            this.tank.y = 200;
            this.addChild(this.tank);

            var titleBG = new Sprite(189, 97);
            titleBG.image = game.assets["images/gameover.png"];
            titleBG.ontouchend = function () {
                    game.popScene();
                    game.pushScene(new GameOverScene());
                    game.pushScene(new GameScene());    
                    game.pushScene(new TitleScene());   
            };
            titleBG.x = 250;
            titleBG.y = 350;
            this.addChild(titleBG);

            var score = new enchant.Label("Score: "+ game.score);
            score.color = "white";
            score.scale(2, 2);
            score.x = 400;
            score.y = 500;
            this.addChild(score);
        }
    });

    WinScene = Class.create(Scene, 
    {
        initialize: function(){
            Scene.apply(this);
            BulletUpgrade.TitleScreen = true;
            var titleBG = new Sprite(1422, 800);
            titleBG.image = game.assets["images/blackBG.png"];
            titleBG.ontouchend = function () {
                    game.popScene();
                    game.pushScene(new GameOverScene());
                    game.pushScene(new GameScene());    
                    game.pushScene(new TitleScene());   
            };
            this.addChild(titleBG);
            world = new World(0);
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

            var label = new Label("You Win!");
            label.color = "white";
            label.x = 650;
            label.y = 350;
            label.scale(4,4);
            this.addChild(label);

            var score = new enchant.Label("Score: "+ game.score);
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