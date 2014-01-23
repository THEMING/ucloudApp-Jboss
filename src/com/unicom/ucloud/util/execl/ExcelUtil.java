package com.unicom.ucloud.util.execl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

import com.unicom.ucloud.eom.base.common.CalendarHelper;

/**
 * Excel辅助类
 * 
 * @version 1.0
 * @date 2013-1-18
 * @author feng.yang
 */
public class ExcelUtil {
    /**
     * excel文件的后缀 = .xls
     */
    public static final String EXCEL_FILE_SUFFIX = ".xls";

    /**
     * 默认的excel列宽=20
     */
    public static final int DEFAULT_COLUMN_WIDTH = 250;

    /**
     * 读取简单列表
     * 
     * @param wsheet
     * @param startIndex
     * @param fields
     * @return
     * @see
     * @since
     */
    public List<Map<String, Object>> readSimple(Sheet wsheet, int startIndex, String[] fields) {

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        for (int rowIndex = startIndex; rowIndex <= wsheet.getLastRowNum(); rowIndex++) {
            Map<String, Object> row = new HashMap<String, Object>();
            Iterator<Cell> cells = wsheet.getRow(rowIndex).cellIterator();
            while (cells.hasNext()) {
                Cell cell = cells.next();
                if((cell.getColumnIndex()+1)>fields.length){//会发生下表越界，跳过
                    
                }else{
                    row.put(fields[cell.getColumnIndex()], getValue(cell));
                }
            }
            list.add(row);
        }

        return list;

    }

    /**
     * 得到Excel表中的值
     * 
     * @param cell
     * @return
     * @see
     * @since
     */
    private Object getValue(Cell cell) {

        Object value = null;
        switch (cell.getCellType()) {
        case Cell.CELL_TYPE_STRING:
            value = cell.getRichStringCellValue().getString();
            break;
        case Cell.CELL_TYPE_NUMERIC:
            if (DateUtil.isCellDateFormatted(cell)) {
                Date d = cell.getDateCellValue();
                value = CalendarHelper.formatDatetime(d);
            } else {
                value = new DecimalFormat("0").format(cell.getNumericCellValue());
            }
            break;
        case Cell.CELL_TYPE_BOOLEAN:
            value = cell.getBooleanCellValue();
            break;
        case Cell.CELL_TYPE_FORMULA:
            value = cell.getCellFormula();
            break;
        default:
            value = cell.getStringCellValue();
        }

        return value;

    }

    /**
     * 导出简单模版的excel文件流
     * 
     * @param wsheet
     * @param parameters
     * @throws RowsExceededException
     * @throws WriteException
     * @see
     * @since
     */
    public void simpleExport(Workbook wwb, Sheet wsheet, SimpleExportParameter parameters) {
        fillHeaders(wwb, wsheet, parameters);
        fillContent(wwb, wsheet, parameters);
    }

    private void fillHeaders(Workbook wwb, Sheet wsheet, SimpleExportParameter parameters) {

        wsheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
                0, // last row (0-based)
                0, // first column (0-based)
                parameters.getFieldsName().length - 1 // last column (0-based)
        ));
        // 标题
        Row titleRow = wsheet.createRow((short) 0);
        Cell titileCell = titleRow.createCell((short) 0);

        Font titleFont = wwb.createFont();
        titleFont.setFontHeightInPoints((short) 30);
        titleFont.setFontName("Courier New");
        titleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        // titleFont.setItalic(true);
        // titleFont.setStrikeout(true);

        CellStyle titileStyle = wwb.createCellStyle();
        titileStyle.setAlignment(CellStyle.ALIGN_CENTER);
        titileStyle.setVerticalAlignment(CellStyle.VERTICAL_BOTTOM);

        titileStyle.setFont(titleFont);

        titileCell.setCellStyle(titileStyle);
        titileCell.setCellValue(parameters.getTitle());

        wsheet.setDefaultColumnWidth(20 * DEFAULT_COLUMN_WIDTH);

        for (int i = 0; i < parameters.getFieldsName().length; ++i) {
            if (parameters.getWidths() != null) {
                wsheet.setColumnWidth(i, Short.valueOf(parameters.getWidths()[i]).shortValue()
                        * DEFAULT_COLUMN_WIDTH);
            }

        }

        Font font = wwb.createFont();
        font.setFontHeightInPoints((short) 15);
        font.setFontName("Courier New");
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        // font.setItalic(true);
        // font.setStrikeout(true);

        CellStyle cellStyle = wwb.createCellStyle();
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cellStyle.setVerticalAlignment(CellStyle.VERTICAL_BOTTOM);

        cellStyle.setFont(font);

        // 列名
        Row columnRow = wsheet.createRow((short) 1);
        for (int i = 0; i < parameters.getFieldsName().length; ++i) {

            Cell cell = columnRow.createCell(i);
            cell.setCellValue(parameters.getFieldsName()[i]);
            cell.setCellStyle(cellStyle);

        }
    }

    private void fillContent(Workbook wwb, Sheet wsheet, SimpleExportParameter parameters) {

        List<Map<String, Object>> list = parameters.getDataList();

        // System.out.println(list);

        String value = "";
        String[] field = parameters.getFieldsId();

        for (int i = 0; i < list.size(); i++) {

            Row row = wsheet.createRow((short) i + 2);

            for (int j = 0; j < field.length; j++) {

                Map<String, Object> map = list.get(i);

                Cell cell = row.createCell(j);

                if (map.get(field[j]) instanceof java.sql.Date) {
                    java.sql.Date d = (java.sql.Date) map.get(field[j]);

                    value = CalendarHelper.formatDatetime(d);

                } else {
                    value = String.valueOf(map.get(field[j]));
                }
                if (value == null || value.equalsIgnoreCase("null")) {
                    value = "";
                }

                cell.setCellValue(value);

            }

        }

    }
}
