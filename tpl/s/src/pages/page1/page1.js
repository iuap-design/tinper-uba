
var  viewModel = require('./viewModel');

module.exports ={
    init: function(){
    var app;
    var data={
        "rows": [
                  {
                    "status": "nrm",
                    "data": {
                      "enterprise": "用友",
                      "depart": "UE",
                      "name": "张紫琼",
                      "sex": "male"
                    }
                  },
                  {
                    "status": "nrm",
                    "data": {
                      "enterprise": "阿里巴巴",
                      "depart": "测试",
                      "name": "张丽丹",
                      "sex": "female"
                    }
                  }
          ],
          "pageIndex": 1,
          "pageSize": 10
      };
      app=u.createApp({
        el:'#content',
        model:viewModel
      });
      var r = viewModel.infoData.createEmptyRow();
      viewModel.infoData.setRowSelect(0);
      viewModel['listData'].setData(data);
      window.app=app;

    }
};
