const axios = require('axios');

const API_ENDPOINT = "https://sheets.googleapis.com/v4/spreadsheets";
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const GOOGLE_API_KEY = process.env.GOOGLE_SHEETS_API_KEY; //need to put the key in the netlify environment variables

exports.handler = async function(event, context) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${SPREADSHEET_ID}/values/Sheet1?key=${GOOGLE_API_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" })
    };
  }
};
