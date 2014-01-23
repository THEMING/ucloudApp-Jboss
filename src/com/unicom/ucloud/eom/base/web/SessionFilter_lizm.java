
package com.unicom.ucloud.eom.base.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgStructure;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.ucloud.paas.proxy.aaaa.util.PaasAAAAException;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.util.JsonUtil;

public class SessionFilter_lizm implements Filter {

    public static final String SESSION_KEY_LOGON_ACCOUNT = "LOGON_ACCOUNT";

    public static final String SESSION_KEY_LOGON_ACCOUNT_JSP = "LOGON_ACCOUNT_JSP";

    public static final String SESSION_KEY_LOGON_USER = "LOGON_USER";

    public static final String SESSION_KEY_LOGON_USER_JSP = "LOGON_USER_JSP";

    public static final String SESSION_KEY_LOGON_ORG = "LOGON_ORG";

    public static final String SESSION_KEY_LOGON_ORG_JSP = "LOGON_ORG_JSP";

    private Logger logger = Logger.getLogger(this.getClass());

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        HttpSession session = request.getSession();

        Object account = session.getAttribute(SESSION_KEY_LOGON_ACCOUNT);
        
        

        if (account == null) {
            logger.debug("Create Account");
            
            JSONObject userAccount = new JSONObject();
            JSONObject curUser = new JSONObject();
            JSONObject org = new JSONObject();
            // userId 109420
            try {
                JSONObject ue = new JSONObject();
                ue.put("cloudOrgId", 137000022);
                ue.put("marketingAreaId", 137000022);
                ue.put("maintenanceAreaId", 137000022);
                ue.put("cloudUserId", 234705);
                ue.put("hrEmpCode", "0638879");
                ue.put("mdmEmpCode", "10218117");
                ue.put("accountId", "lizm95");
                ue.put("userEmpName", "李志敏");
                
                AAAAService aaaaService = new AAAAService();
                UserEntity userEntity = aaaaService.findUserbyUserID(JsonUtil.getInt(ue,"cloudUserId"));
                OrgStructure orgStructure = aaaaService.findCompanysByOrgId(JsonUtil.getInt(ue,"cloudOrgId"));
                if(orgStructure!=null){
                    if(!CommonUtils.isEmpty(orgStructure.getGroupCompany())){
                        userAccount.put("groupCompanyId", orgStructure.getGroupCompany().getCloudOrgId());
                        userAccount.put("groupCompanyName", orgStructure.getGroupCompany().getOrgName());
                    }
                    if(!CommonUtils.isEmpty(orgStructure.getProvinceCompany())){
                        userAccount.put("provinceCompanyId", orgStructure.getProvinceCompany().getCloudOrgId());
                        userAccount.put("provinceCompanyName", orgStructure.getProvinceCompany().getOrgName());
                    }
                    if(!CommonUtils.isEmpty(orgStructure.getCityCompany())){
                        userAccount.put("cityCompanyId", orgStructure.getCityCompany().getCloudOrgId());
                        userAccount.put("cityCompanyName", orgStructure.getCityCompany().getOrgName());
                    }
                    if(!CommonUtils.isEmpty(orgStructure.getCountyCompany())){
                        userAccount.put("countyCompanyName", orgStructure.getCountyCompany().getOrgName());
                        userAccount.put("countyCompanyId", orgStructure.getCountyCompany().getCloudOrgId());
                    }
                    /**
                    *  组织类别
                    *  GroupCompany("1"),   //集团公司
                    *   GroupDept("2"),      //集团公司部门
                    *   ProvinceCompany("3"),   //省分公司
                    *   ProvinceDept("4"),   //省公司部门

                    *   CityCompany("5"),    //地市分公司

                    *   CityDept("6"),   //地市分公司部门

                    *   CountyCompany("7"), //区/县分公司
                    *   CountyDept("8"),     //区/县分公司部门
                    *   AgencyCompany("9"), //代维公司
                    *   AgencyDept("10");    //代维公司部门
                     */
                    OrgEntity orgEntity = aaaaService.findOrgByOrgID(JsonUtil.getInt(ue,"cloudOrgId"));
                    if(orgEntity != null){
                        userAccount.put("orgCategory", orgEntity.getOrgCategory());
                        userAccount.put("orgName", orgEntity.getOrgName());
                        userAccount.put("orgNameDisplay", orgEntity.getOrgNameDisplay());
                    }
                }else{
                    userAccount.put("groupCompanyId", 1);
                    userAccount.put("groupCompanyName", "中国联通");
                    userAccount.put("provinceCompanyId", JsonUtil.getInt(ue,"cloudOrgId"));
                    userAccount.put("provinceCompanyName","山东省分公司");
                    userAccount.put("cityCompanyId", 23734);
                    userAccount.put("cityCompanyName", "青岛市分公司");
                    userAccount.put("orgCategory", 5);
                }
                
                
                // 分片ID
                userAccount.put("shardingId", 123701);
                userAccount.put("cloudUserId", JsonUtil.getInt(ue,"cloudUserId"));
                userAccount.put("cloudOrgId", JsonUtil.getInt(ue,"cloudOrgId"));
                userAccount.put("orgCode", "ZGLT1");
                userAccount.put("deptCode", "ZB");
                userAccount.put("hrEmpCode", JsonUtil.get(ue,"hrEmpCode"));
                userAccount.put("mdmEmpCode", JsonUtil.get(ue,"mdmEmpCode"));
                userAccount.put("userId", JsonUtil.get(ue,"accountId"));
                userAccount.put("accountId", JsonUtil.get(ue,"accountId"));
                userAccount.put("userEmpName", JsonUtil.get(ue,"userEmpName"));
                userAccount.put("userMail", "huqiang.dong@hp.com");
                userAccount.put("userDeptName", "网络公司山东省分公司网络管理中心");
                userAccount.put("userCompanyName", "山东省分公司");
                userAccount.put("maintenanceAreaId",JsonUtil.getInt(ue,"maintenanceAreaId"));
                userAccount.put("marketingAreaId", JsonUtil.getInt(ue,"marketingAreaId"));//营销、维护区域暂时用56
                if(userEntity != null){
                    if("".equals(userEntity.getMobTel()) || userEntity.getMobTel() == null){
                        logger.debug("移动电话号码为空，使用公司或部门办公电话");
                        userAccount.put("phoneNumber", userEntity.getOfficeTel());//电话号码
                    }else{
                        userAccount.put("phoneNumber", userEntity.getMobTel());//电话号码
                    }
                }
                userAccount.put("provinceOrgShortName", "SD");
                userAccount.put("provinceOrgCName", "山东");
                userAccount.put("userSex", userEntity.getUserSex());
                
                curUser.put("cloudUserId", JsonUtil.getInt(ue,"cloudUserId"));
                curUser.put("userEmpNam", "曹景镇");
                curUser.put("userMail", "huqiang.dong@hp.com");

                org.put("cloudOrgId", JsonUtil.getInt(ue,"cloudOrgId"));
                org.put("userDeptName", "网络公司山东省分公司网络管理中心");
                
                JSONObject role = new JSONObject();
                role.put("roleId", 1);
                role.put("roleName", "系统管理员");

                userAccount.put("role", role);

            } catch (JSONException e) {
                e.printStackTrace();
            }catch (PaasAAAAException e) {
                e.printStackTrace();
            }

            account = userAccount;

            request.getSession().setAttribute(SESSION_KEY_LOGON_ACCOUNT, userAccount);
            request.getSession()
                    .setAttribute(SESSION_KEY_LOGON_ACCOUNT_JSP, userAccount.toString());
            
            request.getSession().setAttribute(SESSION_KEY_LOGON_USER,curUser );
            request.getSession()
                    .setAttribute(SESSION_KEY_LOGON_USER_JSP, curUser.toString());
            
            request.getSession().setAttribute(SESSION_KEY_LOGON_ORG, org);
            request.getSession()
                    .setAttribute(SESSION_KEY_LOGON_ORG_JSP, org.toString());
        }

        chain.doFilter(servletRequest, servletResponse);

    }

    @Override
    public void destroy() {

    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        logger.debug("init session filter...");
    }

}

