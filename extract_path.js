
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public/images/test/TEXTCRAFTER.svg');
const tsPath = path.join(__dirname, 'src/components/sections/home/textCrafterData.ts');

try {
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // Regex to capture the content of d attribute
  // Matches d=" content "
  const match = svgContent.match(/d="([^"]+)"/);
  
  if (match && match[1]) {
    const pathData = match[1];
    const fileContent = `export const textCrafterData = "${pathData}";\n`;
    
    fs.writeFileSync(tsPath, fileContent);
    console.log(`Successfully created ${tsPath}`);
  } else {
    console.error('Could not find d attribute in SVG');
    process.exit(1);
  }
} catch (error) {
  console.error('Error processing file:', error);
  process.exit(1);
}
