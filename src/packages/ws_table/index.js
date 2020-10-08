export default class Ws_table{
  constructor() {
    //draw table model in console
    this.drawTableOnChange = true;
    if (this.drawTableOnChange){
      console.log("%c[R2D2]",'color:blue'," - If you don't want to see table model in console just change \"drawTableOnChange\" property in ws_table:5 to \"FALSE\".");
    }
    else{
      console.log("%c[R2D2]",'color:blue'," - If you want to see table model in console just change \"drawTableOnChange\" property in ws_table:5 to \"TRUE\".");
    }
    this.noSignal = "404";
    this.Table = {
      tableData: {
        row: 5,
        line: 8,
        rowSide: 5,
        lineSide: 4,
        start1: 48,
        start2: 60,
        start3: 100,
        start4: 200
      },
      slots: {
        up:[],
        down:[],
        left:[],
        right:[]
      }
    };
    console.log("%c[R2D2]",'color:blue'," - Ws_table instance initialized.");
    this.fillSlotNames();
  }

  fillSlotNames(){
    // up
    for (let i = 0; i < this.Table.tableData.line; i++){
      for (let j = 0; j < this.Table.tableData.row ; j++){
        this.Table.slots.up.unshift({name: this.Table.tableData.start1 + '_' + j, data: this.noSignal});
      }
      this.Table.tableData.start1++;
    }
    // down
    for (let i = 0; i < this.Table.tableData.line; i++){
      for (let j = this.Table.tableData.row -1; j >= 0; j--){
        this.Table.slots.down.unshift({name: this.Table.tableData.start2 + '_' + j, data: this.noSignal});
      }
      this.Table.tableData.start2++;
    }
    for (let i = 0; i < this.Table.tableData.lineSide; i++){
      for (let j = this.Table.tableData.rowSide -1; j >= 0; j--){
        this.Table.slots.left.unshift({name: this.Table.tableData.start3 + '_' + j, data: this.noSignal});
      }
      this.Table.tableData.start3++;
    }
    for (let i = 0; i < this.Table.tableData.lineSide; i++){
      for (let j = this.Table.tableData.rowSide -1; j >= 0; j--){
        this.Table.slots.right.unshift({name: this.Table.tableData.start4 + '_' + j, data: this.noSignal});
      }
      this.Table.tableData.start4++;
    }
    console.log("%c[R2D2]",'color:blue'," - Ws_table model is currently empty.");



    //dev !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // this.Table.slots.up[0] = {name: "55_4", data: "4294964418"};
    // this.Table.slots.up[1] = {name: "55_3", data: "21155"};
    // this.Table.slots.up[2] = {name: "55_2", data: "28811"};
    // this.Table.slots.up[3] = {name: "55_1", data: "18563"};
    // this.Table.slots.up[4] = {name: "55_0", data: "17625"};
    // this.Table.slots.up[5] = {name: "54_4", data: "17625"};
    // // this.Table.slots.up[6] = {name: "54_3", data: "17625"};






    this.drawTableModel();
  };

  drawTableModel(){
    let model = {
      down: "Down: \n",
      up: "Up: \n",
      left: "Left: \n",
      right: "Right: \n",
      all: [],
      allString: ""
    };
    let counter = 1;
    if (this.drawTableOnChange){
      for (let count = 0; count < this.Table.slots.up.length; count++) {
        model.up += "| ["+this.Table.slots.up[count].data+" - "+this.Table.slots.up[count].name+"] |\n";
        model.down += "| ["+this.Table.slots.down[count].data+" - "+this.Table.slots.down[count].name+"] |\n";
        model.all[count*4] = (function(){ if (counter < 10) {return " "} else {return "";}})()+(counter++)+" | ["+this.Table.slots.up[count].name+" - "+this.Table.slots.up[count].data+"] |";
        model.all[(count*4)+1] = "| ["+this.Table.slots.down[count].name+" - "+this.Table.slots.down[count].data+"] |";
        if (this.Table.slots.left[count] === undefined){
          model.left += "| [not avaible] |\n";
          model.right += "| [not avaible] |\n";
          model.all[(count*4)+2] = "| [not avaible] |";
          model.all[(count*4)+3] = "| [not avaible] |\n";
        }
        else {
          model.left += "| ["+this.Table.slots.left[count].data+" - "+this.Table.slots.left[count].name+"] |\n";
          model.right += "| ["+this.Table.slots.right[count].data+" - "+this.Table.slots.right[count].name+"] |\n";
          model.all[(count*4)+2] = "| ["+this.Table.slots.left[count].name+" - "+this.Table.slots.left[count].data+"] |";
          model.all[(count*4)+3] = "| ["+this.Table.slots.right[count].name+" - "+this.Table.slots.right[count].data+"] |\n";
        }
      }

      model.allString = "        Up:            Down:            Left:            Right:               \n\n"
      for (let j = 0; j < model.all.length; j++) {
        model.allString  += model.all[j];
      }
      console.log("%c[R2D2]",'color:blue'," - Table model: \n\n",model.allString+"\n");
    }
  };

  fillTableOnInit(_data){
    let data = _data.start;
    let changed;
    for (let varTablePoz in this.Table.slots) {
      for (let variable in data) {
        for (let varTable in this.Table.slots[varTablePoz]){
          for (let i = 0; i < 5; i++) {
            if (this.Table.slots[varTablePoz][varTable].name === variable+"_"+i){
              this.Table.slots[varTablePoz][varTable].data = data[variable][i];
              changed = varTablePoz;
              break;
            }
          }
        }
      }
    }
    console.log("%c[R2D2]",'color:blue'," - Ws_table model updated on start.");
    this.drawTableModel();
  };

  updateTable(_data){
    let data = _data.change;
    let changed = "";
    for (let varTablePoz in this.Table.slots) {
      for (let varData in data) {
        if (data.hasOwnProperty(varData)) {
          for (let varTable in this.Table.slots[varTablePoz]) {
            if (this.Table.slots[varTablePoz].hasOwnProperty(varTable)) {
              if (varData === this.Table.slots[varTablePoz][varTable].name) {
                this.Table.slots[varTablePoz][varTable].data = data[varData];
                changed = varData + " : changed for \"" + data[varData]+"\"";
                break;
              }
            }
          }
        }
      }
    }

    console.log("%c[R2D2]",'color:blue'," - "+changed);
    this.drawTableModel();
  };
}
