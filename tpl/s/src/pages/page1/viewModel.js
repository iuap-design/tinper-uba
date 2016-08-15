
module.exports = {
  infoData:new u.DataTable({
    meta:{
      enterprise:{type:'string'},
      depart:{type:'string'},
      name:{type:'string'},
      sex:{type:'string'}
    }
  }),
  listData:new u.DataTable({
    meta:{
      enterprise:{type:'string'},
      depart:{type:'string'},
      name:{type:'string'},
      sex:{type:'string'}
    }
  }),
  addAction:function(){
    var self = this;
    var _meta = this.listData.meta;
    var addInfo = this.infoData.getAllRows();
    addInfo.forEach(function(row){
      var r=self.listData.createEmptyRow();
      for(var key in _meta){
        r.setValue(key,row.getValue(key));
      }
    })
  }
}
