<#-- html -->
<#macro html>
	<!doctype html>
	<html lang="en">
	<#nested>
	</html>
</#macro>
<#assign fileversion="?v=1.0"/>
<#-- head -->
<#macro head title>
	<head>
		<title>${title!''}</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
		<@script src="publicJs/jquery-3.3.1.js"/>
		<@script src="assets/vendor/bootstrap/js/bootstrap.min.js"/>
		<@link href="assets/vendor/bootstrap/css/bootstrap.min.css"/>
		<@link href="fileCss/fileCss.css"/>
		<@link href="fileCss/panel.css"/>
		<@link href="fileCss/button.css"/>
		<@link href="layui/css/layui.css"/>
		<@script src="layer/layer.js"/>
		<@script src="layui/layui.all.js"/>
		<@script src="publicJs/popups.js"/>
		<@script src="publicJs/ajaxUtils.js"/>
		<@script src="publicJs/fileUAD.js"/>
		<@hwq.script src="fileJs/blog.js"/>
		<script src="https://gogojie.oss-cn-beijing.aliyuncs.com/gogojie_1.js" type="text/javascript"></script>
		<#nested>

	</head>
</#macro>

<#macro body class style>
	<body class="${class}" style="${style}">
    <#nested>
	</body>
</#macro>
<#-- script -->
<#macro script src >
	<script src="${ctx}/static/${src}${fileversion}" type="text/javascript" charset="utf-8"></script>
</#macro>

<#-- link -->
<#macro link href >
	 <link href="${ctx}/static/${href}${fileversion}" rel="stylesheet" > </link>
</#macro>

<#-- img -->
<#macro img src style class other>
	 <img src="${ctx}/static/images/${src}" style="${style}" class="${class}" <#if other??>${other}</#if>></img>
</#macro>



<#-- 弹出层所需的js -->
<#macro popupsJs >
	<@script src="publicJs/popups.js"/>
</#macro>

<#-- 使用分页所需的css和js -->
<#macro splitpageCssAndJs>
	<@script src="publicJs/splitPage.js"/>
</#macro>

<#-- 分页 -->
<#macro splitpage>
	<#if pageParams??>
	<a  id="splitTurntoPage" page="${pageParams.page}" pageSize="${pageParams.pageSize}"
	 total="${pageParams.total}">
		<span id="splitTurntoPageSpan"></span>
	</a>
	<div align="right" id="splitpage"></div>
	<#else>
	<span>分页对象不能为空</span>
	</#if>
</#macro>

<#-- 文件上传所需的js -->
<#macro fileJs>
	<@script src="publicJs/ajaxUtils.js"/>
	<@script src="publicJs/fileUAD.js"/>
</#macro>

<#--文件上传 -->
<#macro fileUpload wdname>
	<input  type="file" name="file" id="file" value="<#if wjb??>${(wjb.wjm)!''}</#if>"/><#if wjb??>${wjb.wjm!''}</#if>
	<#nested>
	<input type="hidden" id="${wdname}" name="${wdname}" value="${wdid!''}"/>
    <input type="hidden" id="upload" value="上传附件" onclick="uploadFile('${ctx}/file/upload?${wdname}=${wdid!''}')"/>
</#macro>

<#--文件下载 -->
<#macro fileDownload filename>
	<a href="${ctx}/file/download?fileName=${filename!''}">${filename!''}</a>
</#macro>

<#-- 日期格式化 -->
<#macro showdate time>
	<#if time?length==4>
		${time?substring(0,4)}/
	<#elseif time?length==8>
		${time?substring(0,4)}/${time?substring(4,6)}/${time?substring(6,8)}
	<#elseif time?length==14>
		${time?substring(0,4)}/${time?substring(4,6)}/${time?substring(6,8)} ${time?substring(8,10)}:${time?substring(10,12)}:${time?substring(12,14)}
	<#else>
		${time}
	</#if>
</#macro>

<#-- 下拉框,注意map需要转为json -->
<#macro select id name selectMap selected>
	<select id="${id}" name="${name}" class="form-control">
		<option>请选择</option>
	</select>
	<script>
	$(function(){
	   var selected=${selected}+"";
	   var strmap=${selectMap};
	   var select=${id};
	   for(var key in strmap){
		   var option =new Option(strmap[key],key);
		   if(key==selected){
			   option.selected=true;
			 }
		   select.add(option);
	   }
	});
	</script>
</#macro>

<#-- 日期组件所需的js -->
<#macro WdatePicker>
	<@script src="My97DatePicker/WdatePicker.js"/>
</#macro>

<#--日期组件 id不可空,len 8或14-->
<#macro date id name value len>
  <#assign datefmt="yyyy/MM/dd HH:mm:ss" />
  <#if len?? && len == 8>
  	<#assign datefmt="yyyy/MM/dd" />
  </#if>
  <input class="Wdate" id="WdatePicker_${id}" type="text" onchange="WdatePickerchange(this)" value="<@xy.showdate time='${value}'/>" onClick="WdatePicker({el:this,dateFmt:'${datefmt}',skin:'twoer',onpicked:pickedFunc})" />
  <input type="hidden" id="${id}" name="${name}"  value="${value}"  />
	<script type="text/javascript">
	function pickedFunc(){
		var value=$dp.cal.getNewDateStr();
		if(value!=""){
		value=value.replace(/\ +/g,"");
		value=value.replace(/(:)/g,"");
		value=value.replace(/(\/)/g,"");
		}
		$('#${id}').val(value);
	}
	function WdatePickerchange(obj){
		var time=$(obj).val();
		return $(obj).val(time.trim());
	}
	$(function(){
		var time=$("#WdatePicker_${id}").val();
		$("#WdatePicker_${id}").val(time.trim());
	});
	</script>
</#macro>
