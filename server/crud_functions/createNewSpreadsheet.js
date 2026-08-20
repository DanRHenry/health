import { auth } from "@googleapis/sheets"

export async function createNewSpreadsheet (gsapi, oauthKeys, request) {
// console.log(client)
console.log(request)

    try {
        const response = await gsapi.spreadsheets.create({
            auth: oauthKeys,
            ...request
        })
        const spreadsheetId = response.data.spreadsheetId;

        console.log(`spreadsheet created: ${response.data.spreadsheetUrl}`)
        return spreadsheetId
    } catch (err) {
        console.error(err)
    }
}
