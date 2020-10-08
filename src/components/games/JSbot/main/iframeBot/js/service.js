var service = (function () {

    var listOfObjects = [];
    var listOfAnimObjects = [];
    var listOfMovingObjects = [];
    var dataFromTable = [];
    var referenceMap = $(".game-view__move");

    if(screen.orientation.type == "landscape-secondary"){
  		tableData.orientation = "up";
  	}

        //Tworzenie Obiektów

    var availableData = [];
    var socket = new WebSocket("ws://"+ipGlobal+":"+portGlobal);
    function giveMeSocket(){
      return socket;
    };
    var socketEventInfo = {
      allMoves: "allMoves",
      nextMove: "nextMove"
    };

    var isJsonString = function(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
    };

    //funkcja tworzy sobie jsona z danych z socketów, ponieważ reszta programu takiego potrzebuje

    socket.onmessage = function(res){
      console.log("Web Socket Message: "+res.data);
      onMessSocket(res);
    };
    socket.onopen = function(res){
      //wyślij info, że chce karty startowe
      socket.send(JSON.stringify(({task: 'last_state'})));
      console.log("Otwarto połączenie WebSocket");
    };
    socket.onerror = function(){
  		console.log("Błąd polączenia, restartuję za...");
  		var timeC = 3;
  		for (var i = 1; i <= 3; i++) {
  			setTimeout(function(){
  				console.log((timeC--)+"..");
  			}, 1000*i);
  		}
  			setTimeout(function(){
  				location.reload();
  			},4000);
  	};
    socket.onclose = function(){
  		console.log("Błąd polączenia, restartuję za...");
  		var timeC = 3;
  		for (var i = 1; i <= 3; i++) {
  			setTimeout(function(){
  				console.log((timeC--)+"..");
  			}, 1000*i);
  		}
  			setTimeout(function(){
  				location.reload();
  			},4000);
  	};

    var tableData = {
  		rzad: 5,
  		wiersz: 8,
  		start: 48,
  		start2: 60,
  		orientation: "down" //down/up
  	};
    var Table;
    var slotNames;
    var slotNamesUp;
    pushSlotNames();

    function pushSlotNames(slotNames){
      slotNames = [];
      slotNamesUp = [];
  		//część górna
  		for (var i = 0; i < tableData.wiersz; i++){
  			for (var j = 0; j < tableData.rzad ; j++){
  				slotNames.unshift(tableData.start + '_' + j);
  			}
  			tableData.start++;
  		}
  		//część dolna
  		for (var i = 0; i < tableData.wiersz; i++){
  			for (var j = tableData.rzad -1; j >= 0; j--){
  				slotNamesUp.unshift(tableData.start2 + '_' + j);
  			}
  			tableData.start2++;
  		}

      if (tableData.orientation == "down") {
  			Table = new model.Table(slotNames);
  		}
      else {
        Table = new model.Table(slotNamesUp);
      }
  	};

    function cardFinder(cardNumb){
  		for (var value of availableData){
  			if (value.cardId.card_num == cardNumb){
  				return value;
  			}
  		}
  			//karta z poza gry
  			return '404';
  	};

    function sanitResponse(_res){
  		var _cleanArray = [];
      var count = 0;
  		for (var variable in _res) {
  			if (_res.hasOwnProperty(variable)) {
          for (var i = 0; i < 5; i++) {
    				if(_res[variable][i] != "404"){
              if (_res[variable][i] != "204") {
                for (var var1 = 0; var1 < Table.slotNames.length; var1++) {
        					if (Table.slotNames[var1] == variable+"_"+i){
                    if (cardFinder(_res[variable][i]).cardId != undefined) {
                      _cleanArray.unshift(cardFinder(_res[variable][i]).cardId);
                    }
        					}
        				}
      				}
            }
    			}
  			}
  		}
      console.log(_cleanArray);
  		return _cleanArray;
  	};

    function fillSocketMap(_res){
  		var res = sanitResponse(_res);
      Table.fillTable(res);
  	};

    var onMessSocket = function(res){
      if (isJsonString(res.data)){
        if(JSON.parse(res.data).start != undefined){
          fillSocketMap(JSON.parse(res.data).start);
        }
        else if(JSON.parse(res.data).cards != undefined){
          fillSocketMap(JSON.parse(res.data).cards);
        }
      }
    };

    var _sendEventToSocket = (name) =>{
        socket.send(name);
    };



    var bot = new elements_model.JSbot(1, 1, "JSbot", 3, true, false, false, 'JSbot'); //25, 22
    var aurochs0 = new elements_model.SingleElement(5, 14, "aurochs0", 0, true, false, true, "Drugi żubr");
    var aurochs1 = new elements_model.SingleElement(14, 17, "aurochs1", 0, true, false, false, "Pierwszy żubr");
    var bees =  new elements_model.SingleElement(3, 2, "bee", 0, true, false, false, "Pszczółki");
    var honey =  new elements_model.SingleElement(8, 2, "honey", 0, true, true, true, "Miodek"); //99
    var momDuckCry =  new elements_model.SingleElement(23, 13, "momDuckCry", 0, false, false, false, "Kacza Mama");
    var raft =  new elements_model.SingleElement(20.5, 10, "raft", 0, true, false, false, "Kładka");
    var rope =  new elements_model.SingleElement(18, 21, "rope", 0, true, true, false, "Lina");//18, 21
    var littleDuck =  new elements_model.SingleElement(26, 21, "littleDuck", 0, true, false, true, "Kaczuszka");
    var bear =  new elements_model.SingleElement(26, 5, "bear", 0, false, false, "Niedźwiedź");
    var chrisTree =  new elements_model.SingleElement(26, 3, "chrisTree", 0, true, false, false, "Wielka Choinka");

    var firstLayer = [
        [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3],
        [4, 5, 3, 5, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 5, 2, 1, 1, 2, 4],
        [3, 5, 4, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 2, 3],
        [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 4],
        [3, 2, 1, 1, 2, 5, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 2, 3],
        [4, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 2, 4],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 3],
        [4, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 4],
        [3, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3],
        [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 4],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 1, 1, 1, 2, 1, 1, 5, 5, 5, 5, 3],
        [4, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1, 1, 2, 5, 5, 5, 5, 5, 5, 5, 1, 2, 1, 1, 1, 1, 5, 2, 4],
        [3, 2, 4, 4, 2, 1, 1, 2, 4, 4, 2, 1, 1, 2, 5, 5, 5, 5, 5, 1, 1, 1, 2, 1, 1, 5, 5, 1, 2, 3],
        [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
        [3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 5, 1, 2, 3],
        [4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 4],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [4, 2, 1, 1, 2, 3, 3, 2, 1, 1, 2, 1, 5, 2, 5, 1, 2, 1, 1, 2, 1, 1, 2, 1, 5, 2, 5, 1, 2, 4],
        [3, 2, 1, 1, 2, 4, 4, 2, 1, 1, 2, 5, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 3],
        [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
        [3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    ];

    var getFirstLayer = function(){
        return firstLayer;
    }

    var gameInfo = {

        countLevels: 5,
        actualLevel: 1,//1
        accessFlags: {waterAccess: false},
        errors: ['Nie możesz iść w tym kierunku', 'Nie możesz podnieść tego przedmiotu', 'Ruch niedozwolony'],
        levelSet: [{
            //pozycja w której ma się znaleźc robot, aby serwis rozpoczął zmianę widoku na następny lvl
            botPoz: {pozX: 0, pozY: 0},
            //pozycja na którą ma się ustawić view port po rozpoczęciu podanego lvl'u
            viewPortPoz: {pozX: 0, pozY: 0},
            //komunikaty
            message: ['Nie mogę znaleźć wyjścia. Idź po miodek, aby dać go pszczółkom', 'Zanieś miodek pszczółkom'],
            places: ['pszczółki'],
            whatTake: honey,  //co można teraz podnieść?
            giveWho: bees   //gdzie to cza zanieść?
        }, {
            botPoz: {pozX: 0, pozY: 12},
            viewPortPoz: {pozX: 0, pozY: 12},
            message: ["Zobacz, droga na dole mapy została odkryta!", "Zaprowadź żubra do jego kolegi!"],
            places: ['pszczółki', 'żubry'],
            whatTake: aurochs0,  //co można teraz podnieść?
            giveWho: aurochs1,   //gdzie to cza zanieść?
            placeToChange: function(){
                //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
                firstLayer[11][13] = 2;
            },
            extraFlag: false,
            extraInfo: ["Chcesz przejść dalej? Przyprowadź mojego kolegę żubra, aby mi pomógł przesunąć kłodę."],
            placeForExtraInfo: [16,13]
        },{
            botPoz: {pozX: 13, pozY: 16},
            viewPortPoz: {pozX: 11, pozY: 10},
            message: ["Kłoda odsunięta! Możemy iść dalej.", "Zaprowadź kaczątko do mamy"],
            places: ['pszczółki', 'żubry'],
            whatTake: littleDuck,  //co można teraz podnieść?
            giveWho: momDuckCry,   //gdzie to cza zanieść?
            placeToChange: function(){
                //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
                firstLayer[16][14] = 2;
            },
            extraFlag: false,
            extraInfo: ["Chcesz przeprawić się przez rzekę? Pomogę Ci jeśli znajdziesz mojego synka i przyprowadzisz go do mnie."],
            placeForExtraInfo: [13,22]
        },
        {
            botPoz: {pozX: 0, pozY: 0},
            viewPortPoz: {pozX: 11, pozY: 10},
            message: ["Dziękuję za pomoc. Pomogę Ci przedostać się przez rzekę. Znajdę kłody do budowy tratwy, Ty w tym czasie znajdź linę do ich związania.", "Zanieś linę Kaczej Mamie."],
            places: ['pszczółki', 'żubry'],
            whatTake: rope,  //co można teraz podnieść?
            giveWho: momDuckCry,   //gdzie to cza zanieść?
            placeToChange: function(){
                //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
            },
            extraFlag: false,
            extraInfo: ["Teraz możesz swobodnie przejść przez rzekę."],
            placeForExtraInfo: [0,0]
        },
        {
            botPoz: {pozX: 0, pozY: 0},
            viewPortPoz: {pozX: 11, pozY: 10},
            message: ["Tratwa zbudowana!", "Zanieś miodek Niedźwiadkowi."],
            places: ['pszczółki', 'żubry'],
            whatTake: rope,  //co można teraz podnieść?
            giveWho: momDuckCry,   //gdzie to cza zanieść?
            placeToChange: function(){
                //jaki element mapy (mecierzy) zamienić przy rozpoczęciu lvl??
            },
            extraFlag: false,
            extraInfo: ["Teraz możesz swobodnie przejść przez rzekę."],
            placeForExtraInfo: [0,0]
        },
        {
            botPoz: {pozX: 13, pozY: 16},
            viewPortPoz: {pozX: 11, pozY: 10},
            message: ["Udało Ci się przedostać przez rzekę, biegnij uratować Krzysia!", "Zanieś miodek niedźwiadkowi."],
            places: ['pszczółki', 'żubry'],
            whatTake: rope,  //co można teraz podnieść?
            giveWho: momDuckCry,   //gdzie to cza zanieść?
            placeToChange: function(){
                firstLayer[12][22] = 7;
            },
            extraFlag: false,
            extraInfo: ["Ten niedźwiedź jest zbyt duży! Przynieś od pszczółek trochę miodku, by go przekupić."],
            placeForExtraInfo: [4,27]
        }],


        _changeFlag: function (_flag, _bool) {

            gameInfo.accessFlags[_flag] = _bool;

        },

        _showMeFlags: function () {
            return accessFlags;
        },
        _setLevel: function (x) {
            if ((x > 0) && (x <= countLevels)) {
                actualLevel = x;
            } else {
                return false;
            }
        },
    };

    var _getGameObj = function () {
        return gameInfo;
    };



    listOfMovingObjects.push(bees);
    listOfAnimObjects.push(bot);
    listOfObjects.push(bot, aurochs0,aurochs1, bees, honey, momDuckCry, raft, rope, littleDuck, bear, chrisTree);

    var _giveMeAllObj = function(){
        return listOfObjects;
    }

    var map = new map_model.Map(firstLayer, listOfObjects, listOfMovingObjects, gameInfo.accessFlags);

    var whatPlace = function(){
        if(!map.ifNextToSomething()){
            view.displayPlace("");
        }
        else{
            view.displayPlace(" "+map.ifNextToSomething()._namePol+" ");
        }
    };

    var advice = function () {
        };

    var myMap = function(){
        return map;
    };

    var writeToelements_Model1 = function (data) {
        var myData = [];
        //
        myData = $.map(data, function (value, index) {
            if (value === "404") {
                return null;
            }
            return [value];
        });
        return myData;
    };

    var getDataFromTable = function (level) {
        var getDataFromTablePromise = new Promise(
            function (resolve, reject) {
              resolve(Table.giveMeCards());
            });
        return getDataFromTablePromise;
    };

    var getAvailableData = function (level) {
        var getAvailableDataPromise = new Promise(
            function (resolve, reject) {
                if (availableData.length == 0) {
                  $.ajax({
                      type: "get",
                      dataType: "json",
                      url: "../../../mok/jsbot_cards.json",
                      success: function (data) {
                        availableData = writeToModel(data);
                        resolve(availableData);
                      },
                      complete: function () {
                      },
                      error: function (e) {
                        console.log(e);
                        // reject(e);
                      }
                  });
                } else {
                    resolve(availableData);
                }
            });
        return getAvailableDataPromise;
    };

    getAvailableData();

    var writeToModel = function (data) {
      var myData = [];

      for (let i = 0; i < data.length; i++) {
          var tempObject = new model.Card(data[i]);

              myData.push(tempObject);
          }
          return myData;
      };

    var howManyTimes = function (dataFromTable, i) {
        switch (dataFromTable[i].object.title) {
            case "*2":
                return 2;
                break;
            case "*3":
                return 3;
                break;
            case "*4":
                return 4;
                break;
            case "*5":
                return 5;
                break;
            default:
                return 1;
                break;
        }
    };
    var extraBehavior = function(){
        if(gameInfo.levelSet[gameInfo.actualLevel-1].extraFlag === false){
            if((bot._posY == gameInfo.levelSet[gameInfo.actualLevel-1].placeForExtraInfo[0])&&(bot._posX == gameInfo.levelSet[gameInfo.actualLevel-1].placeForExtraInfo[1])){
                if(bot._arrayOfElements[0] == gameInfo.levelSet[gameInfo.actualLevel-1].whatTake){
                    mainLogicGame('give');
                    gameInfo.levelSet[gameInfo.actualLevel-1].extraFlag === "true";
                    // view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].extraInfo[1]);
                }
                else{
                    view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].extraInfo[0]);
                }
            }
        }
        //rola funkcji polega na obsłudze nieregularnych sytuacji, np. przyprowadzenie żubra bez położenia karty "daj"
        //lub wyświetlenie komunikatu  nieregularnym momencie
        //funkcja wywoływana po KAŻDYM ruchu


    };
    var mainLogicGame = function (what){
        if (what === 'give'){
            //wywołanie give sprawdza, czy obiekt przekazywany jest prawidłowemu obiektowi dla danego etapu gry
            if(gameInfo.levelSet[gameInfo.actualLevel-1].giveWho == map.ifNextToSomething() && bot._arrayOfElements[0] == gameInfo.levelSet[gameInfo.actualLevel-1].whatTake){
                map.drop(gameInfo.levelSet[gameInfo.actualLevel-1].whatTake);
                _getGameObj().actualLevel++;
                //ustawianie flagi false - nie można potem już wziąć
                // gameInfo.levelSet[gameInfo.actualLevel-1].whatTake.active = false;
                //zmiana elementów mapy dla podanego poziomu
                gameInfo.levelSet[gameInfo.actualLevel-1].placeToChange();
                view.redrawRoad(getFirstLayer());
                //wyświetlanie podpowiedzi dla następnego poziomu
                view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].message[0]);
                view.clearAnimals();
            }
            else{
                //zmień komunikat na error
                view.displayError(gameInfo.errors[2]);
            }
        }
        else if(what === 'take'){
            //wywołanie take sprawdza czy już coś się znajduję w tablicy obiektów którą posiada JSbot, czy podnosi on prawidłowy dla etapu gry obiekt
             // oraz zmienia podpowiedzi
             if((gameInfo.levelSet[gameInfo.actualLevel-1].whatTake == map.ifNextToSomething())&&(bot._arrayOfElements.length === 0)){
                //czy mozna podnieść w tym momencie gry?
                 map.pickUp();
                 //zmien komunikat
                 view.displayAdvice(gameInfo.levelSet[gameInfo.actualLevel-1].message[1]);
             }
             else{
                //zmień komunikat na error
                view.displayError(gameInfo.errors[1]);
             }
        }
    };

    var nextMove = function (dataFromTable) {
        var action;
        var multiplier = 1;
        var sequence_of_moves = [];
        for (var i = 0; i < dataFromTable.length; i++) {
            switch (dataFromTable[i].object.title) {
                case "Weź":
                    action = function(){
                        mainLogicGame("take");
                    };
                    break;
                case "Daj":
                    action = function(){
                        mainLogicGame("give");
                    };
                    // action = function() {
                    //     service.map.drop(map._objects[0]._arrayOfElements[0]);
                    // };
                    break;
                case "Prosto":
                    action = map.forward;
                    // console.log(map._objects[0]._posX , map._objects[0]._posY);
                    break;
                case "Lewo":
                    action = function () {
                        map.turn('l');
                    };
                    break;
                case "Prawo":
                    action = function () {
                        map.turn('r');
                    };
                    break;
                default:
                    if (dataFromTable[i].object.type == "math") {
                        multiplier = howManyTimes(dataFromTable, i);
                    } else {
                        return;
                    }
                    break;
            }

            if (dataFromTable[i].object.title == "Weź" || dataFromTable[i].object.title == "Daj" || dataFromTable[i].object.title == "Prosto" ||
                dataFromTable[i].object.title == "Lewo" || dataFromTable[i].object.title == "Prawo") {
                for (var j = 0; j < multiplier; j++) {
                    // action.call(service.map);
                    sequence_of_moves.push(action);
                }
                multiplier = 1;
            }

        };
        //animate.object(listOfObjects);
        return sequence_of_moves;
    };
    var _returnObjTab = function () {
        return listOfObjects;
    };

    function clearTable(){
      Table.clearTable();
    };

    return {
        howManyTimes: howManyTimes,
        firstLayer: firstLayer,
        nextMove: nextMove,
        getDataFromTable: getDataFromTable,
        showMeFlags: gameInfo._showMeFlags,
        listOfAnimObjects: listOfAnimObjects,
        map: map,
        returnObjTab: _returnObjTab,
        getGameObj: _getGameObj,
        advice:advice,
        myMap: myMap,
        whatPlace: whatPlace,
        mainLogicGame: mainLogicGame,
        getFirstLayer: getFirstLayer,
        extraBehavior: extraBehavior,
        giveMeAllObj: _giveMeAllObj,
        sendEventToSocket: _sendEventToSocket,
        giveMeSocket: giveMeSocket,
        clearTable: clearTable
    }

})();
