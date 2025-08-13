const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  }
});
