export default class Ws_message{
  constructor(_socket, _vueThis) {
    this.socket = _socket;
    this.vueThis = _vueThis;
    this.logMessage = false;

    //The array 'messages' is holding declarated names of webSockets events and functions
    // messages array structure:
    // [{name:'eventName', func: [function(){}, function(){}]}, {...}]
    this.messages = [];
    this.socket.onmessage = (_data) => {
      if (this.logMessage){
        console.log(_data);
      }
      //function ignore not JSON messages
      if(this.isJsonString(_data.data)){
        let obj = JSON.parse(_data.data);
        for (let j = 0; j < this.messages.length; j++){
          for (let eventName in obj) {
            if(eventName === 'name'){
              if(this.messages[j].name === obj[eventName]){
                console.log(obj[eventName]);
                for (let funcCount = 0; funcCount < this.messages[j].func.length; funcCount++) {
                  this.messages[j].func[funcCount](JSON.parse(_data.data), this);
                }
              }
            }
          }
        }
      }
    };
    console.log("           \n" +
      "   .---.      \n" +
      " .'_:___\".  \n" +
      " |__ --==| \n" +
      " [  ]  :[|      \n" +
      " |__| I=[|     \n" +
      " / / ____|      \n" +
      " |-/.____.' \n" +
      "/___\\ /___\\   [R2D2] - I WRITE OUR INTERNAL LOGS :)");
    console.log("%c[R2D2]",'color:blue'," - Ws_message instance initialized.");
    this.bindWsTableActualizing();
  };

  bindOnMessage(obj){
    let _messName = obj.name;
    let _func = obj.func;
    let lengthMessArray = this.messages.length;
    let findFlag = false;
    if (this.messages.length === 0) {
      this.messages.push({name: _messName, func: [_func]});
    }
    else {
      for(let i = 0; i < lengthMessArray; i++){
        if (_messName === this.messages[i].name){
          findFlag = true;
          this.messages[i].func.push(_func);
        }
      }
      if (findFlag === false) {
        this.messages.push({name: _messName, func: [_func]});
      }
    }
  };

  bindWsTableActualizing(){
    this.bindOnMessage({
      name: 'start',
      func: function(_data, _vueThis){
        _vueThis.vueThis.$data.table.fillTableOnInit(_data);
      }
    });
    this.bindOnMessage({
      name: 'change',
      func: function(_data, _vueThis){
        _vueThis.vueThis.$data.table.updateTable(_data);
      }
    });
    console.log("%c[R2D2]",'color:blue'," - Ws_message connected to Ws_table.");
  };

  isJsonString(str){
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
};
