const express = require('express');
const cors = require('cors');
const path = require('path');
const dataService = require('./dataService');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.get('/api/admin-user', (req, res) => {
  res.json(dataService.adminUser);
});

// Root route
app.get('/', (req, res) => {
  res.send('Shoplytics API is running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
