 var view = (function() {

   var layerWidth = 1500;
   var layerHeight = 1200;
   var canvasMain = document.getElementById('gameView');
   canvasMain.width = layerWidth;
   canvasMain.height = layerHeight;

   var ctxMain = canvasMain.getContext('2d');

   var canvasObjects = document.getElementById('gameViewObjects');
   canvasObjects.width = layerWidth;
   canvasObjects.height = layerHeight;
   var ctxObj = canvasObjects.getContext('2d');

   var canvasAnimation = document.getElementById('gameViewAnimation');
   canvasAnimation.width = layerWidth;
   canvasAnimation.height = layerHeight;
   var ctxAnimation = canvasAnimation.getContext('2d');

   var canvasAnimationObjects = document.getElementById('gameViewAnimationObjects');
   canvasAnimationObjects.width = layerWidth;
   canvasAnimationObjects.height = layerHeight;
   var ctxAnimationObjects = canvasAnimationObjects.getContext('2d');

   var canvasEquipment = document.getElementById('equipment');
   var ctxEquipment = canvasEquipment.getContext('2d');
   canvasEquipment.width = 150;
   canvasEquipment.height = 80;

   var drawEquipment = function() {
     ctxEquipment.fillStyle = "#353535";
     ctxEquipment.fillRect(0, 0, canvasEquipment.width, canvasEquipment.height);
     ctxEquipment.strokeStyle = "#8cc236";
     ctxEquipment.beginPath();
     ctxEquipment.arc(40, 40, 30, 0, 2 * Math.PI);
     ctxEquipment.moveTo(140, 40)
     ctxEquipment.arc(110, 40, 30, 0, 2 * Math.PI);
     ctxEquipment.stroke();
   }

   var onePixel = 50;

   var objectSize = 50;

   var sprite = new Image();
   sprite.src = 'img/css_sprites.png';

   var currentItemList = [];

   //okno
   var referenceViewport = $('.game-view__window');
   var referenceMap = $(".game-view__move");
   var orderMoveArray = [];
   var mapProp = {
     _width: Number(referenceMap.css('width').substr(0, referenceMap.css('width').length - 2)),
     _height: Number(referenceMap.css('height').substr(0, referenceMap.css('height').length - 2))
   };

   var viewPort = {
     _width: Number(referenceViewport.css('width').substr(0, referenceViewport.css('width').length - 2)),
     _height: Number(referenceViewport.css('height').substr(0, referenceViewport.css('height').length - 2)),
     _posX: 0,
     _posY: 0
   };

   var grass = new view_model.Background_element('img/grass.jpg');
   var water = new view_model.Background_element('img/water.jpg');
   var waterAccess = new view_model.Background_element('img/waterMoveAccess.jpg');
   var road = new view_model.Background_element('img/road_hor.jpg');
   var treeUp = new view_model.Background_element('img/up.png');
   var small = new view_model.Background_element('img/small.jpg');
   var treeDown = new view_model.Background_element('img/root.png');
   var log = new view_model.Background_element('img/log.jpg');

   grass.draw(service.firstLayer, canvasMain, ctxMain, 1, onePixel);
   water.draw(service.firstLayer, canvasMain, ctxMain, 0, onePixel);
   water.draw(service.firstLayer, canvasMain, ctxMain, 7, onePixel);
   treeUp.draw(service.firstLayer, canvasMain, ctxMain, 3, onePixel);
   treeDown.draw(service.firstLayer, canvasMain, ctxMain, 4, onePixel);
   small.draw(service.firstLayer, canvasMain, ctxMain, 5, onePixel);
   road.draw(service.firstLayer, canvasMain, ctxMain, 2, onePixel);
   log.draw(service.firstLayer, canvasMain, ctxMain, 6, onePixel);

   var redrawRoad = function(firstLayer) {
     road.draw(firstLayer, canvasMain, ctxMain, 2, onePixel);
   };

   drawEquipment();

   var listOfStaticObjects = [];

   var bot = new view_model.Element_animated("bot", 230, 230, 200, 200, objectSize, objectSize, service.map._objects[0]._posX, service.map._objects[0]._posY);

   var aurochs0 = new view_model.Element("aurochs0", 970, 10, 200, 200, objectSize * 1.5, objectSize * 1.5);
   var aurochs1 = new view_model.Element("aurochs1", 970, 10, 200, 200, objectSize * 1.5, objectSize * 1.5);
   var honey = new view_model.Element("honey", 230, 600, 200, 200, objectSize, objectSize);
   var momDuckCry = new view_model.Element("momDuckCry", 280, 330, 300, 200, objectSize * 2, objectSize * 1.5);
   var raft = new view_model.Element("raft", 10, 10, 300, 300, objectSize * 2, objectSize * 2);
   var rope = new view_model.Element("rope", 450, 600, 200, 200, objectSize, objectSize);
   var littleDuck = new view_model.Element("littleDuck", 970, 570, 100, 100, objectSize * 0.5, objectSize * 0.5);
   var bear = new view_model.Element("bear", 10, 330, 250, 250, objectSize * 2, objectSize * 2);
   var chrisTree = new view_model.Element("chrisTree", 330, 10, 300, 300, objectSize * 2, objectSize * 2);
   var branch = new view_model.Element("branch", 970, 450, 200, 100, objectSize * 2, objectSize);

   listOfStaticObjects.push(aurochs0, aurochs1, honey, momDuckCry, raft, rope, littleDuck, bear, chrisTree, branch);

   var drawStaticElements = function(arr1, arr2) {
     //draw elements from table
     // sprite.onload = function() {
     for (var i = arr1.length - 1; i >= 0; i--) {
       for (var j = arr2.length - 1; j >= 0; j--) {
         if (arr1[i]._name == arr2[j]._name) {
           arr2[j].draw(arr1[i]._posX * onePixel, arr1[i]._posY * onePixel, canvasObjects, ctxObj, sprite);
         }

       }
     };
   }
   var drawItem = function(object, context, pixel, posX, posY) {
     var sprite = new Image();
     sprite.src = 'img/css_sprites.png';
     context.drawImage(sprite, object._spriteX, object._spriteY, object._spriteWidth, object._spriteHeight, posX, posY, objectSize, objectSize);
   };

   sprite.onload = function() {
     drawStaticElements(service.map._objects, listOfStaticObjects);
   }

   var bee1 = new view_model.Element_animated("bee", 650, 230, 200, 200, objectSize * 0.3, objectSize * 0.3, service.map._objectsMoving[0]._posX * onePixel, service.map._objectsMoving[0]._posY * onePixel);
   var bee2 = new view_model.Element_animated("bee", 650, 230, 200, 200, objectSize * 0.3, objectSize * 0.3, service.map._objectsMoving[0]._posX * onePixel, service.map._objectsMoving[0]._posY * onePixel);

   var drawBee = function(object) {
     object.drawAnim(object, ctxAnimationObjects, sprite);
     object._posX = object.updateBee(object._posX, service.map._objectsMoving[0]._posX * onePixel, service.map._objectsMoving[0]._posX * onePixel * 1.1);
     object._posY = object.updateBee(object._posY, service.map._objectsMoving[0]._posY * onePixel, service.map._objectsMoving[0]._posY * onePixel * 1.1);
     //ctxAnimationObjects.strokeRect(service.map._objects[4]._posX*onePixel, service.map._objects[4]._posX*onePixel*2, service.map._objects[4]._posY*onePixel, service.map._objects[4]._posY*onePixel*2);
   };
   var equipmentList = [];
   //TODO: Poprawić animację znikania zwierząt "wciąganych do ekwipunku"
   var pickEquipment = function() {
     var botArr = service.giveMeAllObj()[0]._arrayOfElements;
     for (var i = botArr.length - 1; i >= 0; i--) {
       //if(botArr[i]._canBeGet === true) {
       for (var j = listOfStaticObjects.length - 1; j >= 0; j--) {
         if (listOfStaticObjects[j]._name === botArr[i]._name) {
           listOfStaticObjects[j].draw(15 + (i * 70), 15, canvasEquipment, ctxEquipment, sprite);
           listOfStaticObjects.splice(j, 1);
           equipmentList.push(botArr[i]);
           ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
           drawStaticElements(service.map._objects, listOfStaticObjects);
         }
       }
       //}
     }
     console.log(botArr);
   };


   //TODO: Poprawić animację pojawiania się zwierząt i rzeczy "wyrzucanych z ekwipunku"
   var dropEquipment = function() {
     var botArr = service.map._objects[0]._arrayOfElements;
     ctxEquipment.clearRect(0, 0, canvasEquipment.width, canvasEquipment.height);
     for (var i = service.returnObjTab().length - 1; i >= 0; i--) {
       console.log(service.returnObjTab()[i]._name);
       if (service.returnObjTab()[i]._name === equipmentList[0]._name) {
         service.map.drop(service.returnObjTab()[i]);
         for (var j = service.map._objects.length - 1; j >= 0; j--) {
           if (service.map._objects[j]._name === service.returnObjTab()[i]._name) {
             var bot = service.map._objects[0];
             if (bot._direction === 2 || bot._direction === 2) {
               service.map._objects[j]._posX = bot._posX - 1;
               service.map._objects[j]._posY = bot._posY;
             } else if (bot._direction === 1 || bot._direction === 3) {
               service.map._objects[j]._posX = bot._posX;
               service.map._objects[j]._posY = bot._posY + 1;
             }
             listOfStaticObjects.push(honey);
             drawStaticElements(service.map._objects, listOfStaticObjects);
             break;
           }
         }
       }
     }
     drawEquipment();
     if (botArr.length != 0) {
       for (var k = listOfStaticObjects.length - 1; k >= 0; k--) {
         if (listOfStaticObjects[k]._name === botArr[0]._name) {
           listOfStaticObjects[k].draw(15 + (i * 0), 15, canvasEquipment, ctxEquipment, sprite);
           listOfStaticObjects.splice(k, 1);
           console.log(listOfStaticObjects);
         }
       }
     }
     equipmentList.splice(0, 1);
     //if ((this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY-1)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY+1)){
     console.log(service.map._objects[0].currentPositionAndDirection().posY);
   }
   //setInt fo ctxAnimationObjects - we can add more animated objectsss
   setInterval(function() {
     ctxAnimationObjects.clearRect(0, 0, canvasAnimationObjects.width, canvasAnimationObjects.height);
     drawBee(bee1);
     drawBee(bee2);
   }, 30);

   function drawBot(object, spriteX, spriteY) {
     var sprite = new Image();
     sprite.src = 'img/botSprite.png';
     ctxAnimation.drawImage(sprite, spriteX, spriteY, object._spriteWidth, object._spriteHeight, object._posX * onePixel, object._posY * onePixel, object._width, object._height);
   };
   var allFrames = 1;
   var countFrame = 1;
   var viewBotDirection = 1;
   function animateBotMove(movingImg, canvas, context, startTime, posX, posY, moveInfo) {
     var startPosition = {
       x: 1,
       y: 1
     }
     var pixelsForSecond = 150;
     var frameForSecond = 60;
     var cellSize = 50;

     var newCoordinate = (pixelsForSecond/frameForSecond)/cellSize; //odległość do przesunięcia

     if(moveInfo != "forward"){
       newCoordinate = 0;
     }
     context.clearRect(0, 0, canvas.width, canvas.height); //wyczyść
     if (allFrames <= 60){ //jeśli startujemy i bot musi się pojawić
       movingImg._posY = startPosition.y;
       movingImg._posX = startPosition.x;
       drawBot(movingImg, 10, 230);
     }
     else if (service.map._objects[0]._direction == 1){
       movingImg._posX += newCoordinate;
       drawBot(movingImg, 10, 230);
       viewBotDirection = 1;
       for (var i = 0; i < currentItemList.length; i++) {
               currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
               currentItemList[i]._posY = movingImg._posY * onePixel;
             };
     }else if (service.map._objects[0]._direction == 2) {
       movingImg._posY += newCoordinate;
       drawBot(movingImg, 10, 10);
       viewBotDirection = 2;
       for (var i = 0; i < currentItemList.length; i++) {
               currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
               currentItemList[i]._posY = movingImg._posY * onePixel;
             };
     }else if (service.map._objects[0]._direction == 3) {
       movingImg._posX -= newCoordinate;
       drawBot(movingImg, 230, 10);
       viewBotDirection = 3;
       for (var i = 0; i < currentItemList.length; i++) {
               currentItemList[i]._posX = movingImg._posX * onePixel;
               currentItemList[i]._posY = movingImg._posY * onePixel - onePixel - i * onePixel;
             };
     }else if (service.map._objects[0]._direction == 0) {
       movingImg._posY -= newCoordinate;
       drawBot(movingImg, 230, 230);
       viewBotDirection = 0;
       for (var i = 0; i < currentItemList.length; i++) {
               currentItemList[i]._posX = movingImg._posX * onePixel;
               currentItemList[i]._posY = movingImg._posY * onePixel + onePixel + i * onePixel;
             };
     }
     //TODO: zrobić animację podążania zwierząt za JSbotem

     // for (var i = 0; i < currentItemList.length; i++) {
     //         currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
     //         currentItemList[i]._posY = movingImg._posY * onePixel;
     //       };

     // if (service.map._objects[0]._direction == 1 || service.map._objects[0]._direction == 2) {
     //   if (newCoordinate > movingImg._posX) {
     //     if (newCoordinate <= posX) {
     //       movingImg._posX = newCoordinate;
     //       for (var i = 0; i < currentItemList.length; i++) {
     //         currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
     //         currentItemList[i]._posY = movingImg._posY * onePixel;
     //       };
     //     };
     //   }
     //   if (newCoordinate > movingImg._posY) {
     //     if (newCoordinate <= posY) {
     //       movingImg._posY = newCoordinate;
     //       for (var i = 0; i < currentItemList.length; i++) {
     //         currentItemList[i]._posX = movingImg._posX * onePixel;
     //         currentItemList[i]._posY = movingImg._posY * onePixel - onePixel - i * onePixel;
     //       };
     //     };
     //   }
     // } else if (service.map._objects[0]._direction == 3 || service.map._objects[0]._direction == 0) {
     //   if (0.05 * newCoordinate < movingImg._posX) {
     //     if (currentX - 0.01 * newCoordinate >= posX) {
     //       movingImg._posX = currentX - 0.05 * newCoordinate;
     //       for (var i = 0; i < currentItemList.length; i++) {
     //         currentItemList[i]._posX = movingImg._posX * onePixel + onePixel + i * onePixel;
     //         currentItemList[i]._posY = movingImg._posY * onePixel;
     //       };
     //     }
     //   }
     //   if (0.2 * newCoordinate < movingImg._posY) {
     //     if (currentY - 0.01 * newCoordinate >= posY) {
     //       movingImg._posY = currentY - 0.05 * newCoordinate;
     //       for (var i = 0; i < currentItemList.length; i++) {
     //         currentItemList[i]._posX = movingImg._posX * onePixel;
     //         currentItemList[i]._posY = movingImg._posY * onePixel + onePixel + i * onePixel;
     //       };
     //     }
     //   }
     // }

     countFrame++;
     allFrames++;
     //equipment
     if (service.giveMeAllObj()[0]._arrayOfElements.length > equipmentList.length) {
       console.log("1" + equipmentList);
       pickEquipment();
       // console.log(equipmentList);
     } else if (service.map._objects[0]._arrayOfElements.length < equipmentList.length) {
       console.log("2" + equipmentList);
       dropEquipment();
     }


     //dropping followers animals
     // if (service.map._objects[0]._arrayOfElements.length > 0 && service.map._objects[0]._arrayOfElements.length<currentItemList.length) {
     //     currentItemList.splice(0,1);
     // }



     if (service.map._objects[0]._arrayOfElements.length > currentItemList.length) {
       for (var i = 0; i < service.map._objects[0]._arrayOfElements.length; i++) {
         switch (service.map._objects[0]._arrayOfElements[i]._name) {
           case "aurochs0":
             var aurochsItem = new view_model.Element_animated("aurochs0", 970, 10, 200, 200, undefined, undefined, undefined, undefined);
             currentItemList.push(aurochsItem);
             var index = listOfStaticObjects.indexOf(aurochs0);
             listOfStaticObjects.splice(index, 1);
             ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
             drawStaticElements(service.map._objects, listOfStaticObjects);
             break;
           case "littleDuck":
             var littleDuckItem = new view_model.Element_animated("littleDuckItem", 970, 570, 100, 100, undefined, undefined, undefined, undefined);
             currentItemList.push(littleDuckItem);
             var index = listOfStaticObjects.indexOf(littleDuckItem);
             listOfStaticObjects.splice(index, 1);
             ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
             drawStaticElements(service.map._objects, listOfStaticObjects);
             break;
           case "bee":
             var beeItem = new view_model.Element_animated("beeItem", 650, 230, 200, 200, undefined, undefined, undefined, undefined);
             currentItemList.push(beeItem);
             break;
         }
       };
     };

     for (var i = 0; i < currentItemList.length; i++) {
       drawItem(currentItemList[i], ctxAnimation, onePixel, currentItemList[i]._posX, currentItemList[i]._posY);
     };
     if (countFrame > frameForSecond){
        countFrame = 1;
      }
     else{
        requestAnimFrame(function() {
          animateBotMove(movingImg, canvas, context, startTime, posX, posY, moveInfo);
        });
      }

   };
   var animateMove = function(moveInfo) {
     // ctxAnimation.clearRect(0, 0, canvasAnimation.width, canvasAnimation.height);
     animateBotMove(bot, canvasAnimation, ctxAnimation, 0, service.map._objects[0]._posX, service.map._objects[0]._posY, moveInfo);
   };

   var _showMeLvlView = function(lvl) {
     var whatLvl = lvl - 1;
     if ((whatLvl < 0) || (whatLvl > service.getGameObj().countLevels - 1)) {
       console.log("CAM_VIEW_ERROR: Podany do funkcji level nie istnieje");
     } else {
       var demX = service.getGameObj().levelSet[whatLvl].viewPortPoz.pozX * onePixel;
       var demY = service.getGameObj().levelSet[whatLvl].viewPortPoz.pozY * onePixel;
       if ((demX >= viewPort._posX) && (demY >= viewPort._posY)) {
         //1
         mapMove('right', viewPort._posX + demX);
         mapMove('bottom', viewPort._posY + demY);
       } else if ((demX <= viewPort._posX) && (demY >= viewPort._posY)) {
         //2
         mapMove('left', viewPort._posX - demX);
         mapMove('bottom', viewPort._posY + demY);
       } else if ((demX <= viewPort._posX) && (demY <= viewPort._posY)) {
         //3
         mapMove('left', viewPort._posX - demX);
         mapMove('top', viewPort._posY - demY);
       } else if ((demX >= viewPort._posX) && (demY <= viewPort._posY)) {
         //4
         mapMove('right', viewPort._posX + demX);
         mapMove('top', viewPort._posY - demY);
       }
     }
   };

   var _updateCamView = function() {
     //bot position in pixels
     var botPosition = {
       x: (service.returnObjTab()[0].currentPositionAndDirection().posX + 1) * onePixel,
       y: (service.returnObjTab()[0].currentPositionAndDirection().posY + 1) * onePixel
     };
     if (botPosition.y - viewPort._posY <= 2 * onePixel) {
       mapMove('top');
     }
     if (viewPort._height - (botPosition.y - viewPort._posY) <= 2 * onePixel) {
       mapMove('bottom');
     }
     if (botPosition.x - viewPort._posX <= 2 * onePixel) {
       mapMove('left');
     }
     if (viewPort._width - (botPosition.x - viewPort._posX) <= 2 * onePixel) {
       mapMove('right');
     }
   };


//TODO: przy przesuwaniu w trakcie gry po przeskoku ręcznym bota coś się psuje i źle podnosi mapkę
   var mapMove = function(_direct, _pixels) {
     var temp = 150;

     if (_pixels === undefined) {
       _pixels = temp;
     }
     if (_direct === "top") {
       if (viewPort._posY - _pixels <= 0) {
         _pixels = viewPort._posY;
       }
       referenceMap.css('top', "+=" + _pixels + "px");
       viewPort._posY -= _pixels;
     } else if (_direct === "bottom") {
       if (viewPort._posY + viewPort._height + _pixels >= mapProp._height) {
         _pixels = mapProp._height - viewPort._posY - viewPort._height;
       }
       referenceMap.css('top', "-=" + _pixels + "px");
       viewPort._posY += _pixels;
     } else if (_direct === "left") {
       if (viewPort._posX - _pixels <= 0) {
         _pixels = viewPort._posX;
       }
       referenceMap.css('left', "+=" + _pixels + "px");
       viewPort._posX -= _pixels;
     } else if (_direct === "right") {
       if (viewPort._posX + viewPort._width + _pixels >= mapProp._width) {
         _pixels = mapProp._width - viewPort._posX - viewPort._width;
       }
       referenceMap.css('left', "-=" + _pixels + "px");
       viewPort._posX += _pixels;
     }
     console.log(viewPort._posX, viewPort._posY);
   };

   window.requestAnimFrame = (function(callback) {
     return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 30);
            };
   })();


   // drawBot(objectsCatalog.bot, 230, 230);
   //TODO: zrobić rysowanie robota przy starcie - nie działa chyba dlatego, że rysuje się zanim pojawi się wgl canvas
   //z jakiegoś powodu jedno narysowanie bota nie wystarcza
    window.onload = function(){
      animateBotMove(bot, canvasAnimation, ctxAnimation, 0, 50, 50);
    };

   var _displayPlace = function(_what) {
     $('.place').text(_what);
   };
   var _displayAdvice = function(_what) {
     $('span.message.typing-slider').text(_what);
   };
   var _displayError = function(_what) {
     $('span.errorMessage').text(_what);
   };

   var clearAnimals = function() {
     currentItemList.splice(0, 1);
   };

   //TODO: Napisać funckję animującą przesuwanie elementów


   var _specialAnimation = function(what){
     switch (what) {
       case "AcrossTheWater":
         animateMove("forward");
         view.mapMove('top');
         // setTimeout(function(){
         //   animateMove("forward");
         //   view.mapMove('top');
         //   setTimeout(function(){
         //     view.mapMove('top');
         //     setTimeout(function(){
         //       view.mapMove('top');
         //     }, 1200);
         //   }, 1200);
         // }, 1200);
         //TODO: dodać przesuwanie tratwy za pomocą funkcji smoothMovingAnimationElements()
         break;
       default:

     }
     //TODO: Bląd przesuwania okna
   };

   var smoothMovingAnimationInfo = {
     previousCoordinate: {x:0, y:0},
     frameCounter: 0
   };

   var _smoothMovingAnimationElements = function(element, demandX, demandY){
     smoothMovingAnimationInfo.frameCounter++;
      //mechanika poruszania się
    var variableSingleFrameX;
    var variableSingleFrameY;

    variableSingleFrameX = element._posX


      //poruszanie się po mapie elementu
    element._posX = variableSingleFrameX;
    element._posy = variableSingleFrameY;
    ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
    drawStaticElements(service.map._objects, listOfStaticObjects);

    console.log("TEST: Iteracja "+smoothMovingAnimationInfo.frameCounter+"");
    if (smoothMovingAnimationInfo.frameCounter === 60){


       //zeruj licznik klatek
       smoothMovingAnimationInfo.frameCounter = 0;
       //zapisuję koordynaty jako poprzednie - dotyczy całego ruchu, a nie pojedyńczej klatki
       smoothMovingAnimationInfo.previousCoordinate.x = demandX;
       smoothMovingAnimationInfo.previousCoordinate.y = demandY;
       console.log("TEST: Ostatnie wykonanie");
     }
     else {
       //wywolanie rekurencyjne
       requestAnimFrame(function() {
         _smoothMovingAnimationElements(element, demandX, demandY)
       });
     }
   };

   //temporary call
   // _smoothMovingAnimationElements(service.map._objects[6], 18, 10);

   return {
     animateMove: animateMove,
     animateBotMove: animateBotMove,
     updateCamView: _updateCamView,
     showMeLvlView: _showMeLvlView,
     displayPlace: _displayPlace,
     displayAdvice: _displayAdvice,
     displayError: _displayError,
     redrawRoad: redrawRoad,
     drawEquipment: drawEquipment,
     clearAnimals: clearAnimals,
     specialAnimation: _specialAnimation,
     mapMove: mapMove,
     smoothMovingAnimationElements: _smoothMovingAnimationElements
     // stopAnim :stopAnim
     // rotate: rotate,
     // cancelRotateAnim: cancelRotateAnim
   };

 })();
