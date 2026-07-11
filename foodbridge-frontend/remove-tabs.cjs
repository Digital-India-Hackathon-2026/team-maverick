const fs = require('fs');
const path = require('path');

const dir = '/Users/madanabennyhinnpaulcharles/Downloads/FoodBridge Navigation Bar/foodbridge-frontend/src/pages/dashboards';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex that handles both p-1 and p-1.5
  const regex = /\s*<div className="flex items-center gap-1 p-1\.?5? bg-gray-100 rounded-2xl mb-6 w-max overflow-x-auto">[\s\S]*?<\/div>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, '');
    
    // Cleanup any orphaned {/* Tabs Menu */} or {/* Tabs */} comments
    content = content.replace(/\s*\{\/\*\s*Tabs(?: Menu)?\s*\*\/\}/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Modified:', file);
    modifiedCount++;
  }
}

console.log('Total files modified:', modifiedCount);
