/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    //includePaths: [path.join(__dirname, 'styles')],
    //prependData: `@import "src/variables.scss";`,
  }
}

module.exports = nextConfig
