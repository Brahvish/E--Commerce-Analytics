const fs = require('fs');

const html = fs.readFileSync('ui/products.html', 'utf8');

// Regex to match <main ...> ... </main>
const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/;
const match = html.match(mainRegex);

if (match) {
    fs.writeFileSync('ui/pages/products.html', match[2]);
    console.log('Successfully extracted products page.');
} else {
    console.error('Could not find <main> tag.');
}
