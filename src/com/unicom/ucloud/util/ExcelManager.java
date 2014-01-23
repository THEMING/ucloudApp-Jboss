package com.unicom.ucloud.util;

import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFCell;

public class ExcelManager {
	// 得到单元格的字符串
	public static String getString(HSSFCell cell) {
		if (cell == null) {
			return "";
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
			return "";
		} else if (cell.getCellType() == HSSFCell.CELL_TYPE_ERROR) {
			return String.valueOf(cell.getErrorCellValue());
		} else if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
			return Double.toString(cell.getNumericCellValue());
		} else if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
			return trim(cell.getStringCellValue());
		} else if (cell.getCellType() == HSSFCell.CELL_TYPE_FORMULA) {
			// 如果该格子是公式的话也取其格子的值，不取公式
			return String.valueOf(cell.getStringCellValue());
		} else if (cell.getCellType() == HSSFCell.CELL_TYPE_BOOLEAN) {
			return String.valueOf(cell.getBooleanCellValue());
		} else {
			return "";
		}
	}

	// 得到单元格的整数
	public static Long getLong(HSSFCell cell) {
		if (cell == null) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_ERROR) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
			return new Long(new Double(cell.getNumericCellValue()).longValue());
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
			return Long.valueOf(cell.getStringCellValue());
		} else {
			return null;
		}
	}

	// 得到单元格的Double数字
	public static Double getDouble(HSSFCell cell) {
		if (cell == null) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_ERROR) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
			return new Double(cell.getNumericCellValue());
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
			return Double.valueOf(cell.getStringCellValue());
		} else {
			return null;
		}
	}

	// 得到单元格的日期
	public static Date getDate(HSSFCell cell) throws Exception {
		if (cell == null) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_ERROR) {
			return null;
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
			return cell.getDateCellValue();
			// throw new ValidateException("格式不能转换到日期");
		}
		if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
			throw new Exception("字符串不能转换到日期");
		} else {
			return cell.getDateCellValue();
		}
	}

	public static String trim(String str) {
		return (str == null) ? "" : str.trim();
	}


}