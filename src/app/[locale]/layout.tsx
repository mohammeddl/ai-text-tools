import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const locales = ['en', 'ar'];

export const metadata: Metadata = {
  title: "TextCrafter - AI Text Tools",
  description: "Transform and generate text with AI-powered tools.",
  icons: {
    icon: '/images/logo.png',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Handle async params
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Validate locale on the server side
  if (!locales.includes(locale)) {
    return (
      <html>
        <body>
          <div>Invalid locale</div>
        </body>
      </html>
    );
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
