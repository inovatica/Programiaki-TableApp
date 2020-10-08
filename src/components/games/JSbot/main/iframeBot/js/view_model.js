var view_model = (function() {
	var Background_element = function(src) {
		this._imgSrc = src;
	}

	Background_element.prototype.draw = function(array, canvas, context, numberFromArray, onePixel) {
        var img = new Image;
        img.src = this._imgSrc;
        img.onload = function() {
            for (var j = 0; j < array.length; j++) {
                for (var i = 0; i < array[j].length; i++) {
                    if (array[j][i] == numberFromArray) {
                        context.drawImage(img, i * onePixel, j * onePixel, onePixel, onePixel);
                    }
                }
            }
        }
    }

    var Element = function(name, spriteX, spriteY, spriteWidth, spriteHeight, width, height) {
        this._name = name;
        this._spriteX = spriteX;
        this._spriteY = spriteY;
        this._spriteWidth = spriteWidth;
        this._spriteHeight = spriteHeight;
        this._width = width;
        this._height = height;
    }



    Element.prototype.draw = function(positionX, positionY, canvas, ctx,sprite) {

        ctx.drawImage(sprite, this._spriteX, this._spriteY, this._spriteWidth, this._spriteHeight, positionX, positionY, this._width, this._height);

    }

    var Element_animated = function(name, spriteX, spriteY, spriteWidth, spriteHeight, width, height, posX, posY) {
        Element.call(this, name, spriteX, spriteY, spriteWidth, spriteHeight, width, height);
        this._posX = posX;
        this._posY = posY;
    }

    Element_animated.prototype.drawAnim = function(object, context, sprite) {
        context.drawImage(sprite, object._spriteX, object._spriteY, object._spriteWidth, object._spriteHeight, object._posX, object._posY, object._width, object._height);
    }

    Element_animated.prototype.updateBee = function(coordinate, borderDown, borderUp) {
        // var borderUp = coordinate + onePixel;
        // var borderDown = coordinate;
        var offset = Math.random() * 4 - 2;
        coordinate += offset;
        if (coordinate > borderUp) {
            coordinate = borderUp;
        }
        if (coordinate < borderDown) {
            coordinate = borderDown;
        }
        return coordinate;
    };

    return {
        Background_element: Background_element,
        Element: Element,
        Element_animated: Element_animated
    }
})();
