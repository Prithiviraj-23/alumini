const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite() {
  try {
    const { data } = await axios.get('https://news.google.com/search?q=tech&hl=en-IN&gl=IN&ceid=IN%3Aen'); // Replace with your target website
    const $ = cheerio.load(data);

    const headlines = [];
    $('.JtKRv').each((index, element) => { // Adjust the selector to match the site
      headlines.push($(element).text());
    });
   
//https://news.google.com/api/attachments/CC8iL0NnNXVZMjVNY0Vack5VRjRiMDVVVFJDb0FSaXNBaWdCTWdrZElJaFpFT2t0TVFF=-w200-h112-p-df
    const images = [];
    $('img.Quavad.vwBmvb').each((index, element) => { // Use the class name selector and img tag
      const src = $(element).attr('src'); // Get the src attribute
      if (src) {
        images.push(src);
      }
    });


    //https://news.google.com/api/attachments/CC8iL0NnNXVZMjVNY0Vack5VRjRiMDVVVFJDb0FSaXNBaWdCTWdrZElJaFpFT2t0TVFF=-w200-h112-p-df
    const linkUrls = [];
    $('a.WwrzSb').each((index, element) => {
      const href = $(element).attr('href'); // Get the href attribute
      if (href) {
        linkUrls.push(href);
      }
    });

    //console.log(headlines);
    console.log(linkUrls);
  } catch (error) {
    console.error('Error scraping website:', error);
  }
}

scrapeWebsite();