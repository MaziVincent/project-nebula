const PRERENDER_TOKEN = 'YOUR_PRERENDER_IO_TOKEN';  // Replace with your Prerender.io API token

  // Define bot user agents
  const botUserAgents = [
    'googlebot', 'bingbot', 'yandex', 'baiduspider',
    'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot', 'embedly',
    'quora link preview', 'showyoubot', 'outbrain', 'pinterest/0.',
    'slackbot', 'vkShare', 'W3C_Validator'
  ];

  const userAgent = req.headers['user-agent'] || '';
  const isBot = botUserAgents.some(bot => userAgent.toLowerCase().includes(bot));

  // If a bot is detected, redirect to Prerender.io
  if (isBot) {
    const prerenderUrl = `https://service.prerender.io/${req.url}?_escaped_fragment_=&token=${PRERENDER_TOKEN}`;
    res.redirect(prerenderUrl);
  } else {
    // For regular users, redirect them to the actual page
    res.redirect(`https://megatech.com${req.url}`);
  }
