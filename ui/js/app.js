// app.js - SPA Router and Logic

const pageCache = {};
const apiCache = new Map();

// Apply saved theme immediately to prevent flash of wrong theme
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

async function cachedFetch(url, ttlMs = 60000) {
    const cached = apiCache.get(url);
    if (cached && Date.now() - cached.time < ttlMs) {
        return cached.data;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    apiCache.set(url, { data, time: Date.now() });
    return data;
}

async function loadPage(page) {
    const contentDiv = document.getElementById('app-content');

    // Validate page name: only lowercase letters and hyphens (prevents path traversal)
    if (!/^[a-z-]+$/.test(page)) {
        contentDiv.textContent = 'Page not found';
        return;
    }

    try {
        if (!pageCache[page]) {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) throw new Error('Page not found');
            pageCache[page] = await response.text();
        }
        contentDiv.innerHTML = pageCache[page];
        
        // Re-initialize theme toggle button since it is recreated when we swap pages
        initThemeToggle();

        // Fetch data and populate based on page
        if (page === 'overview') {
            await initOverview();
        } else if (page === 'sales') {
            await initSales();
        } else if (page === 'products') {
            await initProducts();
        }

    } catch (e) {
        contentDiv.textContent = 'Error loading page';
        console.error(e);
    }
}

function handleRoute() {
    const hash = window.location.hash.substring(1) || 'overview';
    loadPage(hash);
    
    // Update active state in nav
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('neo-nav-active', 'text-primary', 'font-bold');
        a.classList.add('text-secondary');
        
        const href = a.getAttribute('href');
        if (href === `#${hash}`) {
            a.classList.add('neo-nav-active', 'text-primary', 'font-bold');
            a.classList.remove('text-secondary');
        }
    });
}

function initThemeToggle() {
    const buttons = document.querySelectorAll('button .material-symbols-outlined');
    let themeBtn = null;
    for (const btn of buttons) {
        if (btn.textContent.trim() === 'light_mode' || btn.textContent.trim() === 'dark_mode') {
            themeBtn = btn;
            break;
        }
    }
    
    if(themeBtn) {
        // Remove old listeners if any by replacing the element
        const newBtnParent = themeBtn.parentElement.cloneNode(true);
        themeBtn.parentElement.parentNode.replaceChild(newBtnParent, themeBtn.parentElement);
        
        const newThemeBtn = newBtnParent.querySelector('.material-symbols-outlined');
        
        newBtnParent.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                newThemeBtn.textContent = 'dark_mode';
                localStorage.setItem('theme', 'dark');
            } else {
                newThemeBtn.textContent = 'light_mode';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check local storage on load
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            newThemeBtn.textContent = 'dark_mode';
        } else {
            document.documentElement.classList.remove('dark');
            newThemeBtn.textContent = 'light_mode';
        }
    }
}

// Data Fetching and Populating for Overview
async function initOverview() {
    // Overview page currently uses static HTML content
    // Data binding will be implemented when overview elements get stable IDs
    console.log("Overview page loaded");
}

// Data Fetching and Populating for Sales
async function initSales() {
    try {
        const [kpis] = await Promise.all([
            cachedFetch('/api/kpis'),
            cachedFetch('/api/sales-overview'),
            cachedFetch('/api/sales-by-category'),
            cachedFetch('/api/top-products'),
            cachedFetch('/api/top-customers'),
            cachedFetch('/api/sales-by-region')
        ]);
        
        // Populate Sales KPIs using stable IDs
        const revenueEl = document.getElementById('kpi-revenue');
        const profitEl = document.getElementById('kpi-profit');
        const ordersEl = document.getElementById('kpi-orders');
        const avgOrderEl = document.getElementById('kpi-avg-order');

        if (revenueEl) revenueEl.textContent = kpis.totalRevenue.formatted;
        if (profitEl) profitEl.textContent = kpis.totalProfit.formatted;
        if (ordersEl) ordersEl.textContent = kpis.totalOrders.formatted;
        if (avgOrderEl) avgOrderEl.textContent = kpis.avgOrderValue.formatted;
        
        console.log("Sales Data Loaded Successfully");
        
    } catch(e) {
        console.error("Error loading Sales data", e);
    }
}

// Data Fetching and Populating for Products
async function initProducts() {
    try {
        const data = await cachedFetch('/api/products');
        
        // Populate Products KPIs using stable IDs
        const totalProductsEl = document.getElementById('kpi-total-products');
        const activeListingsEl = document.getElementById('kpi-active-listings');
        const lowStockEl = document.getElementById('kpi-low-stock');
        const outOfStockEl = document.getElementById('kpi-out-of-stock');

        if (totalProductsEl) totalProductsEl.textContent = data.kpis.totalProducts.formatted;
        if (activeListingsEl) activeListingsEl.textContent = data.kpis.activeListings.formatted;
        if (lowStockEl) lowStockEl.textContent = data.kpis.lowStock.formatted;
        if (outOfStockEl) outOfStockEl.textContent = data.kpis.outOfStock.formatted;
        
        console.log("Products Data Loaded Successfully", data);
        
    } catch(e) {
        console.error("Error loading Products data", e);
    }
}

window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', () => {
    // Initial load
    handleRoute();
});
