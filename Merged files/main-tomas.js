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

    // change the game dimensions when the window dimensions change
       

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


        // s = new Sprite(32, 32);
        // s.image = game.assets['images/bluetiles.png'];
        // s.frame = 0;
        // s.x = 100;
        // s.y = 100;

        // s.addEventListener(Event.ENTER_FRAME, function(){
        //     var nextx = this.x; 
        //     var nexty = this.y;

        //     if(game.input.left && !game.input.right){
        //         nextx = this.x - 4;
        //     }
        //     else if(game.input.right && !game.input.left){
        //         nextx = this.x + 4;
        //     }
        //     if(game.input.up && !game.input.down){
        //         nexty = this.y - 4;
        //     }
        //     else if(game.input.down && !game.input.up){
        //         nexty = this.y + 4;
        //     }

        //     var aux = world.checkCollision(this.x,this.y,nextx,nexty);

        //     console.log("return: " + aux[0] + " " + aux[1] + " " + aux[2]);
        //     console.log("values: " + this.x + " " + this.y + " " + nextx + " " + nexty);
        //     this.x = aux[1];
        //     this.y = aux[2];

        // });

        // game.rootScene.addChild(s);

        var tank = new PlayerTank(100,100,'blue','blue');
        this.rootScene.addChild(tank);

        var tank1 = new Tank(300,100,'violet','violet');
        this.rootScene.addChild(tank1);

        var tank2 = new Tank(500,100,'red','red');
        this.rootScene.addChild(tank2);

        var tank3 = new Tank(100,300,'white','white');
        this.rootScene.addChild(tank3);


        //window.onresize = function(event) {
        //    game.width = window.innerWidth;
        //    game.height = window.innerHeight;
        //    game.rootScene.removeChild(world);
        //    game.rootScene.addChild(world);

        //}
    };

    //start game
    game.start();
};


