const path = require("path")

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings=1 --fix --file ${filenames
    .map((f) =>
      f !== ".lintstagedrc.js" ? path.relative(process.cwd(), f) : ""
    )
    .join(" --file ")}`

module.exports = {
  "*": "prettier -uw --cache",
  "**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
}
