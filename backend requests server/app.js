// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const convert = require("xml-js");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const app = express();
const port = 3000;

// Rate limiting - Goodreads limits to 1/sec, so we should too

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Allow CORS from any origin
app.use(cors());

app.use(express.json());

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show "gpt3  relay server" in the browser
app.get("/", (req, res) => res.send("gpt3  relay server"));

// Our Goodreads relay route!
app.get("/api/prose", async (req, res) => {
  try {
    console.log(req.body);
    // This uses string interpolation to make our search query string
    // it pulls the posted query param and reformats it for goodreads
    const searchString = `prompt=${req.query.prompt}`;

    // It uses node-fetch to call the goodreads api, and reads the key from .env
    const response = await fetch(
      `https://api.openai.com/v1/completions`, {
        method: 'POST',
        headers: {
          "Authorization":
          ${process.env.GOODREADS_API_KEY},
        },
        body: JSON.stringify({  "model": "text-davinci-003",
        "prompt": "Human: This is a test.\nAI: ",
        "max_tokens": 256,
        "temperature": 0.7,
        "top_p": 1,
        "n": 1,
        "logprobs": null})}
    );
    //more info here https://www.goodreads.com/api/index#search.books
    const xml = await response.text();
    console.log(xml);
    // Goodreads API returns XML, so to use it easily on the front end, we can
    // convert that to JSON:
    const json = convert.xml2json(xml, { compact: true, spaces: 2 });

    // The API returns stuff we don't care about, so we may as well strip out
    // everything except the results:
    const results = JSON.parse(json).GoodreadsResponse.search.results;

    return res.json({
      success: true,
      results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Relay server listening on port ${port}!`));
