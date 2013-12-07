enchant();

var game;

window.onload = function() {

    //create game object
    game = new Core(768, 640);
    game.fps = 30;

    game.keybind(65, 'left');
    game.keybind(68, 'right');
    game.keybind(87, 'up');
    game.keybind(83, 'down');
     
    //load images
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
                    'images/yellowbullet.png',
                    'sounds/select.wav');

    //called when the loading is complete
    game.onload = function() {       
        //game.pushScene(new GameOverScene());
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

            var tank = new PlayerTank(100,100,'blue','blue',world);
            this.addChild(tank);

            var tank1 = new EnemyTank(300,100,'violet','violet',world);
            this.addChild(tank1);

            var tank2 = new EnemyTank(500,100,'red','red',world);
            this.addChild(tank2);

            this.addEventListener('touchend', function (e) {
                var b = new Bullet(tank.x,e.x,tank.y,e.y,10,10,tank.chassisColor,world);
                this.addChild(b);
            });
        }
    });

    TitleScene = Class.create(Scene, 
    {
        initialize: function(){
            Scene.apply(this);
            
            var titleBG = new Sprite(1422, 800);
            titleBG.image = game.assets["images/blackBG.png"];
            this.addChild(titleBG);

            world = new World(0,'cyan','red');
            var tank = new PlayerTank(100,100,'blue','blue',world);
            tank.rotateWholeTank(90);
            tank.scale(5, 5);
            tank.x = 325;
            tank.y = 200;
            this.addChild(tank);

            var titleBG = new Sprite(236, 48);
            titleBG.image = game.assets["images/start.png"];
            titleBG.x = 250;
            titleBG.y = 350;
            this.addChild(titleBG);
        },
        ontouchend: function () {
            game.assets["sounds/select.wav"].play();
            game.popScene();
        }
    });

    //start game
    game.start();
};