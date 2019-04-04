
var baseUrl = "http://10.110.30.133:8000/cgi-bin/cgi.cgi?/app/route/network/lan";
// var userName = GetlocalStorage('userName');
// var DepartmentName = GetlocalStorage('departmentName');
// var tokens = GetlocalStorage('tokens');

// function getUrl(url) {
// 	return baseUrl + url + (url != '/login' ? "?access_token=" + tokens : '');
// }

function PostAjax(url, datas, callback) {
	$.ajax({
		type: 'POST',
		url: baseUrl,
		data: datas,
		dataType: "json",
		crossDomain: true,
		success: function (data) {
			var code = data.code;
			if (code == 3003) {
				top.window.location.href = "login.html?Readm=" + Math.random();
				return;
			}
			callback(data);
		},
		error: function (xhr) {
			closeLogding();
			if (xhr.status == 403) {
				top.window.location.href = "login.html?Readm=" + Math.random();
			} else {
				layer.msg('数据加载失败~', {
					icon: 2
				});
				error(xhr, textStatus, errorThrown);

			}
		}
	});
}

function PostJSON(url, datas, callback) {
	$.ajax({
		type: 'POST',
		url: baseUrl,
		data: JSON.stringify(datas),
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		crossDomain: true,
		success: function (data) {
			var code = data.code;
			if (code == 3003) {
				top.window.location.href = "login.html?Readm=" + Math.random();
				return;
			}
			callback(data);
		},
		error: function (xhr) {
			closeLogding();
			if (xhr.status == 403) {
				top.window.location.href = "login.html?Readm=" + Math.random();
			} else {
				layer.msg('数据加载失败~', {
					icon: 2
				});
				error(xhr, textStatus, errorThrown);
			}
		}
	});
}

function GetAjax(url, datas, callback) {
	$.ajax({
		type: 'GET',
		url: baseUrl,
		data: datas,
		dataType: "json",
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function (data) {
			var code = data.code;
			if (code == 3003) {
				top.window.location.href = "login.html?Readm=" + Math.random();
				return;
			}
			callback(data);
		},
		error: function (xhr) {
			closeLogding();
			if (xhr.status == 403) {
				top.window.location.href = "login.html?Readm=" + Math.random();
			} else {
				layer.msg('数据加载失败~', {
					icon: 2
				});
				error(xhr, textStatus, errorThrown);
			}
		}
	});
}

var logs=true;
function loges(vals){
	if(logs==true){
		 return console.log(vals);
	}else{
		return "";
	}
}
function GetlocalStorage(key) {
    var value = localStorage[key];
    if (value != undefined && value != null) {
        return value;
    } else {
        return "";
    }
}
function SetlocalStorage(key, value) {
    localStorage.setItem(key, value);
}
function RemovelocalStorage(key) {
    localStorage.removeItem(key);
}
//null转换
function _replaceNull(data){
	data = JSON.stringify(data);
	var newRegExp = new RegExp('null',"g");
 	return data.replace(newRegExp,"\"-\"");	
}
//复选框
function onCheckboxClick(obj){
    if ($(obj).hasClass("layui-form-checked")){
		$(obj).removeClass('layui-form-checked');
	} else { 
	    $(obj).addClass('layui-form-checked');
	}  
}
function CheckBox(obj){ 
	if ($(obj).hasClass("layui-form-checked")){
		$(obj).removeClass('layui-form-checked');
		$(obj).parents().siblings().find('.layui-form-checkbox').removeClass('layui-form-checked');
    } else { 
    	$(obj).addClass('layui-form-checked');
    	$(obj).parents().siblings().find('.layui-form-checkbox').addClass('layui-form-checked');
    }  
};
//全选与反选
function onchecked(obj){
	if(obj.checked){
		$(obj).parent().siblings().find('.check input').prop('checked','checked');
	}else{
		$(obj).parent().siblings().find('.check input').removeAttr('checked');
	}
}
//退出
function Exit(){
    layer.confirm('是否确定退出系统？', {
     btn: ['是','否'] ,//按钮
	 icon:2,
    }, 
	function(){
		RemovelocalStorage('userName');
		RemovelocalStorage('userid');
		RemovelocalStorage('tokens');
	    location.href="login.html?Readm="+ Math.random();
        
    });
};
//刷新
function Refresh(){
	window.location.reload(); 
}
//下拉选择
$(".layui-form-select").click(function(){
	if ($(this).hasClass("layui-form-selected")){
        $(this).removeClass('layui-form-selected');
	} else { 
	    $(this).addClass('layui-form-selected');
	}
})
function selectlist(){
	$(".layui-form-select").bind("input propertychange",function(){
		if ($(this).hasClass("layui-form-selected")){
	        $(this).removeClass('layui-form-selected');
		} else { 
		    $(this).addClass('layui-form-selected');
		}
	})
}
//生产管理工单状态
var WO_STATUS_TOAUDIT = 0;
var WO_STATUS_AUDIT = 1;
var WO_STATUS_PRODUCTING = 2;
var WO_STATUS_FINISHED = 3;
var WO_STATUS_STOP = 4;
var WO_STATUS_AUDIT_FAILED = 5;

function getWorkOrderStatus(status){
	switch(status){
		case WO_STATUS_TOAUDIT:
			return '待审核';
		case WO_STATUS_AUDIT:
			return '已审核';
		case WO_STATUS_PRODUCTING:
			return '生产中';
		case WO_STATUS_FINISHED:
			return '已结束';
		case WO_STATUS_STOP:
			return '已终止';
		case WO_STATUS_AUDIT_FAILED:
			return '审核未通过';
	}
}

function getWorkOrderStatusWithStyle(status){
	switch(status){
		case WO_STATUS_TOAUDIT:
			return '<a class="layui-btn layui-btn-xs  layui-btn-primary">待审核</a>';
		case WO_STATUS_AUDIT:
			return '<a class="layui-btn layui-btn-xs layui-btn-normal">已审核</a>';
		case WO_STATUS_PRODUCTING:
			return '<a class="layui-btn layui-btn-xs">生产中</a>';
		case WO_STATUS_FINISHED:
			return '<a class="layui-btn layui-btn-xs bg-c">已结束</a>';
		case WO_STATUS_STOP:
			return '<a class="layui-btn layui-btn-xs layui-btn-danger">已终止</a>';
		case WO_STATUS_AUDIT_FAILED:
			return '<a class="layui-btn layui-btn-xs layui-btn-warm">审核未通过</a>';
	}
}
//生产计划状态
var STATUS_FAILED=1;
var STATUS_CREATING=2;
var STATUS_PENDING_COMMIT=3;
var STATUS_PENDING_AUDIT=4;
var STATUS_PENDING_APPROVAL=5;
var STATUS_APPROVAL=6;
function getProductionPlanStatus(status){
	switch(status){
		case STATUS_FAILED:
			return '<a class="layui-btn layui-btn-xs bg-c">未通过</a>';
		case STATUS_CREATING:
			return '<a class="layui-btn layui-btn-xs layui-btn-primary">创建中</a>';
		case STATUS_PENDING_COMMIT:
			return '<a class="layui-btn layui-btn-xs layui-btn-normal">待提交</a>';
		case STATUS_PENDING_AUDIT:
			return '<a class="layui-btn layui-btn-xs">待审核</a>';
		case STATUS_PENDING_APPROVAL:
			return '<a class="layui-btn layui-btn-xs layui-btn-warm">待批准</a>';
		case STATUS_APPROVAL:
			return '<a class="layui-btn layui-btn-xs layui-btn-warm">已批准</a>';
	}
}