const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('src/pages/ComparePage.jsx', 'utf8');
try {
  parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  console.log('ok');
} catch (e) {
  console.error('error', e.message);
  console.error('loc', e.loc);
}
