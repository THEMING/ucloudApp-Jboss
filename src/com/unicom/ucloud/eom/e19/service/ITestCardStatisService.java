package com.unicom.ucloud.eom.e19.service;

import java.util.List;
import java.util.Map;
import org.json.JSONObject;

import com.unicom.ucloud.eom.base.service.IBaseService;

public interface ITestCardStatisService extends IBaseService{

    public List<Map<String, Object>> getTestCardStatisInfo(JSONObject jsonObj) throws Exception;
}
