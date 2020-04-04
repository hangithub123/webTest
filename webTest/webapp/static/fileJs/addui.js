//提交
function submitFun(obj){
	var data = new Object();
	data.uiCode = $("#uiCode").val();
	data.jsFun = $("#jsFun").val();
	data.staticFile = $("#staticFile").val();
	data.showui = $("#showui").val();
	data.showui_name = $("#showui_name").val();
	data.uicode_name = $("#uicode_name").val();
	data.uicode_ms = $("#uicode_ms").val();
	data.uicode_type = $("#uicode_type").val();
	if(data.uiCode == null || data.uiCode == ""){layer.alert("ui片段不可为空！");return false;}
	if(data.showui == null || data.showui == ""){layer.alert("showui片段不可为空！");return false;}
	if(data.uicode_type==-1){layer.alert("请选择ui片段类型！");return false;}
	//增加javacode
	data.javaCode = getjavaproperty();
	//增加page属性
	data.pagecode = $("#pagecode").val();
	var url = "/UIEditor/index/saveui";
	var result = getDataByUrlParam(url,data);
	if(result.flag=='ok'){layer.alert("ui片段添加成功！",{icon: 1});}else{layer.alert("ui片段添加失败！",{icon: 0});}
	return true;
}
//添加java属性
function addproperty(obj){
	var propertyname = $("#java_property").children("[name=java_propertyname]").eq(0);
	var propertytype = $("#java_property").children("[name=java_propertytype]").eq(0);
	var java_isinit = $("#java_property").children("[name=java_isinit]").eq(0);
	$("#java_property").append($(propertyname).clone(true));
	$("#java_property").append($(propertytype).clone(true));
	$("#java_property").append($(java_isinit).clone(true));
}
//组装java数据
function getjavaproperty(){
	var propertyname = $("#java_property").children("[name=java_propertyname]");
	var propertytype = $("#java_property").children("[name=java_propertytype]");
	var java_isinit = $("#java_property").children("[name=java_isinit]");
	var java_method = $("#java_method").val();
	var obj=new Object();
	var java_property_name="",java_property_type="",java_isinit_="";
	var len=propertyname.length;
	for(var i=0;i<len;i++){
		if(propertyname.eq(i).val()!=""){
			java_property_name += propertyname.eq(i).val()+",";
			java_property_type += propertytype.eq(i).val()+",";
			java_isinit_ += java_isinit.eq(i).val()+",";
		}
	}
	obj.java_propertyname=java_property_name;
	obj.java_propertytype=java_property_type;
	obj.java_isinit=java_isinit_;
	obj.java_method=java_method;
	return obj;
}