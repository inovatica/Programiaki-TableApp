var map_model = (function() {

var Map = function(matrix, objects, objectsMoving, accessFlags) {
    this._matrix = matrix;
    this._objects = objects;
    this._objectsMoving = objectsMoving;
    this._accessFlags = accessFlags;
    this._matrixHeight = matrix.length;
    this._matrixWidth = matrix[0].length;
    this.bot = this._objects[0];

    //funkcja z API serwisu zwracjąca tablice z referencjami do obiektów;
    // this._objects = //funkcja z API serwisu zwracjąca tablice z referencjami do obiektów;
};

//object.turn('r') lub object.turn('l')
Map.prototype.turn = function(direction){
    if(direction === 'r'){
        this._objects[0].turnRight();
    }
    else if (direction === 'l'){
        this._objects[0].turnLeft();
    }
    else{
        return 'wrong direction';
    }
    return "turn";
};

    Map.prototype.forward = function(force){
        var changeAccept = true;
        var demandPos = {};
        // obliczanie żądanej pozycji
        if(this.bot.currentPositionAndDirection().direction === 1){
            demandPos.x = this.bot.currentPositionAndDirection().posX + 3;
            demandPos.y = this.bot.currentPositionAndDirection().posY;
        }
        else if(this.bot.currentPositionAndDirection().direction === 2){
            demandPos.x = this.bot.currentPositionAndDirection().posX;
            demandPos.y = this.bot.currentPositionAndDirection().posY +3;
        }
        else if(this.bot.currentPositionAndDirection().direction === 3){
            demandPos.x = this.bot.currentPositionAndDirection().posX - 3;
            demandPos.y = this.bot.currentPositionAndDirection().posY;
        }
        else if(this.bot.currentPositionAndDirection().direction === 0){
            demandPos.x = this.bot.currentPositionAndDirection().posX;
            demandPos.y = this.bot.currentPositionAndDirection().posY - 3;
        }


                //1. Sprawdzanie czy pozycja nie wychodzi poza mapę
            if (((demandPos.y)===undefined)||((demandPos.x) === undefined)){
                changeAccept = false;
            }

            else if((demandPos.x < 0)||(demandPos.x > this._matrixWidth)||(demandPos.y < 0)||(demandPos.y > this._matrixHeigt)){
               changeAccept = false;
            }


            //3. Sprawdzanie czy demandPos to droga
           else if (this._matrix[demandPos.y][demandPos.x] !== 2){
             if (this._matrix[demandPos.y][demandPos.x] !== 7) {
               changeAccept = false;
             }
            }
            else if (this._matrix[demandPos.y][demandPos.x] === 2 || this._matrix[demandPos.y][demandPos.x] === 7){
                if(this._objects[0].currentPositionAndDirection().direction === 0){
                //góra
                    if((this._matrix[demandPos.y + 2][demandPos.x] !== 2)||(this._matrix[demandPos.y + 1][demandPos.x] !== 2)){
                      if ((this._matrix[demandPos.y + 2][demandPos.x] !== 7)||(this._matrix[demandPos.y + 1][demandPos.x] !== 7)) {
                        changeAccept = false;
                      }
                    }
                }
                else if(this._objects[0].currentPositionAndDirection().direction === 1){
                    //prawo
                    if((this._matrix[demandPos.y][demandPos.x - 1] !== 2)||(this._matrix[demandPos.y][demandPos.x - 2] !== 2)){
                      if ((this._matrix[demandPos.y][demandPos.x - 1] !== 7)||(this._matrix[demandPos.y][demandPos.x - 2] !== 7)) {
                        changeAccept = false;
                      }
                    }
                }
                else if(this._objects[0].currentPositionAndDirection().direction === 2){
                    //dół
                    if((this._matrix[demandPos.y -2][demandPos.x] !== 2)||(this._matrix[demandPos.y - 1][demandPos.x] !== 2)){
                      if((this._matrix[demandPos.y -2][demandPos.x] !== 7)||(this._matrix[demandPos.y - 1][demandPos.x] !== 7)){
                          changeAccept = false;
                      }
                    }

                }
                else if(this._objects[0].currentPositionAndDirection().direction === 3){
                    //lewo
                    if((this._matrix[demandPos.y][demandPos.x + 2] !== 2)||(this._matrix[demandPos.y][demandPos.x + 2] !== 2)){
                      if((this._matrix[demandPos.y][demandPos.x + 2] !== 7)||(this._matrix[demandPos.y][demandPos.x + 2] !== 7)){
                          changeAccept = false;
                      }
                    }
                }
            }

            //4. Sprawdzanie czy na drodze nic nie leży
            if (this._objects[0].currentPositionAndDirection().direction === 0){
                for(var j = 0; j < this._objects.length; j++){
                    if (this._objects[j]._posX === demandPos.x){
                        if ((this._objects[j]._posY === demandPos.y)||(this._objects[j]._posY === demandPos.y+1)||(this._objects[j]._posY === demandPos.y+2)) {
                        changeAccept = false;
                        break;
                        }
                    }
                }
            }
            else if (this._objects[0].currentPositionAndDirection().direction === 1){
                for(var j = 0; j < this._objects.length; j++){
                    if (this._objects[j].posY === demandPos.y){
                        if ((this._objects[j]._posX === demandPos.x)||(this._objects[j]._posX === demandPos.x-1)||(this._objects[j]._posX === demandPos.x-2)){
                        changeAccept = false;
                        break;
                        }
                    }
                }
            }
            else if (this._objects[0].currentPositionAndDirection().direction === 2){
                for(var j = 0; j < this._objects.length; j++){
                    if (this._objects[j]._posX === demandPos.x){
                        if ((this._objects[j]._posY === demandPos.y)||(this._objects[j]._posY === demandPos.y-1)||(this._objects[j]._posY === demandPos.y-2)) {
                        changeAccept = false;
                        break;
                        }
                    }
                                }
            }
            else{
                for(var j = 0; j < this._objects.length; j++){
                    if (this._objects[j].posY === demandPos.y){
                        if ((this._objects[j]._posX === demandPos.x)||(this._objects[j]._posX === demandPos.x+1)||(this._objects[j]._posX === demandPos.x+2)){
                        changeAccept = false;
                        break;
                        }
                    }
                }
            }
            //Dopuszczenie do ruchu
            if(changeAccept === true || force===true){
                this._objects[0].goStraight();
                view.updateCamView();
                //wywołanie funkcji obsługujące zdażenia specjalne po ruchu z servisu
                service.extraBehavior();
                console.log("aktualna pozycja: "+this.bot.currentPositionAndDirection().posX+'-x, y-'+this.bot.currentPositionAndDirection().posY);
                return "forward";
            }
            else{
                console.log("Niedopuszczalny ruch");
                return false;
            }

    };
    Map.prototype.goForwardForce = function(x){
      this._objects[0].goStraight(x);
    };
    Map.prototype.pickUp = function(){
        for(var j = 1; j <= this._objects.length - 1; j++){
            if ((this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY-1)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY+1)){
                if ((this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX-1)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX+1)){
                    if(true){//this._objects[j]._active == true
                    this._objects[0].addElementToArray(this._objects[j]);
                    break;
                }
                else {
                   console.log("Nie można jeszcze podnieść");
                }

                }
            }
        }
        return "pickup";
    };

    Map.prototype.drop = function(_obj){
        console.log(this._objects[0]);
        this._objects[0].deleteElementToArray(_obj);
        return "drop";
    };

    Map.prototype.ifNextToSomething = function(){
        for(var j = 1; j <= this._objects.length - 1; j++){
            if ((this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY-1)||(this._objects[j].currentPositionAndDirection().posY === this._objects[0]._posY+1)){
                if ((this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX-1)||(this._objects[j].currentPositionAndDirection().posX === this._objects[0]._posX+1)){
                    return this._objects[j];
                }
            }
        }
        return false;
    };

   // var Card = function(data){
   //      this.id = data.id;
   //      this.card_num = data.card_num;
   //      this.card = {};
   //      this.card.id = data.object.id;
   //      this.card.type = data.object.type;
   //      this.card.title = data.object.title;
   //      this.card.card_id = data.object.card_id;
   //  };



    return {
        Map: Map
        //Card: Card
    }
})();
