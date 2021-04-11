module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss'),
              require('autoprefixer'),
              require('@fullhuman/postcss-purgecss')({
                content: [
                  './**/*.html',
                  './**/*.ts',
                ],
                defaultExtractor: content => content.match(/[A-Za-z0-9-_/]+/g) || []
              })
            ],
          },
        },
      },
    ],
  },
};
