export async function updateSheet(gsapi, spreadsheetId, sheetName, cell, content) {
    console.log("spreadsheetId: ", spreadsheetId)
    console.log("sheetName: ", sheetName)
    console.log("cell: ", cell)
    console.log("content: ", content)
  const updateOptions = {
    spreadsheetId: spreadsheetId,
    range: `${sheetName}!${cell}`,
    valueInputOption: "USER_ENTERED",
    resource: { values: content }, // this is the content you want to add to the sheet. Here, I'm copying values that were already in the sheet range from above (Sheet1!A1:B5)
  };

  // const updateRes = await gsapi.spreadsheets.values.update(updateOptions); // defining updateRes runs the update code
}
