import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported locales
  locales: ["en", "fr"],

  // Default locale
  defaultLocale: "en",

  localePrefix: "always",
});

export const config = {
  // Internationalized pathnames only
  matcher: ["/", "/(ar|en)/:path*"],
};
