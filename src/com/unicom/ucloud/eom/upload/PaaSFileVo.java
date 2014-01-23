/**
 * 
 */
package com.unicom.ucloud.eom.upload;

import java.io.DataInputStream;

import com.ucloud.paas.proxy.file.UploadFileInfo;

/**
 * @author zouqone
 * @see PaaS文件服务--对象信息（包含存储区名称，文件信息,文件流）
 */
public class PaaSFileVo {

	/**
	 * 存储区名称
	 */
	private String storageName;
	
	/**
	 * 文件信息
	 */
	private UploadFileInfo info;
	
	/**
	 * 文件流
	 */
	private DataInputStream input;

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public UploadFileInfo getInfo() {
		return info;
	}

	public void setInfo(UploadFileInfo info) {
		this.info = info;
	}

	public DataInputStream getInput() {
		return input;
	}

	public void setInput(DataInputStream input) {
		this.input = input;
	}
	
	
}
