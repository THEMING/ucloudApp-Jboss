package com.unicom.ucloud.eom.e19.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.service.ReadSimpleElsService;
import com.unicom.ucloud.util.execl.SimpleReadParameter;

/**
 * 读取历史工单excel数据
 * @version 1.0
 * @date 2013-1-31
 * @author Jerry
 */
@Service
public class ReadHisOrderServiceImpl extends ReadSimpleElsService {

    @Override
    protected SimpleReadParameter getSimpleReadParameters(JSONObject param) throws Exception {
        SimpleReadParameter parameter = new SimpleReadParameter();

        String fields = "sheetSerialNumber,sheetTheme,localeId,localeName," +
        		"orgId,orgName,createdBy,createdByName,creationDate,companyId," +
        		"companyName,dispatchDate,requiredFinishTime,finishTime,cardOperationTypeEnumId," +
        		"cardOperationTypeEnum,content";
        parameter.setFieldsId(fields.split(","));

        parameter.setStartIndex(2);

        return parameter;
    }

}
