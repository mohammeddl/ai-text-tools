export const siteConfig = {
  name: "TextCrafter",
  description: "Advanced AI-powered text processing tools for content creation, editing, and optimization.",
  url: process.env.NODE_ENV === 'production' ? 'https://textcrafter.com/' : 'http://localhost:3000',
  ogImage: "/images/logo.png",
  creator: "TextCrafter Team",
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
    twitter: "https://twitter.com/mohammeddl",
    github: "https://github.com/mohammeddl",
    linkedin: "www.linkedin.com/in/daali-mohammed-85736b271"
  },
  contact: {
    email: "daali.22.ss@gmail.com",
    support: "support@textcrafter.com/"
  }
}

export type SiteConfig = typeof siteConfig