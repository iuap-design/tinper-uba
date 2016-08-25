//define([  'text!pages/test_order/order.html', 'print', 'share', 'qrcode','u-grid'], function(template) {
$.get("./pages/test_order/order.html",function(template){
  //ctx为index.js中的全局变量,记录整个项目的地址前缀
  var ctrlBathPath = '/test_order';
  var app, viewModel, datas;

  /**
   * viewModel 创建数据模型
   * md 获取MDLayout顶层div的dom节点，后续用来获取框架中的js对象
   * editoradd 记录是编辑还是新增
   * searchText:调用searchText()获取搜索输入的文字
   * searchFileds:搜索数据库传参,还需要拼装
   * comboData:对应页面***输入下拉选项集合
   */
  var viewModel = {
    md: document.querySelector('#demo-mdlayout'),
    editoradd: '',
    searchText: ko.observable(''),
    searchFileds: ['code'],
    comboData:[{
      value:'11',
      name:'用户体验'
    },{
      value:'12',
      name:'功能测试'
    },{
      value:'13',
      name:'性能测试'
    }],

    /**
     * 方法说明
     * @method refEditFun
     * @param obj 参数说明
     * @return 无
     */
    refEditFun:function(obj){
      var htmlStr = '<input type="text" class="u-form-control"><span class="u-form-control-feedback uf uf-listwithdots"></span>';
      obj.element.innerHTML = htmlStr;
      var _input = obj.element.querySelector('input');
      _input.value = obj.value;
      var span = obj.element.querySelector('.u-form-control-feedback');

      //为第一个class为u-form-control-feedback的元素绑定点击事件
      u.on(span, 'click', function(his) {
        require(['./pages/test_item/testitemref'] , function(ref){
          u.refer({
            title:'测试项目',
            height:'510px',
            isPOPMode: true,
            contentId: 'testitemid_ref',
            module: ref,
            onOk: function(data) {
              var id = data.getValue('testitemid');
              var code = data.getValue('testitemcode');
              var name = data.getValue('testitemname');
              viewModel.listData.setValue('testitemid',id);
              viewModel.listData.setValue('testitemcode',code);
              viewModel.listData.setValue('testitemname',name);
            }
          })
        })
      });
    },
    //主页面的列表数据
    mainDataTable: new u.DataTable({
      meta: {
        'id':{
          type:'string'
        },
        'code':{
          type:'string'
        },
        'type': {
          type: 'string'
        },
        'fromtime': {
          type: 'date'
        },
        'totime': {
          type: 'date'
        },
        'billdate': {
          type: 'date'
        },
        'creatorid': {
          type: 'string'
        },
        'auditorid': {
          type: 'string'
        },
        'budget': {
          type: 'string'
        },
        'content': {
          type: 'string'
        },
        'information': {
          type: 'string'
        },
        'memo': {
          type: 'string'
        }
      },
      pageSize: 10
    }),

    //详细页面的列表数据
    listData: new u.DataTable({
      meta: {
        'orderbid':{
          type:'string'
        },
        'orderid':{
          type:'string'
        },
        'testitemid': {
          type: 'string'
        },
        'testitemcode':{
          type: 'string'
        },
        'testitemname':{
          type: 'string'
        },
        'fromtime': {
          type: 'date'
        },
        'totime': {
          type: 'date'
        },
        'tprice': {
          type: 'integer'
        },
        'tnumber': {
          type: 'integer'
        },
        'tsum': {
          type: 'integer'
        },
        'requirement': {
          type: 'string'
        }
      },
      pageSize: 10
    }),

    //编辑页面的单条数据的详细信息
    infodata: new u.DataTable({
      meta: {
        'id':{
          type:'string'
        },
        'code':{
          type:'string'
        },
        'billdate': {
          type: 'date'
        },
        'fromtime': {
          type: 'date'
        },
        'totime': {
          type: 'date'
        },
        'type': {
          type: 'string'
        },
        'auditorid': {
          type: 'string'
        },
        'creatorid': {
          type: 'string'
        },
        'budget': {
          type: 'string'
        },
        'content': {
          type: 'string'
        },
        'information': {
          type: 'string'
        },
        'memo': {
          type: 'string'
        },
      }
    }),

    events: {
      // 处理下拉列表显示
      comboShow:function(ref){
        var value = ref();
        var datas = viewModel.comboData;
        for(var i = 0; i < datas.length; i++){
          if(datas[i].value == value){
            return datas[i].name
          }
        }
        return value;
      },
      //查询主数据
      queryMain: function(){
        var queryData = {};
        var searchValue = viewModel.searchText();
        for (var i = 0; i < viewModel.searchFileds.length; i++) {
          var key = 'search_LIKE__' + viewModel.searchFileds[i];
          queryData[key] = searchValue;
        }
          queryData["pageIndex"] = viewModel.mainDataTable.pageIndex();
          queryData["pageSize"] = viewModel.mainDataTable.pageSize();
        /*$.ajax({
          type : 'GET',
          url : ctrlBathPath+'/order',
          data : queryData,
          dataType : 'json',
          success : function(result) {
            var data = result.data;
            if(data!=null){
              viewModel.mainDataTable.setSimpleData(data.content);
              viewModel.mainDataTable.totalPages(data.totalPages);
              viewModel.mainDataTable.totalRow(data.totalElements);
            } else {

            }
          }
        });*/
        if(queryData.pageIndex===0){
          require(['text!pages/test_order/test_json/list.json'] , function(result){
              var result = JSON.parse(result);
              var data = result.data;
              if(data!=null){
                viewModel.mainDataTable.setSimpleData(data.content);
                viewModel.mainDataTable.totalPages(data.totalPages);
                viewModel.mainDataTable.totalRow(data.totalElements);
              } else {

              }
          });
        }else if(queryData.pageIndex===1){
          require(['text!pages/test_order/test_json/list1.json'] , function(result){
              var result = JSON.parse(result);
              var data = result.data;
              if(data!=null){
                viewModel.mainDataTable.setSimpleData(data.content);
                viewModel.mainDataTable.totalPages(data.totalPages);
                viewModel.mainDataTable.totalRow(data.totalElements);
              } else {

              }
          });
        }
      },
      //搜索
      search: function(){
        this.events.queryMain();
      },
      //当检测到在搜索框里面敲了回车后就执行搜索
      searchKeyUp: function(model,event){
        if (event.keyCode == '13'){
          this.events.queryMain();
        }
        return true;
      },
      //添加完数据后的处理事件
      afterAdd:function(element, index, data){
              if (element.nodeType === 1) {
                  u.compMgr.updateComp(element);
              }
          },
      //返回事件
      goBack: function() {
        viewModel.md['u.MDLayout'].dBack();
      },
      //跳转页面事件
      goPage: function(pathStr) {
        viewModel.md['u.MDLayout'].dGo(pathStr);
      },
      //点击发布订单的事件
      beforeAdd: function() {
        viewModel.editoradd = 'add';
        viewModel.infodata.clear();
        viewModel.infodata.createEmptyRow();
        viewModel.infodata.setRowSelect(0);
        viewModel.md['u.MDLayout'].dGo('addPage');
        this.listData.setSimpleData();
      },
      //保存新增或者编辑的信息
      addOrEditRow: function() {
        var self = this;
        var _meta = this.mainDataTable.meta;
        var addInfo = this.infodata.getAllRows();
        var url = '';
        var postData = {};
        if (this.editoradd === 'add') {
          url = ctrlBathPath+'/saveAll';
          postData = {order:this.infodata.getSimpleData()[0],details:this.listData.getSimpleData()};
        } else {
          url = ctrlBathPath+'/saveAll';
          postData = {"order":this.infodata.getSimpleData()[0],"details":this.listData.getSimpleData({type:"change"})};
        }
        var jsonData = JSON.stringify(postData);
        /*$.ajax({
          url:url,
          type:'POST',
          contentType: 'application/json',
          data:jsonData,
          success:function(res){
            if (res.flag == 'success'){
              if (self.editoradd === 'add'){
                self.mainDataTable.addSimpleData(res.data.order);
              }else{
                var curRow = viewModel.mainDataTable.getCurrentRow();
                curRow.setSimpleData(viewModel.infodata.getCurrentRow().getSimpleData(), 'upd');
              }
              viewModel.md['u.MDLayout'].dBack();
              u.showMessage('保存成功！');
            }else{
              u.showMessageDialog(res.msg);
            }
          },
          error:function(){
            //待显示错误信息
          }
        });*/
        if (self.editoradd === 'add'){
          self.mainDataTable.addSimpleData(postData.order);
        }else{
          var curRow = viewModel.mainDataTable.getCurrentRow();
          curRow.setSimpleData(viewModel.infodata.getCurrentRow().getSimpleData(), 'upd');
        }
        viewModel.md['u.MDLayout'].dBack();
        u.showMessage('保存成功！');
      },
      //点击修改按钮
      beforeEdit: function(id) {
        viewModel.mainDataTable.setRowSelect(id);
        viewModel.infodata.setSimpleData(viewModel.mainDataTable.getSimpleData({
          type: 'select'
        }));
        viewModel.listData.removeAllRows();
        var infoId = viewModel.infodata.getValue('id');
        // 通过Id发请求查找子表数据
        viewModel.editoradd = 'edit';
        viewModel.md['u.MDLayout'].dGo('addPage');

        /*$.ajax({
          url:ctx+'/test_order/detail/' + infoId + '?t=' + Date.now() ,
          type:'get',
          dataType : 'json',
          success: function(res){
            viewModel.listData.setSimpleData(res.data.details);
          }
        });*/
        require(['text!pages/test_order/test_json/list1.json'] , function(result){
          var result = JSON.parse(result);
          if(data!=null){
            viewModel.listData.setSimpleData(result.data.details);
          } else {

          }
        });
      },
      //点击删除按钮
      delRow: function() {
        var selectArray = viewModel.mainDataTable.selectedIndices();
        if (selectArray.length < 1) {
          u.messageDialog({
            msg: "请选择要删除的行!",
            title: "提示",
            btnText: "OK"
          });
          return;
        }
            u.confirmDialog({
                msg: "是否确认删除？",
                title: "测试确认",
                onOk: function () {
                    /*$.ajax({
                      url:ctx+'/test_order/del',
                      type:'post',
                      data:{data:JSON.stringify(viewModel.mainDataTable.getSimpleData({type:'select',fields:['id']}))},
                      success: function(){
                        u.showMessage('删除成功！');
                        viewModel.events.queryMain();
                      }
                    });*/
            viewModel.mainDataTable.removeRow(viewModel.mainDataTable.getSelectedIndexs());
            u.showMessage('删除成功！');
                },
                onCancel: function () {
                }
            });
      },
      //打印
      print: function() {
        Print.printByElementIds([ "table-list" ]);
      },
      //pdf打印
      print2: function() {
        /*$.ajax({
          url:ctx+'/PrintController',
          type:'post',
          success: function(){
          }
        })*/
      },
      //分享
      share: function() {
        document.getElementById('light').style.display='block';
      },
      //点击附件按钮，增加附件
      addAttachRow: function() {
        u.messageDialog({
            msg: "应用组件---附件---测试!",
            title: "提示",
            btnText: "OK"
        });
        return;
      },
      //查看详细信息
      viewRow: function(id) {
        var tar = event.target || event.srcElement;
        if(typeof event == 'undefined')
          event = arguments.callee.caller.arguments[0]
        //如果样式列表不含有checkbox说明不是第一列
                var tar = event.target || event.srcElement;
                if (!u.hasClass(tar,'checkbox')) {
                    viewModel.mainDataTable.setRowFocus(id);
                    var infoId = viewModel.mainDataTable.getValue('id');
                    viewModel.md['u.MDLayout'].dGo('showPage');
            // Date.now() 兼容IE8  ie8刷新后直接点击查看 是没有子表数据的
            if(!Date.now){
            	Date.now = function(){
                    return new Date().valueOf();
                }
            }
          /*$.ajax({
            url:ctx+'/test_order/detail/' + infoId + '?t=' + Date.now() ,
            type:'get',
            dataType : 'json',
            success: function(res){
              viewModel.listData.setSimpleData(res.data.details);
            }
          });*/
          require(['text!pages/test_order/test_json/info.json'] , function(result){
              var result = JSON.parse(result);
            viewModel.listData.setSimpleData(result.data.details);
          });

        }
      },
      //结算
      calc:function(id) {
        var tar = event.target || event.srcElement;
        //如果样式列表不含有checkbox说明不是第一列
        if (!u.hasClass(tar,'checkbox')) {
          viewModel.mainDataTable.setRowFocus(id);
          var infoId = viewModel.mainDataTable.getValue('id');
          window.open(ctx+"/submit_pay.html?infoId="+infoId, "_blank");
        }
      },
      //页面更改
      pageChangeFunc: function(index){
        viewModel.mainDataTable.pageIndex(index);
        viewModel.events.queryMain();
      },
      //页内个数更改
      sizeChangeFunc: function(size){
        viewModel.mainDataTable.pageSize(size);
        viewModel.mainDataTable.pageIndex(0);
        viewModel.events.queryMain();
      },
      //增行
      addListRow : function(){
        viewModel.listData.createEmptyRow();
      },
      //删行
      delListRow:function(){
        var selectArray = viewModel.listData.selectedIndices();
        if (selectArray.length < 1) {
          u.messageDialog({
            msg: "请选择要删除的行!",
            title: "提示",
            btnText: "OK"
          });
          return;
        }
        if (this.editoradd === 'add') {
          viewModel.listData.removeRows(selectArray);
        }else{
          u.confirmDialog({
                  msg: "是否确认删除？",
                  title: "测试确认",
                  onOk: function () {
                      /*$.ajax({
                        url:ctx+'/test_order/deldetail',
                        type:'post',
                        //前端应该提交多行，批量删除
                        data:{data:JSON.stringify(viewModel.listData.getSimpleData({type:'select',fields:['orderbid']}))},
                        success: function(){
                          u.showMessage('删除成功！');
                          viewModel.listData.removeRows(selectArray);
                        }
                      });*/
              u.showMessage('删除成功！');
                      viewModel.listData.removeRows(selectArray);
                  },
                  onCancel: function () {

                  }
              });
        }
      }
    }
  };
  window.viewModel = viewModel;
    var init = function(panel) {
  	panel.innerHTML = template;
    var app = u.createApp({
      el: '#content',
      model: viewModel
    });
    viewModel.md = document.querySelector('#demo-mdlayout');
      viewModel.events.queryMain();
  };
	init(document.getElementById('content'));

},"html");
