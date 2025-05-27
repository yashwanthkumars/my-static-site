const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');

// Test 1: index.html exists
if (!fs.existsSync(htmlPath)) {
    console.error('❌ index.html does not exist');
    process.exit(1);
} else {
    console.log('✅ index.html exists');
}

// Test 2: index.html contains Devtools Employee Attendance title
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
if (/<h1[^>]*>Devtools Employee Attendance<\/h1>/i.test(htmlContent)) {
    console.log('✅ index.html contains Devtools Employee Attendance <h1>');
} else {
    console.error('❌ index.html does not contain Devtools Employee Attendance <h1>');
    process.exit(1);
}
