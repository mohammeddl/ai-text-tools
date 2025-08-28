export const siteConfig = {
  name: "AI Text Tools",
  description: "Advanced AI-powered text processing tools for content creation, editing, and optimization.",
  url: process.env.NODE_ENV === 'production' ? 'https://aitexttools.com' : 'http://localhost:3000',
  ogImage: "/images/TextCrafterLogo.png",
  creator: "AI Text Tools Team",
  keywords: [
    "AI text tools",
    "text processing",
    "content generation",
    "text analysis",
    "AI writing assistant",
    "text optimization",
    "grammar checker",
    "content creator"
  ],
  links: {
    twitter: "https://twitter.com/aitexttools",
    github: "https://github.com/aitexttools",
    linkedin: "https://linkedin.com/company/aitexttools"
  },
  contact: {
    email: "contact@aitexttools.com",
    support: "support@aitexttools.com"
  }
}

export type SiteConfig = typeof siteConfig