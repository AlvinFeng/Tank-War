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
                    'images/yellowtank.png');

    //called when the loading is complete
    game.onload = function() {

        world = new World(0,'cyan','red');
        game.rootScene.addChild(world);

        game.rootScene.backgroundColor='black';

                this.x+=this.vx;

        var tank = new PlayerTank(100,100,'blue','blue',world);
        this.rootScene.addChild(tank);

        var tank1 = new Tank(300,100,'violet','violet',world);
        this.rootScene.addChild(tank1);

        var tank2 = new Tank(500,100,'red','red',world);
        this.rootScene.addChild(tank2);

        var tank3 = new Tank(100,300,'white','white',world);
        this.rootScene.addChild(tank3);
    };

    //start game
    game.start();
};


