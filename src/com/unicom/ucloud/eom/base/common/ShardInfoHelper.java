package com.unicom.ucloud.eom.base.common;

import com.ucloud.paas.agent.PaasException;
import com.ucloud.paas.proxy.sysconfig.DataRouteService;
import com.ucloud.paas.proxy.sysconfig.vo.ShardInfoVO;


/**
 * 根据组织ID查询分片ID
 * 
 * @version 1.0
 * @date 2013-4-9
 * @author feng.yang
 */
public class ShardInfoHelper {

	public ShardInfoHelper(){
		
	}
    /**
     * 根据组织ID查询分片ID
     * @param orgId
     * @return
     * @author feng.yang
     * @throws PaasException 
     * @see
     * @since
     */
    public int findShardingIdByOrgId(int orgId) throws PaasException {
         DataRouteService dataRouteService = new DataRouteService();
         ShardInfoVO shardInfoVO=dataRouteService.findShardInfoByOrgId(orgId);
         int shardingId = shardInfoVO.getShardingId();
         return shardingId;
    }
    
    /**
     * 根据区域ID查找分片ID
     * @param areaId
     * @return
     * @throws PaasException 
     * @throws NumberFormatException 
     * @see
     * @since
     */
    public int findShardingIdByAreaId(String areaId) throws NumberFormatException, PaasException{
    	DataRouteService dataRouteService = new DataRouteService();
        ShardInfoVO shardInfoVO=dataRouteService.findShardInfoByAreaId(areaId);
        int shardingId = shardInfoVO.getShardingId();
        return shardingId;
    }

}
