export async function getSheetInformation(gsapi, spreadsheetId, sheetName, startCell, endCell) {
    const opt = {
      spreadsheetId: spreadsheetId,
      range: `${sheetName}!${startCell}:${endCell}`,
    };

    const res = await gsapi.spreadsheets.values.get(opt);
    console.log("spreadsheet data: ", res.data);
    return res.data.values
  }