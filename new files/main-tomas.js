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
        game.pushScene(new GameScene());
        //game.pushScene(new TitleScene());        
    };

    GameScene = Class.create(Scene, 
    {
        initialize: function()
        {
            enchant.Scene.call(this);
            this.currentWorld = new World(0,'cyan','red');
            this.addChild(this.currentWorld);
            this.currentWorld.removeDestructibleTile(4,0);

            this.backgroundColor='black';

            this.addEventListener('touchstart', function (e) {
                this.currentWorld.playerTank.fire(e.x,e.y);
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
            //world = new World(0,'cyan','red');
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