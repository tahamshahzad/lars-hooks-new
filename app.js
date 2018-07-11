const express = require("express");
const addDataToSheet = require("./addDataToSheet");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/add-data/:spreadSheetId/:sheetName", async (req, res) => {
  const { spreadSheetId, sheetName } = req.params;

  let data = req.query;

  const values = Object.keys(data).map((item, index, array) => {
    return data[item];
  });
  
  const finalValues = [values]

  try {
    const response = await addDataToSheet(spreadSheetId, sheetName, "A2:AB2", finalValues);

    res.json(response.data);
  } catch (error) {
    res.json(JSON.stringify(error));
  }
});

module.exports = app;
