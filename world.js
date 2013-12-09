 // World class and Wall
    Wall = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, destructible) {
            enchant.Sprite.call(this, 64, 64);
            this.image = game.assets['images/blacksquare.png']
            this.frame = 3;
            this.x = x;
            this.y = y;
            this.destructible = destructible;
            this.opacity = 0;
            game.rootScene.addChild(this);
        },

        remove: function() {
            game.rootScene.removeChild(this);
            delete this;
        }
    });

    World =  enchant.Class.create(enchant.Group, {
        initialize: function(levelnumber, wallcolor, destructiblewallcolor, scene) {
            enchant.Group.call(this);
            this.levelNumber = levelnumber;
            this.currentLevelTiles = levels[levelnumber];

            var worldMapMatrix = [];
            for(var i=0; i<10; i++) {
                worldMapMatrix[i] = new Array(12);
            }
            this.currentScene = scene;
            var worldMapDestructibleMatrix = [];
            for(var i=0; i<10; i++) {
                worldMapDestructibleMatrix[i] = new Array(12);
            }

            this.worldMap = new Map(64,64);
            this.worldMap.image = game.assets['images/' + wallcolor + 'tiles.png'];

            this.worldMapDestructible = new Map(64,64);
            this.worldMapDestructible.image = game.assets['images/' + destructiblewallcolor + 'tiles.png'];

            this.isWall = function(i,j) {

                if((i<0)||(i>7))
                {
                    return true;
                }
                if((j<0)||(j>9))
                {
                    return true;
                }
                if(this.currentLevelTiles[i][j] === 1)
                {
                    return true;
                }
                return false;
            }

            this.isDestructibleWall = function(i,j) {
                if((i<0)||(i>7))
                {
                    return false;
                }
                if((j<0)||(j>9))
                {
                    return false;
                }
                if(this.currentLevelTiles[i][j] === 2)
                {
                    return true;
                }
                return false;
            }

            this.updateMap = function() {
                for(var i = 0;  i<10;i++)
                {
                    for(var j = 0;  j<12; j++)
                    {
                        if((i==0)||(i==9)||(j==0)||(j==11))
                        {
                            worldMapMatrix[i][j] = 0;
                        }
                        
                        else if (this.currentLevelTiles[i-1][j-1]==1)
                        {
                            worldMapMatrix[i][j] = 0;
                        }
                        else if(this.currentLevelTiles[i-1][j-1]!=2)
                        {
                            //console.log(this.currentLevelTiles[i-1][j-1] + ' ' + i + ' ' + j);
                            var aux = 0;
                            if(this.isWall(i-1,j-2) == true)
                            {
                                aux+=8;
                            }
                            if(this.isWall(i-2,j-1) == true)
                            {
                                aux+=4;
                            }
                            if(this.isWall(i-1,j) == true)
                            {
                                aux+=2;
                            }
                            if(this.isWall(i,j-1) == true)
                            {
                                aux+=1;
                            }

                            if(aux==0)
                            {
                                aux+=16
                                if(this.isWall(i-2,j-2) == true)
                                {
                                    aux+=8;
                                }
                                if(this.isWall(i-2,j) == true)
                                {
                                    aux+=4;
                                }
                                if(this.isWall(i,j) == true)
                                {
                                    aux+=2;
                                }
                                if(this.isWall(i,j-2) == true)
                                {
                                    aux+=1;
                                }

                            }
                            else if(aux == 1)
                            {
                                if((this.isWall(i-2,j-2) == true)&&(this.isWall(i-2,j) == true))
                                {
                                    aux = 34;
                                }
                                else if(this.isWall(i-2,j-2) == true)
                                {
                                    aux = 32;
                                }
                                else if(this.isWall(i-2,j) == true)
                                {
                                    aux = 33;
                                }
                            }
                            else if(aux == 2)
                            {
                                if((this.isWall(i-2,j-2) == true)&&(this.isWall(i,j-2) == true))
                                {
                                    aux = 37;
                                }
                                else if(this.isWall(i-2,j-2) == true)
                                {
                                    aux = 35;
                                }
                                else if(this.isWall(i,j-2) == true)
                                {
                                    aux = 36;
                                }
                            }
                            else if(aux == 3)
                            {
                                if(this.isWall(i-2,j-2) == true)
                                    aux = 38;
                            }
                            else if(aux == 4)
                            {
                                if((this.isWall(i,j-2) == true)&&(this.isWall(i,j) == true))
                                {
                                    aux = 41;
                                }
                                else if(this.isWall(i,j-2) == true)
                                {
                                    aux = 39;
                                }
                                else if(this.isWall(i,j) == true)
                                {
                                    aux = 40;
                                }
                            }
                            else if(aux == 6)
                            {
                                if(this.isWall(i,j-2) == true)
                                    aux = 42;
                            }
                            else if(aux == 8)
                            {
                                if((this.isWall(i-2,j) == true)&&(this.isWall(i,j) == true))
                                {
                                    aux = 45;
                                }
                                else if(this.isWall(i-2,j) == true)
                                {
                                    aux = 43;
                                }
                                else if(this.isWall(i,j)== true)
                                {
                                    aux = 44;
                                }
                            }
                            else if(aux == 9)
                            {
                                if(this.isWall(i-2,j) == true)
                                    aux = 46;
                            }
                            else if(aux == 12)
                            {
                                 if(this.isWall(i,j) == true)
                                    aux = 47;
                            }
                            worldMapMatrix[i][j] = aux;
                        }
                        else{
                            worldMapMatrix[i][j]=16;
                        }

                    }
                }

                this.worldMap.loadData(worldMapMatrix);

                //calculate frame matrix for world map destructible
                var worldMapDestructibleMatrix = [];
                for(var i=0; i<10; i++) {
                    worldMapDestructibleMatrix[i] = new Array(12);
                }

                for(var i = 0;  i<10;i++)
                {
                    for(var j = 0;  j<12; j++)
                    {
                        //if((i==0)||(i==9)||(j==0)||(j==11))
                        //{
                        //    worldMapDestructibleMatrix[i][j] = 16;
                        //}
                        if (this.isDestructibleWall(i-1,j-1))
                        {
                            worldMapDestructibleMatrix[i][j] = 0;
                        }
                        else
                        {
                            //console.log(this.currentLevelTiles[i-1][j-1] + ' ' + i + ' ' + j);
                            var aux = 0;
                            if(this.isDestructibleWall(i-1,j-2) == true)
                            {
                                aux+=8;
                            }
                            if(this.isDestructibleWall(i-2,j-1) == true)
                            {
                                aux+=4;
                            }
                            if(this.isDestructibleWall(i-1,j) == true)
                            {
                                aux+=2;
                            }
                            if(this.isDestructibleWall(i,j-1) == true)
                            {
                                aux+=1;
                            }

                            if(aux==0)
                            {
                                aux+=16
                                if(this.isDestructibleWall(i-2,j-2) == true)
                                {
                                    aux+=8;
                                }
                                if(this.isDestructibleWall(i-2,j) == true)
                                {
                                    aux+=4;
                                }
                                if(this.isDestructibleWall(i,j) == true)
                                {
                                    aux+=2;
                                }
                                if(this.isDestructibleWall(i,j-2) == true)
                                {
                                    aux+=1;
                                }

                            }
                            else if(aux == 1)
                            {
                                if((this.isDestructibleWall(i-2,j-2) == true)&&(this.isDestructibleWall(i-2,j) == true))
                                {
                                    aux = 34;
                                }
                                else if(this.isDestructibleWall(i-2,j-2) == true)
                                {
                                    aux = 32;
                                }
                                else if(this.isDestructibleWall(i-2,j) == true)
                                {
                                    aux = 33;
                                }
                            }
                            else if(aux == 2)
                            {
                                if((this.isDestructibleWall(i-2,j-2) == true)&&(this.isDestructibleWall(i,j-2) == true))
                                {
                                    aux = 37;
                                }
                                else if(this.isDestructibleWall(i-2,j-2) == true)
                                {
                                    aux = 35;
                                }
                                else if(this.isDestructibleWall(i,j-2) == true)
                                {
                                    aux = 36;
                                }
                            }
                            else if(aux == 3)
                            {
                                if(this.isDestructibleWall(i-2,j-2) == true)
                                    aux = 38;
                            }
                            else if(aux == 4)
                            {
                                if((this.isDestructibleWall(i,j-2) == true)&&(this.isDestructibleWall(i,j) == true))
                                {
                                    aux = 41;
                                }
                                else if(this.isDestructibleWall(i,j-2) == true)
                                {
                                    aux = 39;
                                }
                                else if(this.isDestructibleWall(i,j) == true)
                                {
                                    aux = 40;
                                }
                            }
                            else if(aux == 6)
                            {
                                if(this.isDestructibleWall(i,j-2) == true)
                                    aux = 42;
                            }
                            else if(aux == 8)
                            {
                                if((this.isDestructibleWall(i-2,j) == true)&&(this.isDestructibleWall(i,j) == true))
                                {
                                    aux = 45;
                                }
                                else if(this.isDestructibleWall(i-2,j) == true)
                                {
                                    aux = 43;
                                }
                                else if(this.isDestructibleWall(i,j)== true)
                                {
                                    aux = 44;
                                }
                            }
                            else if(aux == 9)
                            {
                                if(this.isDestructibleWall(i-2,j) == true)
                                    aux = 46;
                            }
                            else if(aux == 12)
                            {
                                 if(this.isDestructibleWall(i,j) == true)
                                    aux = 47;
                            }
                            worldMapDestructibleMatrix[i][j] = aux;
                        }

                    }
                }

                this.worldMapDestructible.loadData(worldMapDestructibleMatrix);
            } 

            this.removeDestructibleTile = function(x, y)
            {
                if(this.currentLevelTiles[x][y]==2)
                {
                    this.currentLevelTiles[x][y]=0;
                    this.updateMap();
                }
            }
            this.checkCollisionWithTile = function(prevx, prevy, x, y, tilex, tiley)
            {
                var possibleCollision = false; 

                if(((tilex<=0)||(tilex>=11))||((tiley<=0)||(tiley>=9)))
                {
                    possibleCollision = true;
                }
                else if(this.currentLevelTiles[tiley-1][tilex-1]!=0)
                {
                    possibleCollision = true;
                }

                if(possibleCollision==true)
                {
                    var collision = false;
                    var collisionX = x;
                    var collisionY = y;
                    var a1,b1,a2,b2;
                    var xline,xlineline;
                    var yline,ylineline;
                    
                    var x0 = tilex*64-5;
                    var x1 = x0+72;
                    var y0 = tiley*64-4; 
                    var y1 = y0+71;
                    
                    var xprev = prevx;
                    var xnext = x;
                    var yprev = prevy;
                    var ynext = y; 
                    
                    if ((xprev == xnext)&&((xprev>=x0)&&(xprev<=x1)))
                    {
                        if((yprev<y0)&&(ynext>=y0))
                        {
                            collision = true;
                            collisionX = xprev;
                            collisionY = y0-1;
                        }
                        else if((yprev>y1)&&(ynext<=y1))
                        {
                            collision = true;
                            collisionX = xprev;
                            collisionY = y1+1;
                        }
                    }
                    else if((yprev == ynext)&&((yprev>=y0)&&(yprev<=y1)))
                    {
                        if((xprev<x0)&&(xnext>=x0))
                        {
                            collision = true;
                            collisionX = x0-1;
                            collisionY = yprev;
                        }
                        else if((xprev>x1)&&(xnext<=x1))
                        {
                            collision = true;
                            collisionX = x1+1;
                            collisionY = yprev;
                        }
                    }
                    else
                    {
                        a1 = (ynext - yprev)/(xnext - xprev);
                        b1 =  ynext - (xnext * a1);
                        a2 = 1.0/a1;
                        b2 = b1/(-a1);
                        
                        yline = a1*x0 + b1;
                        ylineline = a1*x1 + b1;
                        xline = a2*y0 + b2;
                        xlineline = a2*y1 + b2;
                        
                        if((xprev<x0)&&(yprev<y0))
                        {
                            if((xnext>=x0) && ((y0<=yline)&&(yline<=y1)))
                            {
                                collision = true;
                                collisionX = x0 -1;
                                collisionY = ynext;
                            }
                            else if ((ynext>=y0)&&((x0<=xline)&&(xline<=x1)))
                            {
                                collision = true;
                                collisionX = xnext;
                                collisionY = y0-1;
                            }
                        }
                        else if (((x0<=xprev)&&(xprev<=x1))&&(yprev<y0))
                        {
                            if((ynext>=y0)&&((x0<=xline)&&(xline<=x1)))
                            {
                                collision = true;
                                collisionX = xnext;
                                collisionY = y0 -1;
                            }
                        }
                        else if((xprev>x1)&&(yprev<y0))
                        {
                            if((xnext<x1)&&((y0<=ylineline)&&(ylineline<=y1)))
                            {
                                collision = true;
                                collisionX = x1+1;
                                collisionY = ynext;
                            }
                            else if((ynext>=y0)&&((x0<=xline)&&(xline<=x1)))
                            {
                                collision = true;
                                collisionX = xnext;
                                collisionY = y0+1;
                            }
                        }
                        else if(((y0<=yprev)&&(yprev<=y1))&(xprev<x0))
                        {
                            if((xnext>=x0)&&((y0<=yline)&&(yline<=y1)))
                            {
                                collision = true;
                                collisionX = x0-1;
                                collisionY = ynext;
                            }
                        }
                        else if(((y0<=yprev)&&(yprev<=y1))&&(xprev>x1))
                        {
                            if((xnext<=x1)&&((y0<=ylineline)&&(ylineline<=y1)))
                            {
                                collision = true;
                                collisionX = x1 +1;
                                collisionY = ynext;
                            }
                        }
                        else if((xprev<x0)&&(yprev>y1))
                        {
                            if((xnext>=x0)&&((y0<=yline)&&(yline<=y1)))
                            {
                                collision = true;
                                collisionX = x0-1;
                                collisionY = ynext;
                            }
                            else if((ynext<=y1)&&((x0<=xlineline)&&(xlineline<=x1)))
                            {
                                collision = true;
                                collisionX = xnext;
                                collisionY = y1+1;
                            }
                        }
                        else if (((x0<=xprev)&&(xprev<=x1))&&(yprev>y1))
                        {
                            if((ynext<=y1)&&((x0<xlineline)&&(xlineline<=x1)))
                            {
                                collision = true;
                                collisionX = xnext;
                                collisionY = y1+1;
                            }
                        }
                       else if ((xprev>x1)&&(yprev>y1))
                       {
                           if((xnext<=x1)&&((y0<=ylineline)&&(ylineline<=y1)))
                           {
                               collision = true;
                               collisionX = x1 + 1;
                               collisionY = ynext;
                            }
                            else if((ynext<=y1)&&((x0<=xlineline)&&(xlineline<=x1)))
                            {
                                collision = true;
                                collisionX = xnext;
                                collisionY = y1+1;
                            }
                        }
                    }
                    return [collision, collisionX, collisionY];
                }
                else
                {
                    return [false, x, y];
                }
            }

            this.checkCollision = function(prevx, prevy, x, y)
            {
               var tilex = Math.floor(prevx/64); 
               var tiley = Math.floor(prevy/64);

               var aux;

               var collisionX = x;
               var collisionY = y;

               var collision = false;

               for(var i =0; i<2; i++)
               {
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex + 1, tiley);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex - 1, tiley);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex, tiley + 1);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex, tiley - 1);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex + 1, tiley + 1);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex + 1, tiley - 1);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex - 1, tiley + 1);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
                   aux = this.checkCollisionWithTile(prevx, prevy, collisionX, collisionY, tilex - 1, tiley - 1);
                   if(aux[0] == true)
                   {
                        collision = true;
                        collisionX = aux[1];
                        collisionY = aux[2];
                   }
               }

               return [collision, collisionX, collisionY];

            }

            this.updateMap();

            this.addChild(this.worldMap);
            this.addChild(this.worldMapDestructible); 
        }

    });