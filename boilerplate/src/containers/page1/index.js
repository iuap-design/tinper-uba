require('./index.css');
var pageHtml = require('./index.html');

module.exports = function() {

    document.querySelector('.page-container').innerHTML = pageHtml;
    var meta = {
        meta: {
            vyear: {
                type: 'string',
                default: new Date().getFullYear()
            },
            contractUnionId: {
                type: "string"
            },
            vstatus: {
                type: "string",
                default: '开立'
            },
        }
    };
    var meta_2 = {
        meta: {
            'unionContractPeople': { //联保方
                type: "string",
            },
            'idNumber': { //身份证号/统一社会编码
                type: "string"
            },
            'vnote': {
                type: "string"
            }
        }
    };
    var data = {
        listTable_1: new u.DataTable(meta),
        listTable_2: new u.DataTable(meta_2),
        cardTable: new u.DataTable(meta),
        itemTable: new u.DataTable(meta_2),
        formState: [{
            name: '开立',
            value: '开立'
        }, {
            name: '关闭',
            value: '关闭'
        }],
    };

    var events = {
        addClick: function() {
            var row = viewModel.cardTable.createEmptyRow();
            viewModel.cardTable.setRowFocus(row);

            var a = document.getElementById('u_master');
            a.style.display = "none";
            var md = document.querySelector('#u_md')['u.MDLayout'];
            md.dGo('card_show');
        },
        delClick: function() {
            var row = viewModel.listTable_1.getSelectedRows();
            if (row.length > 0) {
                viewModel.listTable_1.removeRows(row);
                viewModel.listTable_2.removeAllRows();
            } else {
                u.showMessage({
                    msg: "未选中行",
                    position: "center"
                });
            }
        },
        updClick: function() {
            var row = viewModel.listTable_1.getSelectedRows();
            if (row.length > 0) {
                var data = row[0].getData().data;
                viewModel.cardTable.setSimpleData(data);
                viewModel.itemTable.setSimpleData(viewModel.listTable_2.getSimpleData());
                var md = document.querySelector('#u_md')['u.MDLayout'];
                md.dGo('card_show');
            } else {
                u.showMessage({
                    msg: "未选中行",
                    position: "center"
                });
            }
        },
        searchClick: function() {

        },
        resetClick: function() {
            $(document).find('#u_master').find('input').val('');
        },
        saveClick: function() {
            var status = viewModel.cardTable.getSelectedRows()[0].status;
            var data = viewModel.cardTable.getCurrentRow().getData().data;
            if (data) {
                if (status != "new") {
                    var meta = viewModel.cardTable.meta;
                    for (var field in meta) {
                        viewModel.listTable_1.setValue(field, data[field].value);
                    }
                } else {
                    viewModel.listTable_1.addSimpleData(data);
                    var length = viewModel.listTable_1.getSimpleData().length; //获取当前主表数据条数
                    viewModel.listTable_1.setRowSelect(length - 1); //设置新增行的选中
                    viewModel.listTable_2.setSimpleData(viewModel.itemTable.getSimpleData());
                }
            }

            u.showMessage({
                msg: "保存成功",
                position: "center"
            });
            viewModel.cardTable.clear();
            viewModel.backClick();

        },
        backClick: function() {
            var md = document.querySelector('#u_md')['u.MDLayout'];
            document.querySelector('.u-mdlayout-master').style.display = "block";
            viewModel.cardTable.clear();
            viewModel.itemTable.clear();
            md.dBack();
        },
        rowClick: function() {
            viewModel.listTable_2.clear();
            viewModel.listTable_2.setSimpleData([{
                "unionContractPeople": '张三',
                "idNumber": '20160101',
                "vnote": '开立'
            }, ]);
        },
        addItemClick: function() {
            var row = viewModel.itemTable.createEmptyRow();
            viewModel.itemTable.setRowFocus(row);
        },
        delItemClick: function() {
            var row = viewModel.itemTable.getSelectedRows();
            if (row.length > 0) {
                viewModel.itemTable.removeRows(row);
            } else {
                u.showMessage({
                    msg: "未选中行",
                    position: "center"
                });
            }
        }
    };

    var varinit = function() {
        $.ajax({
            type: "get",
            url: "./api/page1/page1.json",
            dataType: "json",
            async: true,
            success: function(data) {
                if (data.success) {
                    viewModel.listTable_1.setSimpleData(data.msg);
                    viewModel.listTable_2.setSimpleData(data.msg1);
                }
            }
        });
    };

    var viewModel = u.extend({}, data, events);
    $(function() {
        var app = u.createApp({
            el: "#u_md",
            model: viewModel
        });
        varinit();
    });
}
