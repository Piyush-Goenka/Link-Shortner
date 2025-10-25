const express = require('express');
const redirect = require('./controllers/redirects.controller');
const url = require('./controllers/url.controller');
const cors = require('cors');

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'http://localhost:3000',                          // local development
  'https://link-shortner-snowy-zeta.vercel.app'     // deployed Vercel frontend
];

// ✅ Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('❌ CORS blocked for origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // optional — if you use cookies or auth headers
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hi there 👋 Link Shortener API is running!' });
});

// ✅ Route handlers
app.use('/', redirect);
app.use('/api/url', url);

// ✅ Export app
module.exports = app;
