const path = require('path')

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    .map(f => (f !== '.lintstagedrc.js' ? path.relative(process.cwd(), f) : ''))
    .join(' --file ')}`

module.exports = {
  'src/**/*.{js,jsx,ts,tsx,css,md,json}': 'prettier -uw --cache',
  'src/**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
