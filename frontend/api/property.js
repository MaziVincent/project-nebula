import React from "react";
import ReactDOMServer from "react-dom/server";
import fetch from "node-fetch";

// Adjust the paths as needed for your project structure
import baseURL from "../src/shared/baseURL.js";
//import PropertyDetails from "./PropertyDetails.js";

export default async function handler(req, res) {
  const { id } = req.query;

   //Check if the request is from a social media crawler
   const userAgent = req.headers["user-agent"] || "";
   const isCrawler = /facebookexternalhit|Twitterbot|Pinterest|Slackbot|Facebot/i.test(userAgent);
 
   if (!isCrawler) {
     // Redirect users to the main React property page
     res.writeHead(302, { Location: `https://www.megatechrealestate.ng/property/${id}` });
     res.end();
     return;
   }

  try {
    // Fetch property details from your backend API on Render
    const response = await fetch(`${baseURL}properties/${id}`);
    const propertyData = await response.json();

    //console.log(propertyData);

    // Render the PropertyDetails component to HTML
    // const appString = ReactDOMServer.renderToString(
    //   React.createElement(PropertyDetails, { data: propertyData })
    // );

    // Inject into an HTML template
    const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta name="description" content="${propertyData?.description}"/>
              <meta property="og:description" content="${propertyData?.description}"/>
              <meta property="og:title" content="${propertyData?.title}" />
              <meta property="og:url" content="https://www.megatechrealestate.ng/api/property?id=${id}" />
              <meta property="og:image" content="${propertyData.imageUrls[0]}" />
              <title>${propertyData.title}</title>
          </head>
          <body>
              <div id="root">
              <main>
                <h1> ${propertyData?.title} </h1>
                <p> ${propertyData?.description} </p>
                <div>
                <img src=${propertyData.imageUrls?.[0]} />
                </div>
              </main>
              </div>
          </body>
          </html>
      `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}