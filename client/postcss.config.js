const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: 'last 2 versions'
    }),
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer')
  ],
}
