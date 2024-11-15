const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/community', (req, res) => res.render('community'));
app.get('/portfolio', (req, res) => res.render('portfolio'));

// Dynamic route for portfolio files
app.get('/portfolio/:page', (req, res) => {
  const page = req.params.page;
  console.log(`Attempting to render portfolio page: ${page}`);
  res.render(`portfolio/${page}`, (err, html) => {
      if (err) {
          console.error(`Error rendering page: ${page}`, err);
          return res.status(404).end(); // Let the global 404 handler take over
      }
      res.send(html);
  });
});


// Handle undefined routes (404 fallback)
app.use((req, res) => {
    console.warn(`404 - Not Found: ${req.originalUrl}`);
    res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
