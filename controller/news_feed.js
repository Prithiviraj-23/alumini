const axios = require('axios');
const cheerio = require('cheerio');

// Controller function to scrape news data
const scrapeNews = async (req, res) => {
  try {
    const { data } = await axios.get('https://news.google.com/search?q=tech&hl=en-IN&gl=IN&ceid=IN%3Aen');
    const $ = cheerio.load(data);

    const headlines = [];
    $('.JtKRv').each((index, element) => {
      headlines.push($(element).text());
    });

    const images = [];
    $('img.Quavad.vwBmvb').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        images.push(src);
      }
    });

    const linkUrls = [];
    $('a.WwrzSb').each((index, element) => {
      const href = $(element).attr('href');
      if (href) {
        linkUrls.push(`https://news.google.com${href}`);
      }
    });

    // Combine the scraped data into an object
    const newsData = {
      headlines,
      images,
      linkUrls,
    };

    // Send the scraped data as JSON
    res.json(newsData);
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ error: 'Error scraping website', details: error.message });
  }
};

module.exports = {
  scrapeNews,
};
