import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "AI Text Tools - Digital Agency",
  description: "We are a top Digital agency in the world",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale parameter
  if (!params.locale) {
    throw new Error("Locale parameter is missing");
  }

  // Validate locale is supported
  const supportedLocales = ["en", "ar"];
  if (!supportedLocales.includes(params.locale)) {
    throw new Error(`Unsupported locale: ${params.locale}`);
  }

  try {
    const messages = await getMessages({ locale: params.locale });

    if (!messages) {
      throw new Error(`Failed to load messages for locale: ${params.locale}`);
    }

    return (
      <html lang={params.locale}>
        <head>
          {/* Bootstrap CSS */}
          <link
            href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
            rel='stylesheet'
            integrity='sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM'
            crossOrigin='anonymous'
          />

          {/* Font Awesome */}
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
            integrity='sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='
            crossOrigin='anonymous'
            referrerPolicy='no-referrer'
          />

          {/* Custom CSS files */}
          <link rel='stylesheet' href='/css/fxotary-icon.css' />
          <link rel='stylesheet' href='/css/responsive.css' />
          <link rel='stylesheet' href='/css/slick.css' />
          <link rel='stylesheet' href='/css/spacing.css' />
          <link rel='stylesheet' href='/css/style.css' />
        </head>
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>

          {/* Bootstrap JavaScript */}
          <script
            src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
            integrity='sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz'
            crossOrigin='anonymous'
          />
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error in LocaleLayout:", error);
    throw error;
  }
}
