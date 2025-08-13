const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

module.exports = withNextIntl({
  // Remove the old i18n config as it's not needed with App Router
});
