const fs = require('fs');

const indexHtml = fs.readFileSync('ui/index.html', 'utf8');
const salesHtml = fs.readFileSync('ui/sales_light.html', 'utf8');

// Regex to match <main ...> ... </main>
const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/;

const indexMatch = indexHtml.match(mainRegex);
const salesMatch = salesHtml.match(mainRegex);

if (indexMatch && salesMatch) {
    const overviewContent = indexMatch[2];
    const salesContent = salesMatch[2];

    fs.writeFileSync('ui/pages/overview.html', overviewContent);
    fs.writeFileSync('ui/pages/sales.html', salesContent);

    // Replace main in index.html with empty shell
    const newIndexHtml = indexHtml.replace(mainRegex, '$1\n    <div id="app-content"></div>\n$3');
    
    // Also we need to add the app.js script tag before </body>
    if (!newIndexHtml.includes('<script src="js/app.js"></script>')) {
        const scriptInjectedHtml = newIndexHtml.replace('</body>', '    <script src="js/app.js"></script>\n</body>');
        fs.writeFileSync('ui/index.html', scriptInjectedHtml);
    } else {
        fs.writeFileSync('ui/index.html', newIndexHtml);
    }
    
    console.log('Successfully extracted pages and updated index.html shell.');
} else {
    console.error('Could not find <main> tags in one of the files.');
}
