const express = require('express');
const router = express.Router();

const propertyService = require('../../services/propertyService')

const RENDERTRON_URL = 'https://real-estate-441700.ue.r.appspot.com/render';

const botUserAgents = [
  'googlebot', 'bingbot', 'yahoo', 'facebookexternalhit',
  'twitterbot', 'linkedinbot', 'slackbot', 'embedly', 'pinterest',
  'redditbot', 'applebot', 'whatsapp', 'google-structured-data-testing-tool',
];

// Helper function to detect bots
const isBot = (req) => {
  const userAgent = req.headers['user-agent'] || '';
  return botUserAgents.some(bot => userAgent.toLowerCase().includes(bot));
};

router.get('/render', async (req, res) => {
    const { url, propertyId } = req.query;

    // If a bot is detected and the propertyId is provided
    if (isBot(req) && propertyId) {
      try {
        // Fetch the property data from your database or API
        const property = await propertyService.getProperty(propertyId); // Replace with your data-fetching function
        
        if(!property) {
          return res.status(404).send('Property not found');
        }
        // Build HTML content for Rendertron
        const html = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${property.title}</title>
              <meta name="description" content="${property.description}">
              <meta property="og:title" content="${property.title}">
              <meta property="og:description" content="${property.description}">
              <meta property="og:image" content="${property.imageUrls[0]}">
              <meta property="og:url" content="${url}">
            </head>
            <body>
              <h1>${property.title}</h1>
              <p>${property.description}</p>
              <img src="${property.imageUrls[0]}" alt="${property.title}">
            </body>
          </html>
        `;
  
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
  
      } catch (error) {
        console.error('Error fetching property data:', error);
        res.status(500).send('Error fetching property details');
      }
    } else {
      // Redirect non-bot requests to the standard React frontend page
      res.redirect(url);
    }
});

module.exports = router