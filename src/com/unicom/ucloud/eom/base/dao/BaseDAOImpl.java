package com.unicom.ucloud.eom.base.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.unicom.ucloud.eom.base.bean.Page;
import com.unicom.ucloud.eom.base.common.CalendarHelper;
import com.unicom.ucloud.util.JsonUtil;

/**
 * DAO基类实现类
 * 
 * @version 1.0
 * @date 2013-1-10
 * @author guojinan
 */
public class BaseDAOImpl implements IBaseDAO {

    private static final String SQL_SELECT_TAG = "SELECT";

    private static final String SQL_FROM_TAG = "FROM";
    private static final String SQL_ORDERBY_TAG = "ORDER BY";
    private static final String SQL_DISTINCT_TAG = "DISTINCT";
    private static final String SQL_GROUP_BY_TAG = "GROUP BY";
    private static final String COMMA_SPLIT = ",";

    /**
     * 模块调试级别日志纪录类,调试用的代码，请尽量使用debug
     */
    protected final Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Connection getConnection() throws SQLException {
        return getJdbcTemplate().getDataSource().getConnection();
    }

    /**
     * 关闭连接
     * 
     * @param conn
     * @param st
     * @param rs
     */
    protected void closeConn(Connection conn, Statement st, ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (st != null) {
            try {
                st.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        logger.debug("调用：closeConn");
    }

    /**
     * 获取总记录数
     * 
     * @param sqlBuf
     * @param args
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public long queryCount(String sqlBuf, Object... args) throws Exception {
        if(null == sqlBuf){
            throw new Exception("查询语句NULL，请确认");
        }
        String tempSql = sqlBuf.toUpperCase();
        long count = 0;
        if (tempSql.indexOf(SQL_SELECT_TAG) == -1) {
            throw new Exception("查询语句缺少SELECT关键字");
        }
        if (tempSql.indexOf(SQL_FROM_TAG) == -1) {
            throw new Exception("查询语句缺少FROM关键字");
        }
        if(tempSql.indexOf(SQL_DISTINCT_TAG) > -1){
            // 因为不用使用子查询，DISTINCT语句查询记录数比较困难
            // 暂时采用查询list的方式获取总记录数，但这个会影响性能
            List<Map<String, Object>> list = getJdbcTemplate()
                    .queryForList(tempSql.toString(), args);
            if(null != list){
                count = list.size();
            }
        }else if(tempSql.indexOf(SQL_GROUP_BY_TAG) > -1){//GROUP_BY 总数也是查询的总记录数
            if (tempSql.indexOf(SQL_GROUP_BY_TAG) > -1) {
                tempSql = tempSql.substring(0, tempSql.indexOf(SQL_GROUP_BY_TAG));
            }
            StringBuffer countBuf = new StringBuffer("SELECT COUNT(*) AS count ").append(tempSql
                    .substring(tempSql.indexOf(SQL_FROM_TAG)));
            List<Map<String, Object>> list = getJdbcTemplate()
                    .queryForList(countBuf.toString(), args);
            if(null != list){
                count = MapUtils.getLongValue(list.get(0), "count");
            }
        } else {
            if (tempSql.indexOf(SQL_ORDERBY_TAG) > -1) {
                tempSql = tempSql.substring(0, tempSql.indexOf(SQL_ORDERBY_TAG));
            }
            StringBuffer countBuf = new StringBuffer("SELECT COUNT(*) AS count ").append(tempSql
                    .substring(tempSql.indexOf(SQL_FROM_TAG)));
            List<Map<String, Object>> list = getJdbcTemplate()
                    .queryForList(countBuf.toString(), args);
            if (null != list && list.size() >= 1) {
                for (Map<String, Object> tempMap : list) {
                    count += MapUtils.getLongValue(tempMap, "count");
                }
            }
        }
        return count;
    }

    /**
     * 分页查询
     * 
     * @param sql
     *            sql语句
     * @param jsonObj
     *            参数
     * @param args
     *            PreparedStatement数组
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Page getPageQuery(String sql, JSONObject jsonObj, Object... args) throws Exception {
        int startIndex = JsonUtil.getInt(jsonObj, "start");
        int pageSize = JsonUtil.getInt(jsonObj, "limit");
        long totalCount = queryCount(sql, args);
        StringBuffer buf = new StringBuffer(sql);

        buf.append(" LIMIT ").append(startIndex).append(",").append(pageSize);
        List<Map<String, Object>> list = changeData(queryForList(buf.toString(), args));

        return new Page(list, totalCount);
    }

    /**
     * 查询集合
     * 
     * @param sql
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public List<Map<String, Object>> queryForList(String sql, Object... args) throws Exception {
        return changeData(getJdbcTemplate().queryForList(sql, args));
    }

    /**
     * 查询对象
     * 
     * @param sql
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Map<String, Object> queryForMap(String sql, Object... args) throws Exception {
        return changeData(getJdbcTemplate().queryForMap(sql, args));
    }

    /**
     * 转换查询出来的结果
     * 
     * @param list
     * @return
     * @throws Exception
     * @see
     * @since
     */
    private List<Map<String, Object>> changeData(List<Map<String, Object>> list) throws Exception {
        for (Map<String, Object> _t : list) {
            changeData(_t);
        }
        return list;
    }

    /**
     * 转换查询出来的结果
     * 
     * @param list
     * @return
     * @throws Exception
     * @see
     * @since
     */
    private Map<String, Object> changeData(Map<String, Object> map) throws Exception {
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof Timestamp) {// 转换时间
                entry.setValue(CalendarHelper.formatDatetime(CalendarHelper.parseDate(
                        String.valueOf(value), CalendarHelper.DEFAULT_PATTERN)));
            } else if (value instanceof Date) {
                entry.setValue(CalendarHelper.formatDate(CalendarHelper.parseDate(
                        String.valueOf(value), "yyyy-MM-dd")));
            }
        }
        return map;
    }

    /**
     * 更新
     * 
     * @param sql
     * @param args
     * @return
     * @see
     * @since
     */
    public int update(String sql, Object... args) throws Exception {
        return getJdbcTemplate().update(sql, args);
    }

    /**
     * 批量更新
     * 
     * @param sql
     * @param args
     * @return
     * @see
     * @since
     */
    public int[] batchUpdate(String[] sql) throws Exception {
        return getJdbcTemplate().batchUpdate(sql);
    }

    /**
     * 批量更新
     * 
     * @param sql
     * @param batchArgs
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public int[] batchUpdate(String sql, List<Object[]> batchArgs) throws Exception {
        return getJdbcTemplate().batchUpdate(sql, batchArgs);
    }

    /**
     * 查询long数据
     * 
     * @param sql
     * @param args
     * @return
     * @see
     * @since
     */
    public long queryForLong(String sql, Object... args) throws Exception {
        return getJdbcTemplate().queryForLong(sql, args);
    }

    /**
     * 查询int数据
     * 
     * @param sql
     * @param args
     * @return
     * @see
     * @since
     */
    public int queryForInt(String sql, Object... args) throws Exception {
        return getJdbcTemplate().queryForInt(sql, args);
    }

    /**
     * 查询序列
     * 
     * @param modelCode
     *            模块名称（数据名称去掉后面的_ADB）
     * @param table
     *            表名
     * @param idField
     *            需要序列的字段名
     * @return
     * @throws Exception
     * @see
     * @since
     */
    public Long getNextUnisequence(String modelCode, String table, String idField)
            throws Exception {
        StringBuffer buf = new StringBuffer();
        buf.append("SELECT SEQ_").append(modelCode).append("_").append(table).append("_")
                .append(idField).append(".NEXTVAL");
        Map<String, Object> map = getJdbcTemplate().queryForMap(buf.toString().toUpperCase());
        String value = MapUtils.getString(map, "value");// 目前返回的数据格式是  val,step
        String tempStr = null;
        if (null == value || value.indexOf(COMMA_SPLIT) < 0) {
            throw new Exception("获取序列异常，返回字段名不是value或者值没有 , 分割");
        } else {
            tempStr = value.substring(0, value.indexOf(COMMA_SPLIT));
        }
        if (null == tempStr || tempStr.trim().length() == 0) {
            throw new Exception("获取序列异常，返回的value为空");
        }
        Long ret = Long.valueOf(tempStr);
        return ret;
    }
}
