import { NextResponse } from 'next/server';

// URL of your Rendertron instance
const RENDERTRON_URL = 'https://real-estate-441700.ue.r.appspot.com/render';

// List of common bot user agents
const botUserAgents = [
  'googlebot',
  'bingbot',
  'yahoo',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'embedly',
  'pinterest',
  'developers.google.com/+/web/snippet',
  'redditbot',
  'applebot',
  'whatsapp',
  'google-structured-data-testing-tool',
];

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if the request is coming from a bot
  const isBot = botUserAgents.some(bot => userAgent.toLowerCase().includes(bot));

  if (isBot) {
    // Redirect bot requests to Rendertron
    const rendertronUrl = `${RENDERTRON_URL}/${request.nextUrl.href}`;
    return NextResponse.rewrite(rendertronUrl);
  }

  // Continue to the regular route if not a bot
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Apply middleware to all paths
};