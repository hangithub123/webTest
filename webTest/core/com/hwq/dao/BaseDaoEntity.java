package com.hwq.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.hwq.po.BasePO;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;

@Component
public class BaseDaoEntity {
	@Resource(name="jdbcTemplate")
	JdbcTemplate jdbcTemplate;
	@Resource(name="paraJdbcTemplate")
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	/**
	 * 
	 * 功能逻辑：返回list<map>
	 *
	 * @方法名称：queryForList
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param paramSource
	 * @return List
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public List queryForList(String sql,SqlParameterSource paramSource) {
		return namedParameterJdbcTemplate.queryForList(sql, paramSource);
	}
	/**
	 * 
	 * 功能逻辑：返回list<map>
	 *
	 * @方法名称：queryForList
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param
	 * @return List
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public List queryForList(String sql,Map map) {
		return namedParameterJdbcTemplate.queryForList(sql, map);
	}
	/**
	 * 
	 * 功能逻辑：返回po
	 *
	 * @方法名称：queryForObject
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param
	 * @param classType
	 * @return Object
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public Object queryForObject(String sql,SqlParameterSource sqlParameterSource,Class<? extends BasePO> classType) {
		RowMapper<? extends BasePO> mapper = BeanPropertyRowMapper.newInstance(classType);
		return namedParameterJdbcTemplate.queryForObject(sql,sqlParameterSource,mapper);
	}
	/**
	 * 
	 * 功能逻辑：
	 *
	 * @方法名称：queryForObject
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param paramSource
	 * @param
	 * @return Object
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public Object queryForMap(String sql,SqlParameterSource paramSource) {
		return namedParameterJdbcTemplate.queryForObject(sql, paramSource, Map.class);
	}
	/**
	 * 
	 * 功能逻辑：返回string
	 *
	 * @方法名称：queryForString
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param paramSource
	 * @return Object
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public String queryForString(String sql,SqlParameterSource paramSource) {
		return namedParameterJdbcTemplate.queryForObject(sql, paramSource, String.class);
	}
	/**
	 * 
	 * 功能逻辑：sql更新
	 *
	 * @方法名称：update
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param paramSource
	 * @return int
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public int update(String sql,SqlParameterSource paramSource) {
		return namedParameterJdbcTemplate.update(sql, paramSource);
	}
	/**
	 * 
	 * 功能逻辑：根据条件更新
	 *
	 * @方法名称：update
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param po
	 * @param whereSql
	 * @return int
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public int updateWithConditions(BasePO po,String whereSql,SqlParameterSource paramSource) {
		String strUpdSql = "update " + po.getTableName() + " set \n" ;
		String[] attrs=po.getAttributes(false).split(",");//属性
		String[] values=po.getValues(false).split(",");//属性
		int indexLast=attrs.length-1;
		for(int i=0;i<attrs.length;i++){
			if(po.getKeyName().equals(attrs[i])){continue;}//不更新id
			if(i==indexLast)
				strUpdSql+=attrs[i]+"="+values[i]+"\n";
			else
				strUpdSql+=attrs[i]+"="+values[i]+",\n";
		}
		strUpdSql+=" where \n"+whereSql;
		return jdbcTemplate.update(strUpdSql,paramSource);
	}
	/**
	 * 
	 * 功能逻辑：根据主键更新
	 *
	 * @方法名称：update
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param po
	 * @return int
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public int updateById(BasePO po) {
		String strUpdSql = "update " + po.getTableName() + " set \n" ;
		String[] attrs=po.getAttributes(false).split(",");//属性
		String[] values=po.getValues(false).split(",");//属性值
		int indexLast=attrs.length-1;
		String keyValue=null;
		for(int i=0;i<attrs.length;i++){
			if(po.getKeyName().equals(attrs[i])){keyValue=values[i]; continue;}//不更新id
			if(i==indexLast)
				strUpdSql+=attrs[i]+"="+values[i]+"\n";
			else
				strUpdSql+=attrs[i]+"="+values[i]+",\n";
		}
		MapSqlParameterSource mps=new MapSqlParameterSource();
		strUpdSql+="where "+po.getKeyName()+" = "+keyValue;
		mps.addValue("keyValue",keyValue.replaceAll("'",""));
		 jdbcTemplate.execute(strUpdSql);
		 return 1;
		//return jdbcTemplate.update(strUpdSql,mps);
	}


	/**
	 * 功能逻辑：获取条件属性值sql
	 * @param po
	 * @return
	 */
	public String getStrKeyWhere(BasePO po){
		String whereSql="";
		String[] attrs=po.getAttributes(false).split(",");//属性
		String[] values=po.getValues(false).split(",");//属性值
		int indexLast=attrs.length-1;
		for(int i=0;i<attrs.length;i++){
			if(i==indexLast)
				whereSql+=attrs[i]+"="+values[i]+"\n";
			else
				whereSql+=attrs[i]+"="+values[i]+" and \n";
		}
		return whereSql;
	}
	//执行sql
	public void execute(String sql) {
		jdbcTemplate.execute(sql);
	}
	/**
	 * 
	 * 功能逻辑：根据sql删除
	 *
	 * @方法名称：detete
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param sql
	 * @param paramSource void
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public void detete(String sql,SqlParameterSource paramSource) {
		namedParameterJdbcTemplate.execute(sql, paramSource, new PreparedStatementCallback<Object>() {  
		    public Integer doInPreparedStatement(PreparedStatement pstmt) throws SQLException, DataAccessException {  
		        pstmt.execute();  
		        ResultSet rs = pstmt.getResultSet();  
		        rs.next();  
		        return rs.getInt(1);  
		    }});
	}
	/**
	 *
	 * 功能逻辑：根据条件删
	 *
	 * @方法名称：detete
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 *
	 * @param po void
	 *
	 * @修改记录（修改时间、作者、原因）：
	 */
	public void deteteByConditions(BasePO po) {
		String sql="delete "+po.getTableName()+" where "+getStrKeyWhere(po);
		execute(sql);
	}
	/**
	 * 
	 * 功能逻辑：批量删除
	 *
	 * @方法名称：batchdelete
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param po void
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 * //TODO 大批量删除方法改造
	 */
	public void batchDelete(List<BasePO> po) {
		if(po!=null && po.size()>0) {
			for (BasePO basePO : po) {
				deteteByConditions(basePO);
			}
		}
	}
	/**
	 * 
	 * 功能逻辑：新增
	 *
	 * @方法名称：insert
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param po void
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 */
	public void insertSingle(BasePO po) {
		String insertSql="insert into "+po.getTableName()+" ("+po.getAttributes(false)+") values ("+po.getValues(false)+")";
		execute(insertSql);
	}
	/**
	 * 
	 * 功能逻辑：批量插入
	 *
	 * @方法名称：batchInsert
	 * @作者:韩伟其
	 * @创建日期： 2019年6月16日
	 * 
	 * @param po void
	 * 
	 * @修改记录（修改时间、作者、原因）：
	 * //TODO 大批量插入方法改造
	 */
	public void batchInsert(List<BasePO> po) { 
		if(po!=null && po.size()>0) {
			for (BasePO basePO : po) {
				insertSingle(basePO);
			}
		}
	}
}
