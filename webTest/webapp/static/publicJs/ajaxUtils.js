function getDataByUrlParam(url, param) {
	var result;
	// 开始ajax
	$.ajax({
		url : url,
		dataType : 'json', // 表示返回值的数据类型
		contentType:"application/json;charset=utf-8", // 内容类型
		traditional : true, // 使json格式的字符串不会被转码
		type : "post",
		cache : false,
		async : false,
		data : JSON.stringify(param),
		success : function(data) {
			result = data;
		}
	});
	// ajax结束
	return result;
}
function sendByUrl(url) {
	var result;
	// 开始ajax
	$.ajax({
		url : url,
		type : "get",
		cache : false,
		async : true,
		success : function(data) {
			result = data;
		}
	});
	// ajax结束
	return result;
}
