# Shoplytics E-Commerce Analytics Dashboard

A modern, neomorphic E-Commerce Analytics Dashboard built with a Node.js/Express backend and a responsive HTML/TailwindCSS frontend.

## Features

* **Neomorphic UI:** Beautiful, soft UI design using TailwindCSS.
* **Light/Dark Mode:** Seamless theme switching built right into the frontend.
* **REST API:** A fully functional Express.js backend serving dashboard metrics (KPIs, Charts, Top Products, etc.).
* **Dynamic Data Simulation:** Uses a structured data service to simulate a real database.

## Project Structure

* `/ui/` - Contains the frontend HTML template (`index.html`) which fully supports both light and dark modes natively.
* `server.js` - The main Express application that serves the API and static UI files.
* `dataService.js` - The mock data provider simulating database queries.

## Getting Started

### Prerequisites

* Node.js installed on your machine.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Brahvish/E--Commerce-Analytics.git
   ```
2. Navigate to the project directory:
   ```bash
   cd E--Commerce-Analytics
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the backend server:
```bash
node server.js
```

The server will start on port `3000`. You can view the application in your browser at:
* **Dashboard (Light & Dark Themes):** [http://localhost:3000/index.html](http://localhost:3000/index.html)

## API Endpoints

The following REST endpoints are available:

* `GET /api/kpis` - Retrieves top-level metrics (Revenue, Profit, Orders, AOV).
* `GET /api/sales-overview` - Retrieves monthly sales data for charts.
* `GET /api/sales-by-category` - Retrieves the sales breakdown by category.
* `GET /api/top-products` - Retrieves the best-selling products.
* `GET /api/top-customers` - Retrieves the top spending customers.
* `GET /api/sales-by-region` - Retrieves regional sales distribution.
* `GET /api/admin-user` - Retrieves the current admin user's profile information.
