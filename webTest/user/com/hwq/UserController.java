package com.hwq;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("user")
@Controller
public class UserController {
    @RequestMapping
    public String index(HttpServletRequest req, HttpServletResponse rep){
        return "com/hwq/user/index";
    }
    @RequestMapping(value="getData",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getData(HttpServletRequest req, HttpServletResponse rep, String value1){
//模拟数据s
        JSONObject Jobj=new JSONObject();
        Jobj.put("catchTable","qrySql:select * from dual");
        Jobj.put("orderBySetedt","false");
        Jobj.put("code",0);
        Jobj.put("pageSize","20");
        List<Map> columnslist=new ArrayList();
        Map map1=new HashMap();
        map1.put("attribution","河南郑州移动");
        map1.put("firstrecommentdfield","豫A8QM37");
        map1.put("handle",1);
        map1.put("rownum_",1);
        map1.put("secondrecommentdfield",1);
        map1.put("cz",1);
        map1.put("id","1");
        Map map2=new HashMap();
        map2.put("attribution","河南开封移动");
        map2.put("firstrecommentdfield","豫B8QM38");
        map2.put("handle",2);
        map2.put("rownum_",1);
        map2.put("secondrecommentdfield",2);
        map2.put("cz",2);
        map2.put("id","2");
        columnslist.add(map1);
        columnslist.add(map2);
        JSONObject columns=new JSONObject();
        columns.put("columns",columnslist);
        Jobj.put("rows",columns);
        Jobj.put("total",1);
        //模拟数据end
        System.out.println(Jobj.toString());

        //获取Jobj中的rows，columns
        JSONObject get_columns= (JSONObject)Jobj.get("rows");
        JSONArray get_results= (JSONArray) get_columns.get("columns");
        for(int i=0;i<get_results.length();i++){
            JSONObject jsonObject=(JSONObject)get_results.get(i);
            Object attribution_value =jsonObject.get("attribution");
            Object firstrecommentdfield_value =jsonObject.get("firstrecommentdfield");
            //更改attribution为attribution2。(就是再存一个值，把原来的删了)
            jsonObject.put("attribution2",attribution_value);
            jsonObject.remove("attribution");
            //同理
            jsonObject.put("firstrecommentdfield2",firstrecommentdfield_value);
            jsonObject.remove("firstrecommentdfield");

    }
        //变更后的结果
        System.out.println(Jobj.toString());
        return Jobj.toString();
    }
}
