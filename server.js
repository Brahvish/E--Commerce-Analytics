require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dataService = require('./dataService');

const app = express();
const port = process.env.PORT || 3000;

// Security headers (CSP disabled for Tailwind CDN and inline scripts)
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// CORS - restrict to known origins
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : [`http://localhost:${port}`],
    methods: ['GET'],
    optionsSuccessStatus: 200
}));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', apiLimiter);

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// Optional authentication middleware (active only when API_TOKEN env var is set)
function optionalAuth(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    if (!apiToken) return next();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token || token !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// Serve the UI files (HTML, etc.) statically
app.use(express.static(path.join(__dirname, 'ui')));

// API Endpoints
app.get('/api/kpis', (req, res) => {
  res.json(dataService.kpis);
});

app.get('/api/sales-overview', (req, res) => {
  res.json(dataService.salesOverview);
});

app.get('/api/sales-by-category', (req, res) => {
  res.json(dataService.salesByCategory);
});

app.get('/api/top-products', (req, res) => {
  res.json(dataService.topProducts);
});

app.get('/api/top-customers', (req, res) => {
  res.json(dataService.topCustomers);
});

app.get('/api/sales-by-region', (req, res) => {
  res.json(dataService.salesByRegion);
});

app.get('/api/admin-user', optionalAuth, (req, res) => {
  res.json(dataService.adminUser);
});

app.get('/api/products', (req, res) => {
  res.json(dataService.productsData);
});

// Root route
app.get('/', (req, res) => {
  res.send('Shoplytics API is running');
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
