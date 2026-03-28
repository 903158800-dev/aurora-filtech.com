const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const pagesDir = path.join(__dirname, 'pages');
const outputDir = path.join(__dirname, '..');
const productsContentDir = path.join(__dirname, '..', 'content', 'products');

const siteData = {
    siteTitle: 'Aurora Filtech',
    baseUrl: 'https://www.aurora-filtech.com'
};

// Function to read all product markdown files
function getProducts() {
    const products = [];
    if (fs.existsSync(productsContentDir)) {
        const files = fs.readdirSync(productsContentDir);
        files.forEach(file => {
            if (path.extname(file) === '.md') {
                const fileContent = fs.readFileSync(path.join(productsContentDir, file), 'utf-8');
                const { data, content } = matter(fileContent);
                products.push({
                    slug: file.replace('.md', ''),
                    ...data,
                    bodyHtml: marked.parse(content)
                });
            }
        });
    }
    return products;
}

function buildPages() {
    console.log('Building EJS templates...');
    const products = getProducts();

    // 1. Build standard pages
    fs.readdirSync(pagesDir).forEach(file => {
        if (path.extname(file) === '.ejs' && !file.startsWith('_')) {
            try {
                const template = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
                const html = ejs.render(template, { 
                    filename: path.join(pagesDir, file), 
                    ...siteData,
                    products // Pass products data to all pages
                });
                fs.writeFileSync(path.join(outputDir, file.replace('.ejs', '.html')), html);
                console.log(`Generated ${file.replace('.ejs', '.html')}`);
            } catch (err) {
                console.error(`Error building ${file}:`, err);
            }
        }
    });

    // 2. Build individual product pages (Optional for now, but good to have)
    // We will create a template for this later if needed.
}

buildPages();

// Watch mode
if (process.argv.includes('--watch')) {
    console.log('Watching for EJS file changes...');
    fs.watch(__dirname, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.ejs')) {
            console.log(`${filename} changed. Rebuilding...`);
            buildPages();
        }
    });
}
