import { siteConfig } from "@/config/site";

export function generateStructuredData(pageType: 'home' | 'tools' | 'about' | 'contact', locale: 'en' | 'ar' = 'en') {
  const baseUrl = siteConfig.url;
  
  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": locale === 'ar' ? "أدوات النصوص بالذكاء الاصطناعي" : "AI Text Tools",
    "description": locale === 'ar' 
      ? "أدوات النصوص بالذكاء الاصطناعي تسمح للمستخدمين بتحويل وإنشاء النصوص بسرعة وكفاءة"
      : "Transform, format, and enhance your text using powerful AI-driven tools",
    "url": `${baseUrl}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${locale}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Text Tools",
    "url": baseUrl,
    "logo": `${baseUrl}/images/TextCrafterLogo.png`,
    "sameAs": [
      // Add social media URLs when available
    ]
  };

  // Page-specific schemas
  const pageSchemas: Record<string, Record<string, unknown>> = {
    home: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": locale === 'ar' ? "أدوات النصوص بالذكاء الاصطناعي" : "AI Text Tools - Home",
      "description": locale === 'ar' 
        ? "أدوات النصوص بالذكاء الاصطناعي تسمح للمستخدمين بتحويل وإنشاء النصوص بسرعة وكفاءة"
        : "Transform, format, and enhance your text using powerful AI-driven tools",
      "url": `${baseUrl}/${locale}`,
      "isPartOf": {
        "@type": "WebSite",
        "url": baseUrl
      }
    },
    tools: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": locale === 'ar' ? "أدوات معالجة النصوص" : "Text Processing Tools",
      "description": locale === 'ar'
        ? "أدوات معالجة النصوص المتقدمة: محول الأحرف، مترجم النصوص، عداد الكلمات، وأدوات تحليل النصوص"
        : "Advanced text processing tools: case converter, text translator, word counter, and text analysis tools",
      "url": `${baseUrl}/${locale}/tools`,
      "isPartOf": {
        "@type": "WebSite", 
        "url": baseUrl
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": locale === 'ar' ? "الرئيسية" : "Home",
            "item": `${baseUrl}/${locale}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": locale === 'ar' ? "الأدوات" : "Tools",
            "item": `${baseUrl}/${locale}/tools`
          }
        ]
      }
    },
    about: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": locale === 'ar' ? "حول أدوات النصوص بالذكاء الاصطناعي" : "About AI Text Tools",
      "description": locale === 'ar'
        ? "تعرف على أدوات النصوص بالذكاء الاصطناعي ومهمتنا في توفير أدوات معالجة النصوص المجانية"
        : "Learn about AI Text Tools and our mission to provide free, powerful text processing tools",
      "url": `${baseUrl}/${locale}/about`,
      "isPartOf": {
        "@type": "WebSite",
        "url": baseUrl
      }
    },
    contact: {
      "@context": "https://schema.org",
      "@type": "ContactPage", 
      "name": locale === 'ar' ? "اتصل بنا" : "Contact Us",
      "description": locale === 'ar'
        ? "تواصل مع فريق أدوات النصوص بالذكاء الاصطناعي للدعم والاستفسارات"
        : "Get in touch with the AI Text Tools team for support and inquiries",
      "url": `${baseUrl}/${locale}/contact`,
      "isPartOf": {
        "@type": "WebSite",
        "url": baseUrl
      }
    }
  };

  // For tools page, add SoftwareApplication schema
  if (pageType === 'tools') {
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": locale === 'ar' ? "أدوات النصوص بالذكاء الاصطناعي" : "AI Text Tools",
      "description": locale === 'ar'
        ? "مجموعة شاملة من أدوات معالجة النصوص بما في ذلك محولات الأحرف والترجمة وعد الكلمات"
        : "Comprehensive suite of text processing tools including case converters, translation, and word counting",
      "url": `${baseUrl}/${locale}/tools`,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        locale === 'ar' ? "تحويل الأحرف الكبيرة والصغيرة" : "Uppercase/Lowercase conversion",
        locale === 'ar' ? "ترجمة متعددة اللغات" : "Multi-language translation", 
        locale === 'ar' ? "عد الكلمات والأحرف" : "Word and character counting",
        locale === 'ar' ? "أنماط النصوص المرحة" : "Fun text case modes",
        locale === 'ar' ? "تحليل النصوص المتقدم" : "Advanced text analysis"
      ]
    };
    
    return {
      website: websiteSchema,
      organization: organizationSchema,
      page: pageSchemas[pageType],
      software: softwareSchema
    };
  }

  return {
    website: websiteSchema,
    organization: organizationSchema,
    page: pageSchemas[pageType]
  };
}

export function StructuredDataScript({ data }: { data: Record<string, unknown> }) {
  return (
    <>
      {Object.entries(data).map(([key, schema]) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
