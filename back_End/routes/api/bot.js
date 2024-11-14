const express = require('express');
  const fetch = require('node-fetch');
const router = express.Router();

// const propertyService = require('../../services/propertyService')

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
    const { url } = req.query;

    // If a bot is detected and the propertyId is provided
    if (isBot(req)) {
      try {
        const rendertronUrl = `${RENDERTRON_URL}/${url}`;
        const response = await fetch(rendertronUrl);
        const html = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
      } catch (error) {
        console.error('Error fetching from Rendertron:', error);
        res.status(500).send('Error fetching pre-rendered content');
      }
    } else {
      // Non-bot traffic is redirected back to the regular page
      res.redirect(url);
    }
});

module.exports = router