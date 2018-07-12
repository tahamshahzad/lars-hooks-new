const express = require("express");
const addDataToSheet = require("./addDataToSheet");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/add-data/:spreadSheetId/:sheetName", async (req, res) => {
  const { spreadSheetId, sheetName } = req.params;

  let data = req.query;

  const recordingUrl = `http://${data.server_ip}/RECORDINGS/MP3/${data.recording_filename}-all.mp3`;

  const sheetData = Object.keys(data).map((item, index, array) => {
    return data[item];
  });

  sheetData.push(recordingUrl);

  
  const finalValues = [sheetData]

  try {
    const response = await addDataToSheet(spreadSheetId, sheetName, "A1:AB1", finalValues);

    res.json(response.data);
  } catch (error) {
    res.json(JSON.stringify(error));
  }
});

module.exports = app;
