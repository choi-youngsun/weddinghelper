import { Guest } from '@/api/guest/guestAPI';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';

// 엑셀 제목 (헤더)
const headers = ['순서', '구분', '이름', '소속', '축의금', '식권 개수', '메모'];

// 열 너비 (픽셀 단위가 아닌 엑셀 내부 너비 기준)
const headerWidths = [10, 15, 20, 25, 15, 15, 30];

// 데이터 변환 함수
const transformSide = (side: string | undefined): string => {
  if (side === 'bride') {
    return '신부측';
  } else if (side === 'groom') {
    return '신랑측';
  }
  return ''; // 만약 다른 값이 들어오면 빈 문자열 반환
};

export const downloadList = async (rows: Guest[], sheetName: string) => {
  try {
    // 워크북 생성
    const wb = new Excel.Workbook();
    // 워크시트 추가
    const sheet = wb.addWorksheet(sheetName);

    // 헤더 추가
    const headerRow = sheet.addRow(headers);
    headerRow.height = 30.75;

    // 헤더 셀 스타일링
    headerRow.eachCell((cell, colNum) => {
      styleHeaderCell(cell);
      sheet.getColumn(colNum).width = headerWidths[colNum - 1];
    });

    // 데이터 행 추가
    rows.forEach((guest) => {
      const rowData = [
        guest.orderNumber ?? 'N/A',
        transformSide(guest.side) ?? '알 수 없음',
        guest.guestName ?? '알 수 없음',
        guest.affiliation ?? '알 수 없음',
        guest.giftAmount ?? '없음',
        guest.ticketCount ?? '없음',
        guest.note ?? '없음',
      ];
      const row = sheet.addRow(rowData);

      // 각 셀 스타일링
      row.eachCell((cell, colNum) => {
        styleDataCell(cell, colNum);
        if (colNum === 5) {
          cell.numFmt = '0,000'; // 축의금 셀 포맷
        }
      });
    });

    // 파일 생성
    const fileData = await wb.xlsx.writeBuffer();
    const blob = new Blob([fileData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${sheetName}.xlsx`);
  } catch (error) {
    console.error('엑셀 생성 실패:', error);
  }
};

const styleHeaderCell = (cell: any) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffebebeb' },
  };
  cell.border = {
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } },
  };
  cell.font = {
    name: 'Arial',
    size: 12,
    bold: true,
    color: { argb: 'ff252525' },
  };
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true,
  };
};

const styleDataCell = (cell: any, colNum: number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffffffff' },
  };
  cell.border = {
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } },
  };
  cell.font = {
    name: 'Arial',
    size: 10,
    color: { argb: 'ff252525' },
  };
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true,
  };

  // colNum에 따라 특정 열에 스타일을 다르게 적용
  if (colNum === 5) {
    // 예를 들어 5번째 열인 '축의금' 열
    cell.numFmt = '0,000'; // 축의금 셀 포맷 (숫자에 쉼표 추가)
    cell.font = { ...cell.font, bold: true }; // 축의금 열은 굵은 글씨로
  }
};
