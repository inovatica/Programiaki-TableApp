var model = (function(){

	var Card = function(_cardId, _objectId,  _type, _name, _imageUrl, _soundUrl, _cardNumber){
		this.cardId = _cardId;
		this.cardNumber = _cardNumber;
		this.type = _type;
		this.name = _name;
		this.imageUrl = _imageUrl;
		this.soundUrl = _soundUrl;
	};

	var Table = function(_slotNames){
		this.cards = [];
		this.slotNames = _slotNames;
	};
	Table.prototype.fillTable = function(slotArray){
		this.cards = slotArray;
	};
	Table.prototype.clearTable = function(){
		this.cards = [];
	};
	Table.prototype.giveMeCards = function(){
		return this.cards;
	};
  return {
    Card: Card,
		Table: Table
	};

})();
