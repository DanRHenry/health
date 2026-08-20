export async function deleteDimension(
  gsapi,
  spreadsheetId,
  dimension,
  sheetIndex,
  startIndex,
  endIndex,
) {
  const delRowObj = {
    requests: [
      {
        deleteDimension: {
          range: {
            sheetId: sheetIndex, //this represents the index of the sheet, rather than the name (such as Sheet1!)
            dimension: dimension,
            startIndex: startIndex,
            endIndex: endIndex,
          },
        },
      },
    ],
  };

  const deleteRowRes = await gsapi.spreadsheets
    .batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: delRowObj,
    })
    .then(
      function (res) {
        console.log("row deleted");
      },
      function (res) {
        console.log("Error deleting row", res);
      },
    );
  // defining the deleteRowRes runs the deletion code
}
