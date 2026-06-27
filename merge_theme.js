const fs = require('fs');

// Read both files
const lightHtml = fs.readFileSync('ui/light_mode.html', 'utf8');
const darkHtml = fs.readFileSync('ui/dark_mode.html', 'utf8');

// Extract the Tailwind config colors using regex
const colorRegex = /"colors":\s*({[\s\S]*?})\s*,\s*"borderRadius"/;

const lightMatch = lightHtml.match(colorRegex);
const darkMatch = darkHtml.match(colorRegex);

const lightColorsStr = lightMatch[1];
const darkColorsStr = darkMatch[1];

// Parse to JSON
// To safely parse, we might need to make sure the string is valid JSON, 
// which it looks like it is since it's from a config block.
let lightColors, darkColors;
try {
    lightColors = JSON.parse(lightColorsStr);
    darkColors = JSON.parse(darkColorsStr);
} catch (e) {
    console.error("Error parsing colors JSON", e);
    process.exit(1);
}

// Generate CSS variables
let rootVars = `:root {\n`;
let darkVars = `.dark {\n`;
let twConfigColors = ``;

// Assuming both have the same keys mostly. We will take union of keys.
const allKeys = new Set([...Object.keys(lightColors), ...Object.keys(darkColors)]);

allKeys.forEach(key => {
    // some keys might be missing in one or the other, default to white or black if so, but they should match.
    const lColor = lightColors[key] || '#ffffff';
    const dColor = darkColors[key] || '#000000';

    rootVars += `    --color-${key}: ${lColor};\n`;
    darkVars += `    --color-${key}: ${dColor};\n`;
    twConfigColors += `                        "${key}": "var(--color-${key})",\n`;
});

// Add shadow colors
rootVars += `
    --shadow-light: #d1d9e6;
    --shadow-dark: #ffffff;
    --body-bg: #f0f4f8;
    --scrollbar-track: #f0f4f8;
    --scrollbar-thumb: #c4c7ca;
    --scrollbar-thumb-hover: #a0a4a8;
    --accent-glow: rgba(0, 86, 197, 0.3);
`;
darkVars += `
    --shadow-light: #222736;
    --shadow-dark: #0d1017;
    --body-bg: #12151e;
    --scrollbar-track: #171b27;
    --scrollbar-thumb: #2c303c;
    --scrollbar-thumb-hover: #424653;
    --accent-glow: rgba(176, 198, 255, 0.4);
`;

rootVars += `}\n`;
darkVars += `}\n`;

const newTwConfigColors = `"colors": {\n${twConfigColors}                    }`;

// Base the new HTML on the light mode template
let newHtml = lightHtml.replace(colorRegex, `${newTwConfigColors},\n                    "borderRadius"`);

// Replace styles
const styleBlock = `
    <style>
        ${rootVars}
        ${darkVars}
        
        body {
            background-color: var(--body-bg);
            font-family: 'Hanken Grotesk', sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        /* Neomorphic Shadows */
        .neo-extruded {
            box-shadow: 8px 8px 16px var(--shadow-light), -8px -8px 16px var(--shadow-dark);
            transition: box-shadow 0.3s ease, background-color 0.3s ease;
        }
        /* The dark mode has slightly different offsets for neo-extruded in original: 8px 8px 16px #0d1017, -4px -4px 12px #222736 
           We'll use standard offsets for both to keep CSS simple, or just use variables for the offsets too if needed. 
           For now let's just use the shadows as defined above with variables. */
        
        .dark .neo-extruded {
            box-shadow: 8px 8px 16px var(--shadow-dark), -4px -4px 12px var(--shadow-light);
        }
        .neo-inset {
            box-shadow: inset 6px 6px 12px var(--shadow-light), inset -6px -6px 12px var(--shadow-dark);
            transition: box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .dark .neo-inset {
            box-shadow: inset 6px 6px 12px var(--shadow-dark), inset -3px -3px 8px var(--shadow-light);
        }
        .neo-button-active:active {
            box-shadow: inset 4px 4px 8px var(--shadow-light), inset -4px -4px 8px var(--shadow-dark);
            transform: scale(0.98);
        }
        .dark .neo-button-active:active {
            box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -2px -2px 6px var(--shadow-light);
        }
        .neo-nav-active {
            box-shadow: inset 4px 4px 8px var(--shadow-light), inset -4px -4px 8px var(--shadow-dark);
        }
        .dark .neo-nav-active {
             box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -2px -2px 6px var(--shadow-light);
        }
        /* Soft blue accents */
        .accent-glow {
            filter: drop-shadow(0 0 8px var(--accent-glow));
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
        }
        
        /* Smooth transitions for all themeable properties */
        * {
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
    </style>
`;

// replace old style block
const styleRegex = /<style>[\s\S]*?<\/style>/;
newHtml = newHtml.replace(styleRegex, styleBlock);

// update script toggler logic
const scriptRegex = /\/\/ Theme Toggle simple visual simulation[\s\S]*?\}\)/;
const newScript = `// Theme Toggle logic
        const themeBtn = document.querySelector('button .material-symbols-outlined:contains("light_mode"), button .material-symbols-outlined:contains("dark_mode")');
        if(themeBtn) {
            themeBtn.parentElement.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                // Optional: toggle icon
                if (document.documentElement.classList.contains('dark')) {
                    themeBtn.textContent = 'dark_mode';
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeBtn.textContent = 'light_mode';
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Check local storage on load
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
                themeBtn.textContent = 'dark_mode';
            }
        }`;

newHtml = newHtml.replace(scriptRegex, newScript);

// make sure the html tag doesn't have a fixed light class
newHtml = newHtml.replace('<html class="light" lang="en">', '<html lang="en">');

// write out new file
fs.writeFileSync('ui/index.html', newHtml);
console.log('Successfully merged into ui/index.html');
