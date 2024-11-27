const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/github-token', (req, res) => {
    res.json({ token: process.env.GITHUB_TOKEN });
});

// Dynamic Route Matching
app.get('*', (req, res) => {
    const routePath = req.path === '/' ? 'index' : req.path.slice(1); // Default to 'index' for '/'
    const filePath = path.join(app.get('views'), `${routePath}.ejs`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.warn(`404 - EJS file not found for route: ${req.path}`);
            return res.status(404).render('404');
        }

        console.log(`Rendering: ${routePath}.ejs`);
        res.render(routePath);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
