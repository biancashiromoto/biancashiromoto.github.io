const path = require("path");

const buildNextLintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{ts,tsx}": ["prettier --write", buildNextLintCommand, "vitest related --run"],
  "*.{json,scss,css,md}": ["prettier --write"],
};
