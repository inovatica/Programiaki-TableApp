<template>
  <div id="mainJSbot">
  <div class="absoluteElements">
    <button id="backbutton" class="absoluteElements__backButton">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </button>
    <div class="backWindow no-disp">
      <a href="#">Lista gier</a>
    </div>
  </div>
  <div class="game-view">
    <div class="game-view__window">
      <div class="game-view__move">
        <canvas id="gameView"></canvas>
        <canvas id="gameViewObjects"></canvas>
        <canvas id="gameViewAnimation"></canvas>
        <canvas id="gameViewAnimationObjects"></canvas>
      </div>
    </div>
    <div class="game-view__messagePanel">

      <div class="bg-botFront"></div>
      <span class="sign"> > </span>
      <span class="message typing-slider">
                 Nie mogę znaleźć wyjścia. Idź po miodek, aby podarować go pszczółkom.
        <!--<p>Weź miodek i uciekaj!</p>-->
                </span>
      <div class="game-view__controllPanel float-left">
        <button class="nextMoveButton">WYKONAJ RUCH</button>
        <div class="locationMessage">
          <span class='colonInitial'>Obok mnie: </span>
          <span class="place"><!-- Gniazdo pszczół. --></span>
          <span class="errorMessage"><!-- Ruch niedozwolony! --></span>
        </div>
      </div>
      <canvas class="float-right" id="equipment"></canvas>
    </div>
  </div>
  </div>
</template>


<script>
  import $ from "jquery";
  export default {
    mounted(){

    },
    created(){
    },
    data(){
      return {
      }
    },
    components: {

    },
    computed: {

    },
    methods: {

    }
  };
// $(document).ready(()=>{
//
//   var ipGlobal = "172.16.0.2";
//   var portGlobal = "8886"
//
//   //stół
//   //sygnał usuwania karty
//   var removeCardSingnal = '404';
//
//   $(document).ready(function() {
//
//
//     var animationDuration = 1050; //ms  1000 to za mało, gdyż czasami program wywala błędy, więc 1050
//
//     //flags
//     var backWindowDisplay = false;
//
//     //$('.absoluteElements__backButton').on('click', animate());
//
//     $('#backbutton').on('click', function() {
//       if (backWindowDisplay === false) {
//         $('.backWindow').removeClass('no-disp');
//         backWindowDisplay = true;
//       } else {
//         $('.backWindow').addClass('no-disp');
//         backWindowDisplay = false;
//       }
//     });
//
//     $('.nextMoveButton').on('click', function() {
//       service.getDataFromTable().then(function(dataFromTable) {
//         service.sendEventToSocket(JSON.stringify({eventName:'listMoves', data:dataFromTable}));
//         var data = service.nextMove(dataFromTable);
//         var setTime = function(i) {
//           setTimeout(function() {
//             service.sendEventToSocket(JSON.stringify({eventName:'nextMove', data:dataFromTable}));
//             view.animateMove(data[i].call(service.map));
//             service.advice();
//             service.whatPlace();
//             //TODO: najprawdopodobniej trzeba będzie zrobić warunek dla advice i whatPlace bo się pochrzanią - sprawdzić
//             $('.message').text(service.advice());
//             if (i-1 == length) {
//               service.clearTable();
//               service.giveMeSocket().send(JSON.stringify(({task: 'last_state'})));
//             }
//           }, animationDuration * (i + 1));
//         };
//         for (var i = 0; i < data.length; i++) {
//           setTime(i);
//         }
//       });
//     });
//
//   });
//
//
//   var elements_model = (function () {
//
//     var SingleElement = function (posX, posY, name, direction, visible, canBeGet, active, namePol) {
//
//       this._posX = posX;
//       this._posY = posY;
//       this._name = name;
//       this._direction = direction;
//       this._visible = visible;
//       this._canBeGet = canBeGet;
//       this._active = active;
//       this._arrayOfElements = [];
//       this._namePol = namePol;
//     };
//
//
//     SingleElement.prototype.turnLeft = function () {
//       this._direction -= 1;
//
//       if(this._direction == -1) {
//         this._direction = 3;
//       }
//       console.log("left");
//       return this._direction;
//     };
//
//     SingleElement.prototype.turnRight = function () {
//       this._direction += 1;
//       if(this._direction == 4) {
//         this._direction = 0;
//       }
//       console.log("right");
//       return this._direction;
//     };
//
//     SingleElement.prototype.goStraight = function (add) {
//       var dir = this._direction;
//
//       if (add === undefined) {
//         add = 3;
//       }
//
//       if(dir == 0) {
//         this._posY -= add;
//       } else if(dir == 1) {
//         this._posX += add;
//       } else if(dir == 2) {
//         this._posY += add;
//       } else if(dir == 3) {
//         this._posX -= add;
//       }
//       return {
//         posX: this._posX,
//         posY: this._posY
//       }
//     };
//
//     SingleElement.prototype.currentPositionAndDirection = function () {
//       return {
//         posX: this._posX,
//         posY: this._posY,
//         direction: this._direction
//       }
//     };
//
//     var JSbot = function (posX, posY, name, direction, visibile, canBeGet, alone, arrayOfElements) {
//       SingleElement.call(this, posX, posY, name, direction, visibile, canBeGet);
//       this._alone = true;
//       this._arrayOfElements = [];
//       this._direction = 1; // poczatkowy kierunek
//     };
//
//     JSbot.prototype = Object.create(SingleElement.prototype);
//     // Dziedziczenie nam nadpisywalo ponizsze proto ()
//
//
//     JSbot.prototype.addElementToArray = function (element) {
//       this._arrayOfElements.push(element);
//       console.log(this._arrayOfElements);
//       return this._arrayOfElements;
//     };
//
//     JSbot.prototype.deleteElementToArray = function (item) {
//       this._arrayOfElements = this._arrayOfElements.filter(function (element) {
//         if (element._name !== item._name) {
//           return element;
//         }
//       });
//       console.log(this._arrayOfElements);
//       return this._arrayOfElements;
//     };
//
//     JSbot.prototype.getArrayOfElements = function () {
//       return this._arrayOfElements;
//     };
//
//
//     return {
//       JSbot: JSbot,
//       SingleElement: SingleElement
//     }
//   })();
//
//
//   var map_model = (function() {
//
//     var Map = function(matrix, objects, objectsMoving, accessFlags) {
//       this._matrix = matrix;
//       this._objects = objects;
//       this._objectsMoving = objectsMoving;
//       this._accessFlags = accessFlags;
//       this._matrixHeight = matrix.length;
//       this._matrixWidth = matrix[0].length;
//       this.bot = this._objects[0];
//
//       //funkcja z API serwisu zwracjąca tablice z referencjami do obiektów;
//       // this._objects = //funkcja z API serwisu zwracjąca tablice z referencjami do obiektów;
//     };
//
// //object.turn('r') lub object.turn('l')
//     Map.prototype.turn = function(direction){
//       if(direction === 'r'){
//         this._objects[0].turnRight();
//       }
//       else if (direction === 'l'){
//         this._objects[0].turnLeft();
//       }
//       else{
//         return 'wrong direction';
//       }
//       return "turn";
//     };
//
//     Map.prototype.forward = function(force){
//       var changeAccept = true;
//       var demandPos = {};
//       // obliczanie żądanej pozycji
//       if(this.bot.currentPositionAndDirection().direction === 1){
//         demandPos.x = this.bot.currentPositionAndDirection().posX + 3;
//         demandPos.y = this.bot.currentPositionAndDirection().posY;
//       }
//       else if(this.bot.currentPositionAndDirection().direction === 2){
//         demandPos.x = this.bot.currentPositionAndDirection().posX;
//         demandPos.y = this.bot.currentPositionAndDirection().posY +3;
//       }
//       else if(this.bot.currentPositionAndDirection().direction === 3){
//         demandPos.x = this.bot.currentPositionAndDirection().posX - 3;
//         demandPos.y = this.bot.currentPositionAndDirection().posY;
//       }
//       else if(this.bot.currentPositionAndDirection().direction === 0){
//         demandPos.x = this.bot.currentPositionAndDirection().posX;
//         demandPos.y = this.bot.currentPositionAndDirection().posY - 3;
//       }
//
//
//       //1. Sprawdzanie czy pozycja nie wychodzi poza mapę
//       if (((demandPos.y)===undefined)||((demandPos.x) === undefined)){
//         changeAccept = false;
//       }
//
//       else if((demandPos.x < 0)||(demandPos.x > this._matrixWidth)||(demandPos.y < 0)||(demandPos.y > this._matrixHeigt)){
//         changeAccept = false;
//       }
//
//
//       //3. Sprawdzanie czy demandPos to droga
//       else if (this._matrix[demandPos.y][demandPos.x] !== 2){
//         if (this._matrix[demandPos.y][demandPos.x] !== 7) {
//           changeAccept = false;
//         }
//       }
//       else if (this._matrix[demandPos.y][demandPos.x] === 2 || this._matrix[demandPos.y][demandPos.x] === 7){
//         if(this._objects[0].currentPositionAndDirection().direction === 0){
//           //góra
//           if((this._matrix[demandPos.y + 2][demandPos.x] !== 2)||(this._matrix[demandPos.y + 1][demandPos.x] !== 2)){
//             if ((this._matrix[demandPos.y + 2][demandPos.x] !== 7)||(this._matrix[demandPos.y + 1][demandPos.x] !== 7)) {
//               changeAccept = false;
//             }
//           }
//         }
//         else if(this._objects[0].currentPositionAndDirection().direction === 1){
//           //prawo
//           if((this._matrix[demandPos.y][demandPos.x - 1] !== 2)||(this._matrix[demandPos.y][demandPos.x - 2] !== 2)){
//             if ((this._matrix[demandPos.y][demandPos.x - 1] !== 7)||(this._matrix[demandPos.y][demandPos.x - 2] !== 7)) {
//               changeAccept = false;
//             }
//           }
//         }
//         else if(this._objects[0].currentPositionAndDirection().direction === 2){
//           //dół
//           if((this._matrix[demandPos.y -2][demandPos.x] !== 2)||(this._matrix[demandPos.y - 1][demandPos.x] !== 2)){
//             if((this._matrix[demandPos.y -2][demandPos.x] !== 7)||(this._matrix[demandPos.y - 1][demandPos.x] !== 7)){
//               changeAccept = false;
//             }
//           }
//
//         }
//         else if(this._objects[0].currentPositionAndDirection().direction === 3){
//           //lewo
//           if((this._matrix[demandPos.y][demandPos.x + 2] !== 2)||(this._matrix[demandPos.y][demandPos.x + 2] !== 2)){
//             if((this._matrix[demandPos.y][demandPos.x + 2] !== 7)||(this._matrix[demandPos.y][demandPos.x + 2] !== 7)){
//               changeAccept = false;
//             }
//           }
//         }
//       }
//
//       //4. Sprawdzanie czy na drodze nic nie leży
//       if (this._objects[0].currentPositionAndDirection().direction === 0){
//         for(var j = 0; j < this._objects.length; j++){
//           if (this._objects[j]._posX === demandPos.x){
//             if ((this._objects[j]._posY === demandPos.y)||(this._objects[j]._posY === demandPos.y+1)||(this._objects[j]._posY === demandPos.y+2)) {
//               changeAccept = false;
//               break;
//             }
//           }
//         }
//       }
//       else if (this._objects[0].currentPositionAndDirection().direction === 1){
//         for(var j = 0; j < this._objects.length; j++){
//           if (this._objects[j].posY === demandPos.y){
//             if ((this._objects[j]._posX === demandPos.x)||(this._objects[j]._posX === demandPos.x-1)||(this._objects[j]._posX === demandPos.x-2)){
//               changeAccept = false;
//               break;
//             }
//           }
//         }
//       }
//       else if (this._objects[0].currentPositionAndDirection().direction === 2){
//         for(var j = 0; j < this._objects.length; j++){
//           if (this._objects[j]._posX === demandPos.x){
//             if ((this._objects[j]._posY === demandPos.y)||(this._objects[j]._posY === demandPos.y-1)||(this._objects[j]._posY === demandPos.y-2)) {
//               changeAccept = false;
//               break;
//             }
//           }
//         }
//       }
//       else{
//         for(var j = 0; j < this._objects.length; j++){
//           if (this._objects[j].posY === demandPos.y){
//             if ((this._objects[j]._posX === demandPos.x)||(this._objects[j]._posX === demandPos.x+1)||(this._objects[j]._posX === demandPos.x+2)){
//               changeAccept = false;
//               break;
//             }
//           }
//         }
//       }
//       //Dopuszczenie do ruchu
//       if(changeAccept === true || force===true){
//         this._objects[0].goStraight();
//         view.updateCamView();
//         //wywołanie funkcji obsługujące zdażenia specjalne po ruchu z servisu
//         service.extraBehavior();
//         console.log("aktualna pozycja: "+this.bot.currentPositionAndDirection().posX+'-x, y-'+this.bot.currentPositionAndDirection().posY);
//         return "forward";
//       }
//       else{
//         console.log("Niedopuszczalny ruch");
//         return false;
//       }
//
//     };
//     Map.prototype.goForwardForce = function(x){
//       this._objects[0].goStraight(x);
//     };
//     Map.prototype.pickUp = function(){
//       for(var j = 1; j <= this._objects.length - 1; j++){
//         if ((this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY-1)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY+1)){
//           if ((this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX-1)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX+1)){
//             if(true){//this._objects[j]._active == true
//               this._objects[0].addElementToArray(this._objects[j]);
//               break;
//             }
//             else {
//               console.log("Nie można jeszcze podnieść");
//             }
//
//           }
//         }
//       }
//       return "pickup";
//     };
//
//     Map.prototype.drop = function(_obj){
//       console.log(this._objects[0]);
//       this._objects[0].deleteElementToArray(_obj);
//       return "drop";
//     };
//
//     Map.prototype.ifNextToSomething = function(){
//       for(var j = 1; j <= this._objects.length - 1; j++){
//         if ((this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY-1)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY+1)){
//           if ((this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX-1)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX+1)){
//             return this._objects[j];
//           }
//         }
//       }
//       return false;
//     };
//
//     // var Card = function(data){
//     //      this.id = data.id;
//     //      this.card_num = data.card_num;
//     //      this.card = {};
//     //      this.card.id = data.object.id;
//     //      this.card.type = data.object.type;
//     //      this.card.title = data.object.title;
//     //      this.card.card_id = data.object.card_id;
//     //  };
//
//
//
//     return {
//       Map: Map
//       //Card: Card
//     }
//   })();
//
//
//   var model = (function(){
//
//     var Card = function(_cardId, _objectId,  _type, _name, _imageUrl, _soundUrl, _cardNumber){
//       this.cardId = _cardId;
//       this.cardNumber = _cardNumber;
//       this.type = _type;
//       this.name = _name;
//       this.imageUrl = _imageUrl;
//       this.soundUrl = _soundUrl;
//     };
//
//     var Table = function(_slotNames){
//       this.cards = [];
//       this.slotNames = _slotNames;
//     };
//     Table.prototype.fillTable = function(slotArray){
//       this.cards = slotArray;
//     };
//     Table.prototype.clearTable = function(){
//       this.cards = [];
//     };
//     Table.prototype.giveMeCards = function(){
//       return this.cards;
//     };
//     return {
//       Card: Card,
//       Table: Table
//     };
//
//   })();
//
//   var view_model = (function() {
//     var Background_element = function(src) {
//       this._imgSrc = src;
//     }
//
//     Background_element.prototype.draw = function(array, canvas, context, numberFromArray, onePixel) {
//       var img = new Image;
//       img.src = this._imgSrc;
//       img.onload = function() {
//         for (var j = 0; j < array.length; j++) {
//           for (var i = 0; i < array[j].length; i++) {
//             if (array[j][i] == numberFromArray) {
//               context.drawImage(img, i * onePixel, j * onePixel, onePixel, onePixel);
//             }
//           }
//         }
//       }
//     }
//
//     var Element = function(name, spriteX, spriteY, spriteWidth, spriteHeight, width, height) {
//       this._name = name;
//       this._spriteX = spriteX;
//       this._spriteY = spriteY;
//       this._spriteWidth = spriteWidth;
//       this._spriteHeight = spriteHeight;
//       this._width = width;
//       this._height = height;
//     }
//
//
//
//     Element.prototype.draw = function(positionX, positionY, canvas, ctx,sprite) {
//
//       ctx.drawImage(sprite, this._spriteX, this._spriteY, this._spriteWidth, this._spriteHeight, positionX, positionY, this._width, this._height);
//
//     }
//
//     var Element_animated = function(name, spriteX, spriteY, spriteWidth, spriteHeight, width, height, posX, posY) {
//       Element.call(this, name, spriteX, spriteY, spriteWidth, spriteHeight, width, height);
//       this._posX = posX;
//       this._posY = posY;
//     }
//
//     Element_animated.prototype.drawAnim = function(object, context, sprite) {
//       context.drawImage(sprite, object._spriteX, object._spriteY, object._spriteWidth, object._spriteHeight, object._posX, object._posY, object._width, object._height);
//     }
//
//     Element_animated.prototype.updateBee = function(coordinate, borderDown, borderUp) {
//       // var borderUp = coordinate + onePixel;
//       // var borderDown = coordinate;
//       var offset = Math.random() * 4 - 2;
//       coordinate += offset;
//       if (coordinate > borderUp) {
//         coordinate = borderUp;
//       }
//       if (coordinate < borderDown) {
//         coordinate = borderDown;
//       }
//       return coordinate;
//     };
//
//     return {
//       Background_element: Background_element,
//       Element: Element,
//       Element_animated: Element_animated
//     }
//   })();
//
//
//   var service = (function () {
//
//     var listOfObjects = [];
//     var listOfAnimObjects = [];
//     var listOfMovingObjects = [];
//     var dataFromTable = [];
//     var referenceMap = $(".game-view__move");
//
//     if(screen.orientation.type == "landscape-secondary"){
//       tableData.orientation = "up";
//     }
//
//     //Tworzenie Obiektów
//
//     var availableData = [];
//     var socket = new WebSocket("ws://"+ipGlobal+":"+portGlobal);
//     function giveMeSocket(){
//       return socket;
//     };
//     var socketEventInfo = {
//       allMoves: "allMoves",
//       nextMove: "nextMove"
//     };
//
//     var isJsonString = function(str) {
//       try {
//         JSON.parse(str);
//       } catch (e) {
//         return false;
//       }
//       return true;
//     };
//
//     //funkcja tworzy sobie jsona z danych z socketów, ponieważ reszta programu takiego potrzebuje
//
//     socket.onmessage = function(res){
//       console.log("Web Socket Message: "+res.data);
//       onMessSocket(res);
//     };
//     socket.onopen = function(res){
//       //wyślij info, że chce karty startowe
//       socket.send(JSON.stringify(({task: 'last_state'})));
//       console.log("Otwarto połączenie WebSocket");
//     };
//     socket.onerror = function(){
//       console.log("Błąd polączenia, restartuję za...");
//       var timeC = 3;
//       for (var i = 1; i <= 3; i++) {
//         setTimeout(function(){
//           console.log((timeC--)+"..");
//         }, 1000*i);
//       }
//       setTimeout(function(){
//         location.reload();
//       },4000);
//     };
//     socket.onclose = function(){
//       console.log("Błąd polączenia, restartuję za...");
//       var timeC = 3;
//       for (var i = 1; i <= 3; i++) {
//         setTimeout(function(){
//           console.log((timeC--)+"..");
//         }, 1000*i);
//       }
//       setTimeout(function(){
//         location.reload();
//       },4000);
//     };
//
//     var tableData = {
//       rzad: 5,
//       wiersz: 8,
//       start: 48,
//       start2: 60,
//       orientation: "down" //down/up
//     };
//     var Table;
//     var slotNames;
//     var slotNamesUp;
//     pushSlotNames();
//
//     function pushSlotNames(slotNames){
//       slotNames = [];
//       slotNamesUp = [];
//       //część górna
//       for (var i = 0; i < tableData.wiersz; i++){
//         for (var j = 0; j < tableData.rzad ; j++){
//           slotNames.unshift(tableData.start + '_' + j);
//         }
//         tableData.start++;
//       }
//       //część dolna
//       for (var i = 0; i < tableData.wiersz; i++){
//         for (var j = tableData.rzad -1; j >= 0; j--){
//           slotNamesUp.unshift(tableData.start2 + '_' + j);
//         }
//         tableData.start2++;
//       }
//
//       if (tableData.orientation == "down") {
//         Table = new model.Table(slotNames);
//       }
//       else {
//         Table = new model.Table(slotNamesUp);
//       }
//     };
//
//     function cardFinder(cardNumb){
//       for (var value of availableData){
//         if (value.cardId.card_num == cardNumb){
//           return value;
//         }
//       }
//       //karta z poza gry
//       return '404';
//     };
//
//     function sanitResponse(_res){
//       var _cleanArray = [];
//       var count = 0;
//       for (var variable in _res) {
//         if (_res.hasOwnProperty(variable)) {
//           for (var i = 0; i < 5; i++) {
//             if(_res[variable][i] != "404"){
//               if (_res[variable][i] != "204") {
//                 for (var var1 = 0; var1 < Table.slotNames.length; var1++) {
//                   if (Table.slotNames[var1] == variable+"_"+i){
//                     if (cardFinder(_res[variable][i]).cardId != undefined) {
//                       _cleanArray.unshift(cardFinder(_res[variable][i]).cardId);
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       console.log(_cleanArray);
//       return _cleanArray;
//     };
//
//     function fillSocketMap(_res){
//       var res = sanitResponse(_res);
//       Table.fillTable(res);
//     };
//
//     var onMessSocket = function(res){
//       if (isJsonString(res.data)){
//         if(JSON.parse(res.data).start != undefined){
//           fillSocketMap(JSON.parse(res.data).start);
//         }
//         else if(JSON.parse(res.data).cards != undefined){
//           fillSocketMap(JSON.parse(res.data).cards);
//         }
//       }
//     };
//
//     var _sendEventToSocket = (name) =>{
//       socket.send(name);
//     };
//
//
//
//     var bot = new elements_model.JSbot(1, 1, "JSbot", 3, true, false, false, 'JSbot'); //25, 22
//     var aurochs0 = new elements_model.SingleElement(5, 14, "aurochs0", 0, true, false, true, "Drugi żubr");
//     var aurochs1 = new elements_model.SingleElement(14, 17, "aurochs1", 0, true, false, false, "Pierwszy żubr");
//     var bees =  new elements_model.SingleElement(3, 2, "bee", 0, true, false, false, "Pszczółki");
//     var honey =  new elements_model.SingleElement(8, 2, "honey", 0, true, true, true, "Miodek"); //99
//     var momDuckCry =  new elements_model.SingleElement(23, 13, "momDuckCry", 0, false, false, false, "Kacza Mama");
//     var raft =  new elements_model.SingleElement(20.5, 10, "raft", 0, true, false, false, "Kładka");
//     var rope =  new elements_model.SingleElement(18, 21, "rope", 0, true, true, false, "Lina");//18, 21
//     var littleDuck =  new elements_model.SingleElement(26, 21, "littleDuck", 0, true, false, true, "Kaczuszka");
//     var bear =  new elements_model.SingleElement(26, 5, "bear", 0, false, false, "Niedźwiedź");
//     var chrisTree =  new elements_model.SingleElement(26, 3, "chrisTree", 0, true, false, false, "Wielka Choinka");
//
//     var firstLayer = [
//       [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
//       [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3],
//       [4, 5, 3, 5, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 5, 2, 1, 1, 2, 4],
//       [3, 5, 4, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 2, 3],
//       [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 4],
//       [3, 2, 1, 1, 2, 5, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 2, 3],
//       [4, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 2, 4],
//       [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3],
//       [4, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 4],
//       [3, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3],
//       [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 4],
//       [3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3],
//       [4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
//       [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 1, 1, 1, 2, 1, 1, 5, 5, 5, 5, 3],
//       [4, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1, 1, 2, 5, 5, 5, 5, 5, 5, 5, 1, 2, 1, 1, 1, 1, 5, 2, 4],
//       [3, 2, 4, 4, 2, 1, 1, 2, 4, 4, 2, 1, 1, 2, 5, 5, 5, 5, 5, 1, 1, 1, 2, 1, 1, 5, 5, 1, 2, 3],
//       [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
//       [3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 1, 2, 3],
//       [4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 4],
//       [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
//       [4, 2, 1, 1, 2, 3, 3, 2, 1, 1, 2, 1, 5, 2, 5, 1, 2, 1, 1, 2, 1, 1, 2, 1, 5, 2, 5, 1, 2, 4],
//       [3, 2, 1, 1, 2, 4, 4, 2, 1, 1, 2, 5, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 3],
//       [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
//       [3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
//     ];
//
//     var getFirstLayer = function(){
//       return firstLayer;
//     }
//
//     var gameInfo = {
//
//       countLevels: 5,
//       actualLevel: 1,//1
//       accessFlags: {waterAccess: false},
//       errors: ['Nie możesz iść w tym kierunku', 'Nie możesz podnieść tego przedmiotu', 'Ruch niedozwolony'],
//       levelSet: [{
//         //pozycja w której ma się znaleźc robot, aby serwis rozpoczął zmianę widoku na następny lvl
//         botPoz: {pozX: 0, pozY: 0},
//         //pozycja na którą ma się ustawić view port po rozpoczęciu podanego lvl'u
//         viewPortPoz: {pozX: 0, pozY: 0},
//         //komunikaty
//         message: ['Nie mogę znaleźć wyjścia. Idź po miodek, aby dać go pszczółkom', 'Zanieś miodek pszczółkom'],
//         places: ['pszczółki'],
//         whatTake: honey,  //co można teraz podnieść?
//         giveWho: bees   //gdzie to cza zanieść?
//       }, {
//         botPoz: {pozX: 0, pozY: 12},
//         viewPortPoz: {pozX: 0, pozY: 12},
//         message: ["Zobacz, droga na dole mapy została odkryta!", "Zaprowadź żubra do jego kolegi!"],
//         places: ['pszczółki', 'żubry'],
//         whatTake: aurochs0,  //co można teraz podnieść?
//         giveWho: aurochs1,   //gdzie to cza zanieść?
//         placeToChange: function(){
//           //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
//           firstLayer[11][13] = 2;
//         },
//         extraFlag: false,
//         extraInfo: ["Chcesz przejść dalej? Przyprowadź mojego kolegę żubra, aby mi pomógł przesunąć kłodę."],
//         placeForExtraInfo: [16,13]
//       },{
//         botPoz: {pozX: 13, pozY: 16},
//         viewPortPoz: {pozX: 11, pozY: 10},
//         message: ["Kłoda odsunięta! Możemy iść dalej.", "Zaprowadź kaczątko do mamy"],
//         places: ['pszczółki', 'żubry'],
//         whatTake: littleDuck,  //co można teraz podnieść?
//         giveWho: momDuckCry,   //gdzie to cza zanieść?
//         placeToChange: function(){
//           //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
//           firstLayer[16][14] = 2;
//         },
//         extraFlag: false,
//         extraInfo: ["Chcesz przeprawić się przez rzekę? Pomogę Ci jeśli znajdziesz mojego synka i przyprowadzisz go do mnie."],
//         placeForExtraInfo: [13,22]
//       },
//         {
//           botPoz: {pozX: 0, pozY: 0},
//           viewPortPoz: {pozX: 11, pozY: 10},
//           message: ["Dziękuję za pomoc. Pomogę Ci przedostać się przez rzekę. Znajdę kłody do budowy tratwy, Ty w tym czasie znajdź linę do ich związania.", "Zanieś linę Kaczej Mamie."],
//           places: ['pszczółki', 'żubry'],
//           whatTake: rope,  //co można teraz podnieść?
//           giveWho: momDuckCry,   //gdzie to cza zanieść?
//           placeToChange: function(){
//             //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
//           },
//           extraFlag: false,
//           extraInfo: ["Teraz możesz swobodnie przejść przez rzekę."],
//           placeForExtraInfo: [0,0]
//         },
//         {
//           botPoz: {pozX: 0, pozY: 0},
//           viewPortPoz: {pozX: 11, pozY: 10},
//           message: ["Tratwa zbudowana!", "Zanieś miodek Niedźwiadkowi."],
//           places: ['pszczółki', 'żubry'],
//           whatTake: rope,  //co można teraz podnieść?
//           giveWho: momDuckCry,   //gdzie to cza zanieść?
//           placeToChange: function(){
//             //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
//           },
//           extraFlag: false,
//           extraInfo: ["Teraz możesz swobodnie przejść przez rzekę."],
//           placeForExtraInfo: [0,0]
//         },
//         {
//           botPoz: {pozX: 13, pozY: 16},
//           viewPortPoz: {pozX: 11, pozY: 10},
//           message: ["Udało Ci się przedostać przez rzekę, biegnij uratować Krzysia!", "Zanieś miodek niedźwiadkowi."],
//           places: ['pszczółki', 'żubry'],
//           whatTake: rope,  //co można teraz podnieść?
//           giveWho: momDuckCry,   //gdzie to cza zanieść?
//           placeToChange: function(){
//             firstLayer[12][22] = 7;
//           },
//           extraFlag: false,
//           extraInfo: ["Ten niedźwiedź jest zbyt duży! Przynieś od pszczółek trochę miodku, by go przekupić."],
//           placeForExtraInfo: [4,27]
//         }],
//
//
//       _changeFlag: function (_flag, _bool) {
//
//         gameInfo.accessFlags[_flag] = _bool;
//
//       },
//
//       _showMeFlags: function () {
//         return accessFlags;
//       },
//       _setLevel: function (x) {
//         if ((x > 0) && (x <= countLevels)) {
//           actualLevel = x;
//         } else {
//           return false;
//         }
//       },
//     };
//
//     var _getGameObj = function () {
//       return gameInfo;
//     };
//
//
//
//     listOfMovingObjects.push(bees);
//     listOfAnimObjects.push(bot);
//     listOfObjects.push(bot, aurochs0,aurochs1, bees, honey, momDuckCry, raft, rope, littleDuck, bear, chrisTree);
//
//     var _giveMeAllObj = function(){
//       return listOfObjects;
//     }
//
//     var map = new map_model.Map(firstLayer, listOfObjects, listOfMovingObjects, gameInfo.accessFlags);
//
//     var whatPlace = function(){
//       if(!map.ifNextToSomething()){
//         view.displayPlace("");
//       }
//       else{
//         view.displayPlace(" "+map.ifNextToSomething()._namePol+" ");
//       }
//     };
//
//     var advice = function () {
//     };
//
//     var myMap = function(){
//       return map;
//     };
//
//     var writeToelements_Model1 = function (data) {
//       var myData = [];
//       //
//       myData = $.map(data, function (value, index) {
//         if (value === "404") {
//           return null;
//         }
//         return [value];
//       });
//       return myData;
//     };
//
//     var getDataFromTable = function (level) {
//       var getDataFromTablePromise = new Promise(
//         function (resolve, reject) {
//           resolve(Table.giveMeCards());
//         });
//       return getDataFromTablePromise;
//     };
//     function writeToModel(data) {
//       var myData = [];
//
//       for (let i = 0; i < data.length; i++) {
//         var tempObject = new model.Card(data[i]);
//
//         myData.push(tempObject);
//       }
//       return myData;
//     };
//
//     var getAvailableData = function (level) {
//       var getAvailableDataPromise = new Promise(
//         function (resolve, reject) {
//           let data = require('@/components/games/JSbot/main/jsbot_cards.json');
//           availableData = writeToModel(data);
//           console.log(availableData)
//                 resolve(availableData);
//
//
//           // if (availableData.length == 0) {
//           //   $.ajax({
//           //     type: "get",
//           //     dataType: "json",
//           //     url: "jsbot_cards.json",
//           //     success: function (data) {
//           //       availableData = writeToModel(data);
//           //       resolve(availableData);
//           //     },
//           //     complete: function () {
//           //     },
//           //     error: function (e) {
//           //       console.log(e);
//           //       // reject(e);
//           //     }
//           //   });
//           // } else {
//           //   resolve(availableData);
//           // }
//         });
//       return getAvailableDataPromise;
//     };
//
//     getAvailableData();
//
//
//
//     var howManyTimes = function (dataFromTable, i) {
//       switch (dataFromTable[i].object.title) {
//         case "*2":
//           return 2;
//           break;
//         case "*3":
//           return 3;
//           break;
//         case "*4":
//           return 4;
//           break;
//         case "*5":
//           return 5;
//           break;
//         default:
//           return 1;
//           break;
//       }
//     };
//     var extraBehavior = function(){
//       if(gameInfo.levelSet[gameInfo.actualLevel-1].extraFlag === false){
//         if((bot._posY == gameInfo.levelSet[gameInfo.actualLevel-1].placeForExtraInfo[0])&&(bot._posX == gameInfo.levelSet[gameInfo.actualLevel-1].placeForExtraInfo[1])){
//           if(bot._arrayOfElements[0] == gameInfo.levelSet[gameInfo.actualLevel-1].whatTake){
//             mainLogicGame('give');
//             gameInfo.levelSet[gameInfo.actualLevel-1].extraFlag === "true";
//             // view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].extraInfo[1]);
//           }
//           else{
//             view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].extraInfo[0]);
//           }
//         }
//       }
//       //rola funkcji polega na obsłudze nieregularnych sytuacji, np. przyprowadzenie żubra bez położenia karty "daj"
//       //lub wyświetlenie komunikatu  nieregularnym momencie
//       //funkcja wywoływana po KAŻDYM ruchu
//
//
//     };
//     var mainLogicGame = function (what){
//       if (what === 'give'){
//         //wywołanie give sprawdza, czy obiekt przekazywany jest prawidłowemu obiektowi dla danego etapu gry
//         if(gameInfo.levelSet[gameInfo.actualLevel-1].giveWho == map.ifNextToSomething() && bot._arrayOfElements[0] == gameInfo.levelSet[gameInfo.actualLevel-1].whatTake){
//           map.drop(gameInfo.levelSet[gameInfo.actualLevel-1].whatTake);
//           _getGameObj().actualLevel++;
//           //ustawianie flagi false - nie można potem już wziąć
//           // gameInfo.levelSet[gameInfo.actualLevel-1].whatTake.active = false;
//           //zmiana elementów mapy dla podanego poziomu
//           gameInfo.levelSet[gameInfo.actualLevel-1].placeToChange();
//           view.redrawRoad(getFirstLayer());
//           //wyświetlanie podpowiedzi dla następnego poziomu
//           view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].message[0]);
//           view.clearAnimals();
//         }
//         else{
//           //zmień komunikat na error
//           view.displayError(gameInfo.errors[2]);
//         }
//       }
//       else if(what === 'take'){
//         //wywołanie take sprawdza czy już coś się znajduję w tablicy obiektów którą posiada JSbot, czy podnosi on prawidłowy dla etapu gry obiekt
//         // oraz zmienia podpowiedzi
//         if((gameInfo.levelSet[gameInfo.actualLevel-1].whatTake == map.ifNextToSomething())&&(bot._arrayOfElements.length === 0)){
//           //czy mozna podnieść w tym momencie gry?
//           map.pickUp();
//           //zmien komunikat
//           view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].message[1]);
//         }
//         else{
//           //zmień komunikat na error
//           view.displayError(gameInfo.errors[1]);
//         }
//       }
//     };
//
//     var nextMove = function (dataFromTable) {
//       var action;
//       var multiplier = 1;
//       var sequence_of_moves = [];
//       for (var i = 0; i < dataFromTable.length; i++) {
//         switch (dataFromTable[i].object.title) {
//           case "Weź":
//             action = function(){
//               mainLogicGame("take");
//             };
//             break;
//           case "Daj":
//             action = function(){
//               mainLogicGame("give");
//             };
//             // action = function() {
//             //     service.map.drop(map._objects[0]._arrayOfElements[0]);
//             // };
//             break;
//           case "Prosto":
//             action = map.forward;
//             // console.log(map._objects[0]._posX , map._objects[0]._posY);
//             break;
//           case "Lewo":
//             action = function () {
//               map.turn('l');
//             };
//             break;
//           case "Prawo":
//             action = function () {
//               map.turn('r');
//             };
//             break;
//           default:
//             if (dataFromTable[i].object.type == "math") {
//               multiplier = howManyTimes(dataFromTable, i);
//             } else {
//               return;
//             }
//             break;
//         }
//
//         if (dataFromTable[i].object.title == "Weź" || dataFromTable[i].object.title == "Daj" || dataFromTable[i].object.title == "Prosto" ||
//           dataFromTable[i].object.title == "Lewo" || dataFromTable[i].object.title == "Prawo") {
//           for (var j = 0; j < multiplier; j++) {
//             // action.call(service.map);
//             sequence_of_moves.push(action);
//           }
//           multiplier = 1;
//         }
//
//       };
//       //animate.object(listOfObjects);
//       return sequence_of_moves;
//     };
//     var _returnObjTab = function () {
//       return listOfObjects;
//     };
//
//     function clearTable(){
//       Table.clearTable();
//     };
//
//     return {
//       howManyTimes: howManyTimes,
//       firstLayer: firstLayer,
//       nextMove: nextMove,
//       getDataFromTable: getDataFromTable,
//       showMeFlags: gameInfo._showMeFlags,
//       listOfAnimObjects: listOfAnimObjects,
//       map: map,
//       returnObjTab: _returnObjTab,
//       getGameObj: _getGameObj,
//       advice:advice,
//       myMap: myMap,
//       whatPlace: whatPlace,
//       mainLogicGame: mainLogicGame,
//       getFirstLayer: getFirstLayer,
//       extraBehavior: extraBehavior,
//       giveMeAllObj: _giveMeAllObj,
//       sendEventToSocket: _sendEventToSocket,
//       giveMeSocket: giveMeSocket,
//       clearTable: clearTable
//     }
//
//   })();
//
//
//   var view = (function() {
//
//     var layerWidth = 1500;
//     var layerHeight = 1200;
//     var canvasMain = document.getElementById('gameView');
//     canvasMain.width = layerWidth;
//     canvasMain.height = layerHeight;
//
//     var ctxMain = canvasMain.getContext('2d');
//
//     var canvasObjects = document.getElementById('gameViewObjects');
//     canvasObjects.width = layerWidth;
//     canvasObjects.height = layerHeight;
//     var ctxObj = canvasObjects.getContext('2d');
//
//     var canvasAnimation = document.getElementById('gameViewAnimation');
//     canvasAnimation.width = layerWidth;
//     canvasAnimation.height = layerHeight;
//     var ctxAnimation = canvasAnimation.getContext('2d');
//
//     var canvasAnimationObjects = document.getElementById('gameViewAnimationObjects');
//     canvasAnimationObjects.width = layerWidth;
//     canvasAnimationObjects.height = layerHeight;
//     var ctxAnimationObjects = canvasAnimationObjects.getContext('2d');
//
//     var canvasEquipment = document.getElementById('equipment');
//     var ctxEquipment = canvasEquipment.getContext('2d');
//     canvasEquipment.width = 150;
//     canvasEquipment.height = 80;
//
//     var drawEquipment = function() {
//       ctxEquipment.fillStyle = "#353535";
//       ctxEquipment.fillRect(0, 0, canvasEquipment.width, canvasEquipment.height);
//       ctxEquipment.strokeStyle = "#8cc236";
//       ctxEquipment.beginPath();
//       ctxEquipment.arc(40, 40, 30, 0, 2 * Math.PI);
//       ctxEquipment.moveTo(140, 40)
//       ctxEquipment.arc(110, 40, 30, 0, 2 * Math.PI);
//       ctxEquipment.stroke();
//     }
//
//     var onePixel = 50;
//
//     var objectSize = 50;
//
//     var sprite = new Image();
//     sprite.src = require('@/components/games/JSbot/main/img/css_sprites.png');
//
//     var currentItemList = [];
//
//     //okno
//     var referenceViewport = $('.game-view__window');
//     var referenceMap = $(".game-view__move");
//     var orderMoveArray = [];
//     var mapProp = {
//       _width: Number(referenceMap.css('width').substr(0, referenceMap.css('width').length - 2)),
//       _height: Number(referenceMap.css('height').substr(0, referenceMap.css('height').length - 2))
//     };
//
//     var viewPort = {
//       _width: Number(referenceViewport.css('width').substr(0, referenceViewport.css('width').length - 2)),
//       _height: Number(referenceViewport.css('height').substr(0, referenceViewport.css('height').length - 2)),
//       _posX: 0,
//       _posY: 0
//     };
//
//     var grass = new view_model.Background_element(require('@/components/games/JSbot/main/img/grass.jpg'));
//     var water = new view_model.Background_element(require('@/components/games/JSbot/main/img/water.jpg'));
//     var waterAccess = new view_model.Background_element(require('@/components/games/JSbot/main/img/waterMoveAccess.jpg'));
//     var road = new view_model.Background_element(require('@/components/games/JSbot/main/img/road_hor.jpg'));
//     var treeUp = new view_model.Background_element(require('@/components/games/JSbot/main/img/up.png'));
//     var small = new view_model.Background_element(require('@/components/games/JSbot/main/img/small.jpg'));
//     var treeDown = new view_model.Background_element(require('@/components/games/JSbot/main/img/root.png'));
//     var log = new view_model.Background_element(require('@/components/games/JSbot/main/img/log.jpg'));
//
//     grass.draw(service.firstLayer, canvasMain, ctxMain, 1, onePixel);
//     water.draw(service.firstLayer, canvasMain, ctxMain, 0, onePixel);
//     water.draw(service.firstLayer, canvasMain, ctxMain, 7, onePixel);
//     treeUp.draw(service.firstLayer, canvasMain, ctxMain, 3, onePixel);
//     treeDown.draw(service.firstLayer, canvasMain, ctxMain, 4, onePixel);
//     small.draw(service.firstLayer, canvasMain, ctxMain, 5, onePixel);
//     road.draw(service.firstLayer, canvasMain, ctxMain, 2, onePixel);
//     log.draw(service.firstLayer, canvasMain, ctxMain, 6, onePixel);
//
//     var redrawRoad = function(firstLayer) {
//       road.draw(firstLayer, canvasMain, ctxMain, 2, onePixel);
//     };
//
//     drawEquipment();
//
//     var listOfStaticObjects = [];
//
//     var bot = new view_model.Element_animated("bot", 230, 230, 200, 200, objectSize, objectSize, service.map._objects[0]._posX, service.map._objects[0]._posY);
//
//     var aurochs0 = new view_model.Element("aurochs0", 970, 10, 200, 200, objectSize * 1.5, objectSize * 1.5);
//     var aurochs1 = new view_model.Element("aurochs1", 970, 10, 200, 200, objectSize * 1.5, objectSize * 1.5);
//     var honey = new view_model.Element("honey", 230, 600, 200, 200, objectSize, objectSize);
//     var momDuckCry = new view_model.Element("momDuckCry", 280, 330, 300, 200, objectSize * 2, objectSize * 1.5);
//     var raft = new view_model.Element("raft", 10, 10, 300, 300, objectSize * 2, objectSize * 2);
//     var rope = new view_model.Element("rope", 450, 600, 200, 200, objectSize, objectSize);
//     var littleDuck = new view_model.Element("littleDuck", 970, 570, 100, 100, objectSize * 0.5, objectSize * 0.5);
//     var bear = new view_model.Element("bear", 10, 330, 250, 250, objectSize * 2, objectSize * 2);
//     var chrisTree = new view_model.Element("chrisTree", 330, 10, 300, 300, objectSize * 2, objectSize * 2);
//     var branch = new view_model.Element("branch", 970, 450, 200, 100, objectSize * 2, objectSize);
//
//     listOfStaticObjects.push(aurochs0, aurochs1, honey, momDuckCry, raft, rope, littleDuck, bear, chrisTree, branch);
//
//     var drawStaticElements = function(arr1, arr2) {
//       //draw elements from table
//       // sprite.onload = function() {
//       for (var i = arr1.length - 1; i >= 0; i--) {
//         for (var j = arr2.length - 1; j >= 0; j--) {
//           if (arr1[i]._name == arr2[j]._name) {
//             arr2[j].draw(arr1[i]._posX * onePixel, arr1[i]._posY * onePixel, canvasObjects, ctxObj, sprite);
//           }
//
//         }
//       };
//     }
//     var drawItem = function(object, context, pixel, posX, posY) {
//       var sprite = new Image();
//       sprite.src = (require('@/components/games/JSbot/main/img/css_sprites.png'));
//       context.drawImage(sprite, object._spriteX, object._spriteY, object._spriteWidth, object._spriteHeight, posX, posY, objectSize, objectSize);
//     };
//
//     sprite.onload = function() {
//       drawStaticElements(service.map._objects, listOfStaticObjects);
//     }
//
//     var bee1 = new view_model.Element_animated("bee", 650, 230, 200, 200, objectSize * 0.3, objectSize * 0.3, service.map._objectsMoving[0]._posX * onePixel, service.map._objectsMoving[0]._posY * onePixel);
//     var bee2 = new view_model.Element_animated("bee", 650, 230, 200, 200, objectSize * 0.3, objectSize * 0.3, service.map._objectsMoving[0]._posX * onePixel, service.map._objectsMoving[0]._posY * onePixel);
//
//     var drawBee = function(object) {
//       object.drawAnim(object, ctxAnimationObjects, sprite);
//       object._posX = object.updateBee(object._posX, service.map._objectsMoving[0]._posX * onePixel, service.map._objectsMoving[0]._posX * onePixel * 1.1);
//       object._posY = object.updateBee(object._posY, service.map._objectsMoving[0]._posY * onePixel, service.map._objectsMoving[0]._posY * onePixel * 1.1);
//       //ctxAnimationObjects.strokeRect(service.map._objects[4]._posX*onePixel, service.map._objects[4]._posX*onePixel*2, service.map._objects[4]._posY*onePixel, service.map._objects[4]._posY*onePixel*2);
//     };
//     var equipmentList = [];
//     //TODO: Poprawić animację znikania zwierząt "wciąganych do ekwipunku"
//     var pickEquipment = function() {
//       var botArr = service.giveMeAllObj()[0]._arrayOfElements;
//       for (var i = botArr.length - 1; i >= 0; i--) {
//         //if(botArr[i]._canBeGet === true) {
//         for (var j = listOfStaticObjects.length - 1; j >= 0; j--) {
//           if (listOfStaticObjects[j]._name === botArr[i]._name) {
//             listOfStaticObjects[j].draw(15 + (i * 70), 15, canvasEquipment, ctxEquipment, sprite);
//             listOfStaticObjects.splice(j, 1);
//             equipmentList.push(botArr[i]);
//             ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
//             drawStaticElements(service.map._objects, listOfStaticObjects);
//           }
//         }
//         //}
//       }
//       console.log(botArr);
//     };
//
//
//     //TODO: Poprawić animację pojawiania się zwierząt i rzeczy "wyrzucanych z ekwipunku"
//     var dropEquipment = function() {
//       var botArr = service.map._objects[0]._arrayOfElements;
//       ctxEquipment.clearRect(0, 0, canvasEquipment.width, canvasEquipment.height);
//       for (var i = service.returnObjTab().length - 1; i >= 0; i--) {
//         console.log(service.returnObjTab()[i]._name);
//         if (service.returnObjTab()[i]._name === equipmentList[0]._name) {
//           service.map.drop(service.returnObjTab()[i]);
//           for (var j = service.map._objects.length - 1; j >= 0; j--) {
//             if (service.map._objects[j]._name === service.returnObjTab()[i]._name) {
//               var bot = service.map._objects[0];
//               if (bot._direction === 2 || bot._direction === 2) {
//                 service.map._objects[j]._posX = bot._posX - 1;
//                 service.map._objects[j]._posY = bot._posY;
//               } else if (bot._direction === 1 || bot._direction === 3) {
//                 service.map._objects[j]._posX = bot._posX;
//                 service.map._objects[j]._posY = bot._posY + 1;
//               }
//               listOfStaticObjects.push(honey);
//               drawStaticElements(service.map._objects, listOfStaticObjects);
//               break;
//             }
//           }
//         }
//       }
//       drawEquipment();
//       if (botArr.length != 0) {
//         for (var k = listOfStaticObjects.length - 1; k >= 0; k--) {
//           if (listOfStaticObjects[k]._name === botArr[0]._name) {
//             listOfStaticObjects[k].draw(15 + (i * 0), 15, canvasEquipment, ctxEquipment, sprite);
//             listOfStaticObjects.splice(k, 1);
//             console.log(listOfStaticObjects);
//           }
//         }
//       }
//       equipmentList.splice(0, 1);
//       //if ((this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY-1)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY+1)){
//       console.log(service.map._objects[0].currentPositionAndDirection().posY);
//     }
//     //setInt fo ctxAnimationObjects - we can add more animated objectsss
//     setInterval(function() {
//       ctxAnimationObjects.clearRect(0, 0, canvasAnimationObjects.width, canvasAnimationObjects.height);
//       drawBee(bee1);
//       drawBee(bee2);
//     }, 30);
//
//     function drawBot(object, spriteX, spriteY) {
//       var sprite = new Image();
//       sprite.src = require('@/components/games/JSbot/main/img/botSprite.png');
//       ctxAnimation.drawImage(sprite, spriteX, spriteY, object._spriteWidth, object._spriteHeight, object._posX * onePixel, object._posY * onePixel, object._width, object._height);
//     };
//     var allFrames = 1;
//     var countFrame = 1;
//     var viewBotDirection = 1;
//     function animateBotMove(movingImg, canvas, context, startTime, posX, posY, moveInfo) {
//       var startPosition = {
//         x: 1,
//         y: 1
//       }
//       var pixelsForSecond = 150;
//       var frameForSecond = 60;
//       var cellSize = 50;
//
//       var newCoordinate = (pixelsForSecond/frameForSecond)/cellSize; //odległość do przesunięcia
//
//       if(moveInfo != "forward"){
//         newCoordinate = 0;
//       }
//       context.clearRect(0, 0, canvas.width, canvas.height); //wyczyść
//       if (allFrames <= 60){ //jeśli startujemy i bot musi się pojawić
//         movingImg._posY = startPosition.y;
//         movingImg._posX = startPosition.x;
//         drawBot(movingImg, 10, 230);
//       }
//       else if (service.map._objects[0]._direction == 1){
//         movingImg._posX += newCoordinate;
//         drawBot(movingImg, 10, 230);
//         viewBotDirection = 1;
//         for (var i = 0; i < currentItemList.length; i++) {
//           currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
//           currentItemList[i]._posY = movingImg._posY * onePixel;
//         };
//       }else if (service.map._objects[0]._direction == 2) {
//         movingImg._posY += newCoordinate;
//         drawBot(movingImg, 10, 10);
//         viewBotDirection = 2;
//         for (var i = 0; i < currentItemList.length; i++) {
//           currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
//           currentItemList[i]._posY = movingImg._posY * onePixel;
//         };
//       }else if (service.map._objects[0]._direction == 3) {
//         movingImg._posX -= newCoordinate;
//         drawBot(movingImg, 230, 10);
//         viewBotDirection = 3;
//         for (var i = 0; i < currentItemList.length; i++) {
//           currentItemList[i]._posX = movingImg._posX * onePixel;
//           currentItemList[i]._posY = movingImg._posY * onePixel - onePixel - i * onePixel;
//         };
//       }else if (service.map._objects[0]._direction == 0) {
//         movingImg._posY -= newCoordinate;
//         drawBot(movingImg, 230, 230);
//         viewBotDirection = 0;
//         for (var i = 0; i < currentItemList.length; i++) {
//           currentItemList[i]._posX = movingImg._posX * onePixel;
//           currentItemList[i]._posY = movingImg._posY * onePixel + onePixel + i * onePixel;
//         };
//       }
//       //TODO: zrobić animację podążania zwierząt za JSbotem
//
//       // for (var i = 0; i < currentItemList.length; i++) {
//       //         currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
//       //         currentItemList[i]._posY = movingImg._posY * onePixel;
//       //       };
//
//       // if (service.map._objects[0]._direction == 1 || service.map._objects[0]._direction == 2) {
//       //   if (newCoordinate > movingImg._posX) {
//       //     if (newCoordinate <= posX) {
//       //       movingImg._posX = newCoordinate;
//       //       for (var i = 0; i < currentItemList.length; i++) {
//       //         currentItemList[i]._posX = movingImg._posX * onePixel - onePixel - i * onePixel;
//       //         currentItemList[i]._posY = movingImg._posY * onePixel;
//       //       };
//       //     };
//       //   }
//       //   if (newCoordinate > movingImg._posY) {
//       //     if (newCoordinate <= posY) {
//       //       movingImg._posY = newCoordinate;
//       //       for (var i = 0; i < currentItemList.length; i++) {
//       //         currentItemList[i]._posX = movingImg._posX * onePixel;
//       //         currentItemList[i]._posY = movingImg._posY * onePixel - onePixel - i * onePixel;
//       //       };
//       //     };
//       //   }
//       // } else if (service.map._objects[0]._direction == 3 || service.map._objects[0]._direction == 0) {
//       //   if (0.05 * newCoordinate < movingImg._posX) {
//       //     if (currentX - 0.01 * newCoordinate >= posX) {
//       //       movingImg._posX = currentX - 0.05 * newCoordinate;
//       //       for (var i = 0; i < currentItemList.length; i++) {
//       //         currentItemList[i]._posX = movingImg._posX * onePixel + onePixel + i * onePixel;
//       //         currentItemList[i]._posY = movingImg._posY * onePixel;
//       //       };
//       //     }
//       //   }
//       //   if (0.2 * newCoordinate < movingImg._posY) {
//       //     if (currentY - 0.01 * newCoordinate >= posY) {
//       //       movingImg._posY = currentY - 0.05 * newCoordinate;
//       //       for (var i = 0; i < currentItemList.length; i++) {
//       //         currentItemList[i]._posX = movingImg._posX * onePixel;
//       //         currentItemList[i]._posY = movingImg._posY * onePixel + onePixel + i * onePixel;
//       //       };
//       //     }
//       //   }
//       // }
//
//       countFrame++;
//       allFrames++;
//       //equipment
//       if (service.giveMeAllObj()[0]._arrayOfElements.length > equipmentList.length) {
//         console.log("1" + equipmentList);
//         pickEquipment();
//         // console.log(equipmentList);
//       } else if (service.map._objects[0]._arrayOfElements.length < equipmentList.length) {
//         console.log("2" + equipmentList);
//         dropEquipment();
//       }
//
//
//       //dropping followers animals
//       // if (service.map._objects[0]._arrayOfElements.length > 0 && service.map._objects[0]._arrayOfElements.length<currentItemList.length) {
//       //     currentItemList.splice(0,1);
//       // }
//
//
//
//       if (service.map._objects[0]._arrayOfElements.length > currentItemList.length) {
//         for (var i = 0; i < service.map._objects[0]._arrayOfElements.length; i++) {
//           switch (service.map._objects[0]._arrayOfElements[i]._name) {
//             case "aurochs0":
//               var aurochsItem = new view_model.Element_animated("aurochs0", 970, 10, 200, 200, undefined, undefined, undefined, undefined);
//               currentItemList.push(aurochsItem);
//               var index = listOfStaticObjects.indexOf(aurochs0);
//               listOfStaticObjects.splice(index, 1);
//               ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
//               drawStaticElements(service.map._objects, listOfStaticObjects);
//               break;
//             case "littleDuck":
//               var littleDuckItem = new view_model.Element_animated("littleDuckItem", 970, 570, 100, 100, undefined, undefined, undefined, undefined);
//               currentItemList.push(littleDuckItem);
//               var index = listOfStaticObjects.indexOf(littleDuckItem);
//               listOfStaticObjects.splice(index, 1);
//               ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
//               drawStaticElements(service.map._objects, listOfStaticObjects);
//               break;
//             case "bee":
//               var beeItem = new view_model.Element_animated("beeItem", 650, 230, 200, 200, undefined, undefined, undefined, undefined);
//               currentItemList.push(beeItem);
//               break;
//           }
//         };
//       };
//
//       for (var i = 0; i < currentItemList.length; i++) {
//         drawItem(currentItemList[i], ctxAnimation, onePixel, currentItemList[i]._posX, currentItemList[i]._posY);
//       };
//       if (countFrame > frameForSecond){
//         countFrame = 1;
//       }
//       else{
//         requestAnimFrame(function() {
//           animateBotMove(movingImg, canvas, context, startTime, posX, posY, moveInfo);
//         });
//       }
//
//     };
//     var animateMove = function(moveInfo) {
//       // ctxAnimation.clearRect(0, 0, canvasAnimation.width, canvasAnimation.height);
//       animateBotMove(bot, canvasAnimation, ctxAnimation, 0, service.map._objects[0]._posX, service.map._objects[0]._posY, moveInfo);
//     };
//
//     var _showMeLvlView = function(lvl) {
//       var whatLvl = lvl - 1;
//       if ((whatLvl < 0) || (whatLvl > service.getGameObj().countLevels - 1)) {
//         console.log("CAM_VIEW_ERROR: Podany do funkcji level nie istnieje");
//       } else {
//         var demX = service.getGameObj().levelSet[whatLvl].viewPortPoz.pozX * onePixel;
//         var demY = service.getGameObj().levelSet[whatLvl].viewPortPoz.pozY * onePixel;
//         if ((demX >= viewPort._posX) && (demY >= viewPort._posY)) {
//           //1
//           mapMove('right', viewPort._posX + demX);
//           mapMove('bottom', viewPort._posY + demY);
//         } else if ((demX <= viewPort._posX) && (demY >= viewPort._posY)) {
//           //2
//           mapMove('left', viewPort._posX - demX);
//           mapMove('bottom', viewPort._posY + demY);
//         } else if ((demX <= viewPort._posX) && (demY <= viewPort._posY)) {
//           //3
//           mapMove('left', viewPort._posX - demX);
//           mapMove('top', viewPort._posY - demY);
//         } else if ((demX >= viewPort._posX) && (demY <= viewPort._posY)) {
//           //4
//           mapMove('right', viewPort._posX + demX);
//           mapMove('top', viewPort._posY - demY);
//         }
//       }
//     };
//
//     var _updateCamView = function() {
//       //bot position in pixels
//       var botPosition = {
//         x: (service.returnObjTab()[0].currentPositionAndDirection().posX + 1) * onePixel,
//         y: (service.returnObjTab()[0].currentPositionAndDirection().posY + 1) * onePixel
//       };
//       if (botPosition.y - viewPort._posY <= 2 * onePixel) {
//         mapMove('top');
//       }
//       if (viewPort._height - (botPosition.y - viewPort._posY) <= 2 * onePixel) {
//         mapMove('bottom');
//       }
//       if (botPosition.x - viewPort._posX <= 2 * onePixel) {
//         mapMove('left');
//       }
//       if (viewPort._width - (botPosition.x - viewPort._posX) <= 2 * onePixel) {
//         mapMove('right');
//       }
//     };
//
//
// //TODO: przy przesuwaniu w trakcie gry po przeskoku ręcznym bota coś się psuje i źle podnosi mapkę
//     var mapMove = function(_direct, _pixels) {
//       var temp = 150;
//
//       if (_pixels === undefined) {
//         _pixels = temp;
//       }
//       if (_direct === "top") {
//         if (viewPort._posY - _pixels <= 0) {
//           _pixels = viewPort._posY;
//         }
//         referenceMap.css('top', "+=" + _pixels + "px");
//         viewPort._posY -= _pixels;
//       } else if (_direct === "bottom") {
//         if (viewPort._posY + viewPort._height + _pixels >= mapProp._height) {
//           _pixels = mapProp._height - viewPort._posY - viewPort._height;
//         }
//         referenceMap.css('top', "-=" + _pixels + "px");
//         viewPort._posY += _pixels;
//       } else if (_direct === "left") {
//         if (viewPort._posX - _pixels <= 0) {
//           _pixels = viewPort._posX;
//         }
//         referenceMap.css('left', "+=" + _pixels + "px");
//         viewPort._posX -= _pixels;
//       } else if (_direct === "right") {
//         if (viewPort._posX + viewPort._width + _pixels >= mapProp._width) {
//           _pixels = mapProp._width - viewPort._posX - viewPort._width;
//         }
//         referenceMap.css('left', "-=" + _pixels + "px");
//         viewPort._posX += _pixels;
//       }
//       console.log(viewPort._posX, viewPort._posY);
//     };
//
//     window.requestAnimFrame = (function(callback) {
//       return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//         function(callback) {
//           window.setTimeout(callback, 1000 / 30);
//         };
//     })();
//
//
//     // drawBot(objectsCatalog.bot, 230, 230);
//     //TODO: zrobić rysowanie robota przy starcie - nie działa chyba dlatego, że rysuje się zanim pojawi się wgl canvas
//     //z jakiegoś powodu jedno narysowanie bota nie wystarcza
//     window.onload = function(){
//       animateBotMove(bot, canvasAnimation, ctxAnimation, 0, 50, 50);
//     };
//
//     var _displayPlace = function(_what) {
//       $('.place').text(_what);
//     };
//     var _displayAdvice = function(_what) {
//       $('span.message.typing-slider').text(_what);
//     };
//     var _displayError = function(_what) {
//       $('span.errorMessage').text(_what);
//     };
//
//     var clearAnimals = function() {
//       currentItemList.splice(0, 1);
//     };
//
//     //TODO: Napisać funckję animującą przesuwanie elementów
//
//
//     var _specialAnimation = function(what){
//       switch (what) {
//         case "AcrossTheWater":
//           animateMove("forward");
//           view.mapMove('top');
//           // setTimeout(function(){
//           //   animateMove("forward");
//           //   view.mapMove('top');
//           //   setTimeout(function(){
//           //     view.mapMove('top');
//           //     setTimeout(function(){
//           //       view.mapMove('top');
//           //     }, 1200);
//           //   }, 1200);
//           // }, 1200);
//           //TODO: dodać przesuwanie tratwy za pomocą funkcji smoothMovingAnimationElements()
//           break;
//         default:
//
//       }
//       //TODO: Bląd przesuwania okna
//     };
//
//     var smoothMovingAnimationInfo = {
//       previousCoordinate: {x:0, y:0},
//       frameCounter: 0
//     };
//
//     var _smoothMovingAnimationElements = function(element, demandX, demandY){
//       smoothMovingAnimationInfo.frameCounter++;
//       //mechanika poruszania się
//       var variableSingleFrameX;
//       var variableSingleFrameY;
//
//       variableSingleFrameX = element._posX
//
//
//       //poruszanie się po mapie elementu
//       element._posX = variableSingleFrameX;
//       element._posy = variableSingleFrameY;
//       ctxObj.clearRect(0, 0, canvasObjects.width, canvasObjects.height);
//       drawStaticElements(service.map._objects, listOfStaticObjects);
//
//       console.log("TEST: Iteracja "+smoothMovingAnimationInfo.frameCounter+"");
//       if (smoothMovingAnimationInfo.frameCounter === 60){
//
//
//         //zeruj licznik klatek
//         smoothMovingAnimationInfo.frameCounter = 0;
//         //zapisuję koordynaty jako poprzednie - dotyczy całego ruchu, a nie pojedyńczej klatki
//         smoothMovingAnimationInfo.previousCoordinate.x = demandX;
//         smoothMovingAnimationInfo.previousCoordinate.y = demandY;
//         console.log("TEST: Ostatnie wykonanie");
//       }
//       else {
//         //wywolanie rekurencyjne
//         requestAnimFrame(function() {
//           _smoothMovingAnimationElements(element, demandX, demandY)
//         });
//       }
//     };
//
//     //temporary call
//     // _smoothMovingAnimationElements(service.map._objects[6], 18, 10);
//
//     return {
//       animateMove: animateMove,
//       animateBotMove: animateBotMove,
//       updateCamView: _updateCamView,
//       showMeLvlView: _showMeLvlView,
//       displayPlace: _displayPlace,
//       displayAdvice: _displayAdvice,
//       displayError: _displayError,
//       redrawRoad: redrawRoad,
//       drawEquipment: drawEquipment,
//       clearAnimals: clearAnimals,
//       specialAnimation: _specialAnimation,
//       mapMove: mapMove,
//       smoothMovingAnimationElements: _smoothMovingAnimationElements
//       // stopAnim :stopAnim
//       // rotate: rotate,
//       // cancelRotateAnim: cancelRotateAnim
//     };
//
//   })();
//
// });
</script>

<style scoped>
  .clear-fix::after {
    content: "";
    clear: both;
    display: block; }

  .no-disp {
    display: none; }

  .backWindow {
    position: absolute;
    top: 10px;
    left: 50px;
    background-color: rgba(255, 255, 255, 0.4);
    outline-width: 50px;
    height: 22px;
    z-index: 100;
    padding: 5px;
    border-radius: 5px;
    border: 1px lightgrey solid; }
  .backWindow a {
    text-decoration: none;
    border: 0px;
    color: black;
    font-size: 14px;
    font-weight: 800;
    display: block;
    width: 100%;
    height: 100%;
    padding-top: 3px; }

  .absoluteElements__backButton {
    z-index: 1000;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid lightgrey;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.4);
    transition-duration: 0.3s;
    cursor: pointer;
    outline: none; }
  .absoluteElements__backButton:hover {
    background-color: rgba(255, 255, 255, 0.6); }
  .absoluteElements__backButton i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); }

  .game-view__window {
    position: relative;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    height: 600px;
    overflow: scroll;
    border: 5px inset #4a4c51;
    box-sizing: border-box; }
  .game-view__window .game-view__move {
    position: relative;
    width: 1500px;
    height: 1200px;
    top: 0;
    left: 0;
    transition-duration: 1s; }
  .game-view__window canvas {
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    display: block; }
  .game-view__messagePanel {
    padding-top: 10px;
    position: relative;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-family: 'VT323', monospace; }
  .game-view__messagePanel div.bg-botFront {
    width: 40px;
    height: 40px;
    background: url("img/css_sprites.png") -616px -615px;
    background-size: 600%;
    float: left;
    margin-top: -10px; }
  .game-view__messagePanel span.sign {
    display: block;
    float: left;
    padding-left: 5px; }
  .game-view__messagePanel span.message {
    display: block;
    float: left; }
  .game-view__messagePanel canvas {
    float: right;
    clear: right;
    margin-top: -40px;
    border: 3px inset #8cc236; }
  .game-view__controllPanel {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-top: 8px; }
  .game-view__controllPanel button.nextMoveButton {
    display: block;
    float: left;
    font-family: 'VT323', monospace;
    font-size: 18px;
    letter-spacing: 1px;
    padding: 4px 8px;
    color: white;
    background-color: #8cc236;
    text-shadow: -1px 0 1px #353535, 0 1px 1px #353535, 1px 0 1px #353535, 0 -1px 1px #353535;
    border: none;
    box-shadow: 0 3px 6px #353535; }
  .game-view__controllPanel button.nextMoveButton:hover {
    font-size: 20px;
    box-shadow: 0 4px 12px #353535; }
  .game-view__controllPanel div.locationMessage {
    clear: both;
    width: 500px;
    height: 35px;
    padding-top: 10px;
    padding-left: 5px;
    font-family: 'VT323', monospace;
    font-size: 18px;
    border: 3px inset #8cc236;
    background-color: #353535;
    color: #8cc236;
    letter-spacing: 2px; }
  .game-view__controllPanel div.locationMessage span.colonInitial {
    display: block;
    float: left;
    color: white;
    padding-right: 3px; }
  .game-view__controllPanel div.locationMessage span.place {
    display: block;
    float: left; }
  .game-view__controllPanel div.locationMessage span.errorMessage {
    display: block;
    float: left; }

  #gameView {
    position: absolute;
    z-index: 1; }

  #gameViewObjects {
    position: absolute;
    z-index: 2; }

  #gameViewAnimation {
    position: absolute;
    z-index: 3; }

  #gameViewAnimationObjects {
    position: absolute;
    z-index: 4; }

  @keyframes cursor {
    from, to {
      border-color: transparent; }
    50% {
      border-color: black; } }
  @keyframes typing {
    from {
      width: 100%; }
    90%, to {
      width: 0; } }
  @keyframes slide {
    50% {
      font-size: 1rem;
      letter-spacing: 3px; }
    to {
      font-size: 0;
      letter-spacing: 0; } }
  .typing-slider {
    text-align: center;
    white-space: nowrap; }
  .typing-slider p {
    position: relative;
    display: inline;
    font-size: 0;
    text-transform: uppercase;
    letter-spacing: 0;
    animation: slide 10s step-start infinite; }
  .typing-slider p::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-left: 3px solid black;
    background-color: white;
    animation: typing 5s infinite, cursor 1s infinite; }

  .typing-slider p:nth-child(1) {
    animation-delay: 0s; }
  .typing-slider p:nth-child(1)::after {
    animation-delay: 0s;
    animation-timing-function: steps(22), step-end; }

  .typing-slider p:nth-child(2) {
    animation-delay: 5s; }
  .typing-slider p:nth-child(2)::after {
    animation-delay: 5s;
    animation-timing-function: steps(21), step-end; }

  #left {
    -ms-transform: rotate(90deg);
    /* IE 9 */
    -webkit-transform: rotate(90deg);
    /* Chrome, Safari, Opera */
    transform: rotate(90deg); }

  #up {
    -ms-transform: rotate(180deg);
    /* IE 9 */
    -webkit-transform: rotate(180deg);
    /* Chrome, Safari, Opera */
    transform: rotate(180deg); }

  #right {
    -ms-transform: rotate(-90deg);
    /* IE 9 */
    -webkit-transform: rotate(-90deg);
    /* Chrome, Safari, Opera */
    transform: rotate(-90deg); }

  .float-left {
    clear: both;
    float: left; }

  /*# sourceMappingURL=js-bot-view.css.map */

</style>
