package com.unicom.ucloud.util;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.log4j.Logger;
import org.json.JSONObject;
public class DynamicDataSource implements DataSource{
	
	private BasicDataSource datasource = new BasicDataSource();
	protected Logger logger = Logger.getLogger(this.getClass());
	
	public DynamicDataSource(String arg1){
		try {
			JSONObject jo = initJson();
			this.datasource.setUrl(jo.getString("clusterConnStr"));
	        this.datasource.setDriverClassName(jo.getString("driver"));
	        this.datasource.setUsername(jo.getString("username"));
	        this.datasource.setPassword(jo.getString("password"));
	        this.datasource.setInitialSize(jo.getInt("initConn"));
	        this.datasource.setMaxActive(jo.getInt("maxConn"));
	        this.datasource.setMaxIdle(jo.getInt("maxIdle"));
	        this.datasource.setMaxWait(jo.getLong("maxWait"));
	        this.datasource.setPoolPreparedStatements(jo.getBoolean("poolPreparedStatements"));
	        this.datasource.setDefaultAutoCommit(jo.getBoolean("defaultAutoCommit"));
	        
	        this.datasource.setValidationQuery("SELECT 1");
            this.datasource.setTestOnBorrow(true);
            this.datasource.setRemoveAbandoned(true);
            this.datasource.setRemoveAbandonedTimeout(300);
            
            logger.debug(" 数据源初始化 ");
            
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	public JSONObject initJson() throws Exception{System.out.println("create jdbc=====================================================");
		JSONObject jo = new JSONObject();
		jo.put("clusterConnStr", "jdbc:oracle:thin:@10.45.47.180:1521:sdoss");
		jo.put("driver", "oracle.jdbc.driver.OracleDriver");
		jo.put("username", "shdev");
		jo.put("password", "shdev");
		jo.put("initConn", 1);
		jo.put("maxConn", 5);
		jo.put("maxIdle", 5);
		jo.put("maxWait", 5);
		jo.put("poolPreparedStatements", true);
		jo.put("defaultAutoCommit", true);
		return jo;
	}
	
	public void close() throws SQLException {
	    if ((this.datasource != null) && (!(this.datasource.isClosed())))
	      this.datasource.close();
	}

	public BasicDataSource getDataSource() {
		return datasource;
	}

	public void setDataSource(BasicDataSource datasource) {
		this.datasource = datasource;
	}
	
	@Override
	public Connection getConnection(String username, String password)
			throws SQLException {
		return getDataSource().getConnection();
	}
	
	@Override
	public Connection getConnection() throws SQLException {
		return getDataSource().getConnection();
	}
	@Override
	public int getLoginTimeout() throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public PrintWriter getLogWriter() throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean isWrapperFor(Class<?> iface) throws SQLException {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public void setLoginTimeout(int seconds) throws SQLException {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setLogWriter(PrintWriter out) throws SQLException {
		// TODO Auto-generated method stub
		
	}
	@Override
	public <T> T unwrap(Class<T> iface) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}
}
