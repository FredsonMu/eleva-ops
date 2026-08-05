const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { match: /text-\[#1d1d1f\](?! dark:text-white)/g, replace: 'text-[#1d1d1f] dark:text-white' },
  { match: /bg-\[#1d1d1f\](?! dark:bg-white)/g, replace: 'bg-[#1d1d1f] dark:bg-white' },
  { match: /bg-white(?!(\/| dark:bg-white\/5| dark:bg-\[#020617\]\/70))/g, replace: 'bg-white dark:bg-white/5' },
  { match: /text-black\/50(?! dark:text-white\/50)/g, replace: 'text-black/50 dark:text-white/50' },
  { match: /text-black\/60(?! dark:text-white\/60)/g, replace: 'text-black/60 dark:text-white/60' },
  { match: /text-black\/40(?! dark:text-white\/40)/g, replace: 'text-black/40 dark:text-white/40' },
  { match: /text-black\/30(?! dark:text-white\/30)/g, replace: 'text-black/30 dark:text-white/30' },
  { match: /text-black\/20(?! dark:text-white\/20)/g, replace: 'text-black/20 dark:text-white/20' },
  { match: /text-black\/10(?! dark:text-white\/10)/g, replace: 'text-black/10 dark:text-white/10' },
  { match: /border-black\/5(?! dark:border-white\/10)/g, replace: 'border-black/5 dark:border-white/10' },
  { match: /border-black\/10(?! dark:border-white\/20)/g, replace: 'border-black/10 dark:border-white/20' },
  { match: /bg-black\/5(?! dark:bg-white\/5)/g, replace: 'bg-black/5 dark:bg-white/5' },
  { match: /bg-black\/10(?! dark:bg-white\/10)/g, replace: 'bg-black/10 dark:bg-white/10' },
  { match: /bg-black\/20(?! dark:bg-white\/20)/g, replace: 'bg-black/20 dark:bg-white/20' },
  { match: /bg-black\/\[0\.02\](?! dark:bg-white\/\[0\.02\])/g, replace: 'bg-black/[0.02] dark:bg-white/[0.02]' },
  { match: /bg-\[#fbfbfd\](?! dark:bg-\[#040914\])/g, replace: 'bg-[#fbfbfd] dark:bg-[#040914]' },
  { match: /bg-\[#f4f4f5\](?! dark:bg-\[#040914\])/g, replace: 'bg-[#f4f4f5] dark:bg-[#040914]' },
  { match: /bg-\[#fdfdfd\](?! dark:bg-\[#040914\])/g, replace: 'bg-[#fdfdfd] dark:bg-[#040914]' },
];

for (const file of files) {
  if (file === 'ThemeToggle.tsx' || file === 'Hero.tsx' || file === 'Navbar.tsx') continue;
  
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  for (const r of replacements) {
    content = content.replace(r.match, r.replace);
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${file}`);
}
