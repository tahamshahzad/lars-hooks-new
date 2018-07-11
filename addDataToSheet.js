const { google } = require("googleapis");
const sheets = google.sheets("v4");
const apiKey = require("./api-keys.json");

let jwtClient = new google.auth.JWT(
  apiKey.client_email,
  null,
  apiKey.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

google.options({
  auth: jwtClient
});

//authenticate request
module.exports = async function(spreadsheetId, sheetName, range, values) {
  const finalRange = `${sheetName}!${range}`;
  const resource = {
    values
  }
  console.log(resource);

  const queryParams = {
    spreadsheetId,
    range: finalRange,
    insertDataOption: "INSERT_ROWS",
    valueInputOption: "RAW",
    resource
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await sheets.spreadsheets.values.append(queryParams);
      resolve(response);
    } catch (error) {
      console.log(error)
      reject(error);
    }
  });
};
