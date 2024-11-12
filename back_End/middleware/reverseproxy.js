
const {createProxyMiddleware} = require('http-proxy-middleware')


const PRERENDER_URL = 'http://service.prerender.io/';
const FRONTEND_URL = 'https://megatechrealestate.ng'; // Replace with your React app's URL
const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN;


const botProxy = createProxyMiddleware({
    target: PRERENDER_URL,
    changeOrigin: true,
    headers: {
      'X-Prerender-Token': PRERENDER_TOKEN,
    },
    pathRewrite: { '^/': '' }, // Remove leading slash for Prerender.io
  });


  const frontendProxy = createProxyMiddleware({
    target: FRONTEND_URL,
    changeOrigin: true,
  });


const reverseProxy = ((req, res, next ) => {
   
    const userAgent = req.headers['user-agent'];
    const botUserAgents = /(facebookexternalhit|Twitterbot|Googlebot|bingbot|LinkedInBot)/i;
  
    if (botUserAgents.test(userAgent)) {
      console.log(`Routing bot request to Prerender: ${req.url}`);
      botProxy(req, res, next);
    } else {
      console.log(`Routing regular request to frontend: ${req.url}`);
      frontendProxy(req, res, next);
    }

});

module.exports = reverseProxy