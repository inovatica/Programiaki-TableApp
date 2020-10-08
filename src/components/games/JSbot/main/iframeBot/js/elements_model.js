var elements_model = (function () {

    var SingleElement = function (posX, posY, name, direction, visible, canBeGet, active, namePol) {

        this._posX = posX;
        this._posY = posY;
        this._name = name;
        this._direction = direction;
        this._visible = visible;
        this._canBeGet = canBeGet;
        this._active = active;
        this._arrayOfElements = [];
        this._namePol = namePol;
    };


    SingleElement.prototype.turnLeft = function () {
        this._direction -= 1;

        if(this._direction == -1) {
            this._direction = 3;
        }
        console.log("left");
        return this._direction;
    };

    SingleElement.prototype.turnRight = function () {
        this._direction += 1;
        if(this._direction == 4) {
            this._direction = 0;
        }
        console.log("right");
        return this._direction;
    };

    SingleElement.prototype.goStraight = function (add) {
        var dir = this._direction;

        if (add === undefined) {
            add = 3;
        }

        if(dir == 0) {
            this._posY -= add;
        } else if(dir == 1) {
            this._posX += add;
        } else if(dir == 2) {
            this._posY += add;
        } else if(dir == 3) {
            this._posX -= add;
        }
        return {
            posX: this._posX,
            posY: this._posY
        }
    };

    SingleElement.prototype.currentPositionAndDirection = function () {
        return {
                posX: this._posX,
                posY: this._posY,
                direction: this._direction
                }
    };

    var JSbot = function (posX, posY, name, direction, visibile, canBeGet, alone, arrayOfElements) {
        SingleElement.call(this, posX, posY, name, direction, visibile, canBeGet);
        this._alone = true;
        this._arrayOfElements = [];
        this._direction = 1; // poczatkowy kierunek
    };

    JSbot.prototype = Object.create(SingleElement.prototype);
    // Dziedziczenie nam nadpisywalo ponizsze proto ()


    JSbot.prototype.addElementToArray = function (element) {
        this._arrayOfElements.push(element);
        console.log(this._arrayOfElements);
        return this._arrayOfElements;
    };

    JSbot.prototype.deleteElementToArray = function (item) {
        this._arrayOfElements = this._arrayOfElements.filter(function (element) {
           if (element._name !== item._name) {
                return element;
            }
        });
        console.log(this._arrayOfElements);
        return this._arrayOfElements;
    };

    JSbot.prototype.getArrayOfElements = function () {
        return this._arrayOfElements;
    };


    return {
        JSbot: JSbot,
        SingleElement: SingleElement
    }
})();
