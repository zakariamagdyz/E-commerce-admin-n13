const path = require("path")

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings=0 --fix --file ${filenames
    .map((f) =>
      f !== ".lintstagedrc.js" ? path.relative(process.cwd(), f) : ""
    )
    .join(" --file ")}`

module.exports = {
  "**/*.{ts,tsx}": "tsc-files --noEmit --noTsBuildInfo",
  "src/**/*.{js,jsx,ts,tsx,css,md,json}": "prettier -uw --cache",
  "src/**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
}
