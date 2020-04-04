<@hwq.html>
    <@hwq.head>
    </@hwq.head>
    <@hwq.body>
        <table id="demo" lay-filter="test"></table>

        <script>
            layui.use('table', function(){
                var table = layui.table;

                //第一个实例
                table.render({
                    elem: '#demo'
                    ,height: 312
                    ,url: '${ctx}/user/getData.do' //数据接口
                    ,page: false //开启分页
                    ,cols: [[ //表头
                        {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
                        ,{field: 'attribution2', title: '地区', width:180}
                        ,{field: 'firstrecommentdfield2', title: '车牌号', width:180, sort: true}
                        ,{field: 'cz', title: '操作', width:100,  templet: '#hideOrShow'}
                    ]]
                   ,parseData: function(res) { //res 即为原始返回的数据
                        console.log(res)
                        return {
                            "code": res.code,
                            "data": res.rows.columns //解析数据
                        };
                    }
                });
            });
            function aa(){
                alert('cz字段为1则显示该按钮，其他不显示！');
            }
        </script>
        <script type="text/html" id="hideOrShow">
            {{#  if(d.cz ==1){ }}
            <a href="###" onclick="aa();" class="layui-table-link">按钮</a>
            {{#  } }}
        </script>
    </@hwq.body>
</@hwq.html>