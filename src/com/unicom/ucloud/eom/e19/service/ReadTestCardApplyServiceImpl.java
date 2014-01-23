package com.unicom.ucloud.eom.e19.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.service.ReadSimpleElsService;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleReadParameter;

/**
 * 用于导入测试卡，代替页面上的勾选测试卡功能，方便选取
 * 
 * @version 1.0
 * @date 2013-6-27
 * @author MING
 */
@Service
public class ReadTestCardApplyServiceImpl extends ReadSimpleElsService {

    @Autowired
    private ITciPriAttTemService tciPriAttTemplateService;

    @Override
    protected SimpleReadParameter getSimpleReadParameters(JSONObject param) throws Exception {
        SimpleReadParameter parameter = new SimpleReadParameter();

        StringBuffer fields = new StringBuffer();
        Integer cardType = JsonUtil.getInt(param, "cardType");
        if(null != cardType && cardType.intValue() == ConstantUtil.TEST_CARD_ENUM){
            fields
            .append("number");
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TELE_CARD_ENUM){
            fields
            .append("number");
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.TERMINAL_CARD_ENUM){
            fields
            .append("number");
        }else if(null!=cardType && cardType.intValue() == ConstantUtil.RECH_CARD_ENUM){
            fields
            .append("number");
        }
//        JSONObject jsObj = addPriAttTemDetailInfo(param, fields.toString());

//        String[] fieldsId = JsonUtil.getString(jsObj, "fields").split(",");
        parameter.setFieldsId(fields.toString().split(","));
        parameter.setStartIndex(2);

        return parameter;
    }
}
