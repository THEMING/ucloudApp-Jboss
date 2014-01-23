/**
 * 
 */
package com.unicom.ucloud.eom.upload;

import java.io.UnsupportedEncodingException;

import com.ucloud.paas.agent.PaasException;
import com.ucloud.paas.proxy.file.FileService;

/**
 * @author zouqone
 * PaaS 文件上传服务
 */
public class PaaSUploadService {
	
	/**
	 * 文件上传服务对象
	 */
	private PaaSFileVo paaSFileVo;

	/**
	 * 文件的UUID
	 */
	private String fileUUID;
	public PaaSFileVo getPaasFileVo() {
		return paaSFileVo;
	}

	public void setPaasFileVo(PaaSFileVo paasFileVo) {
		this.paaSFileVo = paasFileVo;
	}
	
	/**
	 * 文件上传
	 * @return
	 */
	public String PaaSUpload(){
		FileService service=new FileService();
		try {
			this.fileUUID=service.upload(paaSFileVo.getStorageName(), paaSFileVo.getInfo(), paaSFileVo.getInput());
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		} catch (PaasException e) {
			e.printStackTrace();
			return null;
		}
		
		return this.fileUUID;
	}
	
}
