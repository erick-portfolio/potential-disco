// RSSInterfaces.tsx
export interface RSSItem {
    title: string
    link: string
    pubDate: string
    author: string
  }
  
  export interface RSSProps {
    url: string
    title: string
    homepage: string
    isDarkMode: boolean
  }
  