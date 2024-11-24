import baseURL from "../src/shared/baseURL";

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const PropertyDetails = require("../src/components/Home/PropertyDtls").default;
const fetch = require("node-fetch");

export default async function handler(req, res) {
  const { id } = req.query;
console.log(id)
  // Fetch property details from your backend API on Render
//   const response = await fetch(`${baseURL}/properties/${id}`);
//   const propertyData = await response.json();
//     console.log(propertyData)
//   // Render the PropertyDetails component to HTML
//   const appString = ReactDOMServer.renderToString(
//     React.createElement(PropertyDetails, { data: propertyData })
//   );

  // Inject into an HTML template
//   const html = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <meta name="description" content="${propertyData?.description}">
//             <meta property="og:title" content="${propertyData?.title}" />
//             <meta property="og:url" content="${window.location.href}" />
//             <meta property="og:image" content="${propertyData?.imageUrls[0]}" />
//             <title>${propertyData.title}</title>
//         </head>
//         <body>
//             <div id="root">${appString}</div>
//         </body>
//         </html>
//     `;

 // res.setHeader("Content-Type", "text/html");
//   res.status(200).send(html);
  res.status(200).json({id:id});
}