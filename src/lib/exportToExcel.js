import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel(expenses) {
  const headers = ["Title", "Category", "Date", "Profit", "Loss", "Notes"];

  const expenseData = [
    headers,
    ...expenses.map((expense) => [
      expense.title,
      expense.category,
      expense.date,
      expense.profit,
      expense.loss,
      expense.notes,
    ]),
  ];

  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(expenseData);

  // ---------------------- 🎨 Styles ----------------------

  const headerStyle = {
    font: { bold: true, sz: 14, color: { rgb: "000000" } }, // larger text + bold
    fill: { fgColor: { rgb: "FFF9C4" } }, // light yellow
    alignment: { horizontal: "center", vertical: "center" },
    border: setBorder("000000"),
  };

  const dataStyle = {
    border: setBorder("AAAAAA"),
    alignment: { horizontal: "left", vertical: "center" },
  };

  const zebraRowStyle = {
    fill: { fgColor: { rgb: "F7FAFC" } }, // light blue-ish
    border: setBorder("AAAAAA"),
    alignment: { horizontal: "left", vertical: "center" },
  };

  const profitStyle = {
    font: { color: { rgb: "008000" }, bold: true },
    border: setBorder("AAAAAA"),
  };

  const lossStyle = {
    font: { color: { rgb: "CC0000" }, bold: true },
    border: setBorder("AAAAAA"),
  };

  // Helper: border
  function setBorder(color) {
    return {
      top: { style: "thin", color: { rgb: color } },
      bottom: { style: "thin", color: { rgb: color } },
      left: { style: "thin", color: { rgb: color } },
      right: { style: "thin", color: { rgb: color } },
    };
  }

  // ---------------------- Apply Styles ----------------------

  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = worksheet[cellRef];
      if (!cell) continue;

      // Header row
      if (R === 0) {
        cell.s = headerStyle;
        continue;
      }

      // Data rows with zebra effect
      cell.s = R % 2 === 0 ? zebraRowStyle : dataStyle;

      // Profit column (column 3)
      if (C === 3 && cell.v !== undefined) {
        cell.s = profitStyle;
        cell.z = '"₹"#,##0.00'; // currency format
      }

      // Loss column (column 4)
      if (C === 4 && cell.v !== undefined) {
        cell.s = lossStyle;
        cell.z = '"₹"#,##0.00';
      }

      // Date column formatting (column 2)
      if (C === 2) {
        cell.z = "dd-mm-yyyy";
      }
    }
  }

  // ---------------------- Freeze Header Row ----------------------

  worksheet["!freeze"] = { xSplit: 0, ySplit: 1 };

  // ---------------------- Auto Column Width ----------------------

  worksheet["!cols"] = headers.map((h) => ({ wch: h.length + 15 }));

  // ---------------------- Enable Filters ----------------------

  worksheet["!autofilter"] = {
    ref: XLSX.utils.encode_range(range),
  };

  // ---------------------- Generate Excel ----------------------

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `expenses_${Date.now()}.xlsx`
  );
}
