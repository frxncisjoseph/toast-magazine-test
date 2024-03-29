const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("autoprefixer"),
    purgecss({
      content: ["./**/*.html"],
      whitelist: ["slick-prev", "slick-arrow"],
    }),
  ],
};
