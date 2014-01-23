package com.unicom.ucloud.eom.base.test;

import org.junit.BeforeClass;
import org.springframework.mock.web.MockServletContext;
import org.springframework.web.context.support.XmlWebApplicationContext;

public class JUintBeanBase {
	private static XmlWebApplicationContext context;
	
	/**
	 * 读取spring3 MVC配置文件
	 * 这里是采用读取class path的方式，所以，在编译的目录下，把配置文档拷贝一份进去进行加载测试。（不用放到部署环境）
	 * 例如：我这里/WEB-INF/classes，所以，在classes下面，还要加一层WEB-INF，加将配置文件copy进去（包括目录层次）
	 * 
	 */
	@BeforeClass
	public static void setUp() {
	    System.out.println("setUp start ");
	    String[] configs = { "/WEB-INF/config/applicationContext.xml",
                "/WEB-INF/config/spring/spring-*.xml",
                "/WEB-INF/config/spring/springmvc.xml" };
		context = new XmlWebApplicationContext();
		context.setConfigLocations(configs);
		MockServletContext msc = new MockServletContext();
		context.setServletContext(msc);
		try{
		context.refresh();
		}catch(Exception ex){ex.printStackTrace();}
	}

	public XmlWebApplicationContext getContext() {
		return context;
	}
}
