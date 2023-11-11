import React from 'react'
import type { RSSProps, RSSItem } from './RSSInterfaces'
import { useRSSFeed } from './useRSSFeed'
import SiteFeed from './SiteFeed'

// Transformation function specific to the RSS component
function transformRSSData (apiResponseRaw: any): RSSItem[] {
  const xml = apiResponseRaw.feedContents
  const doc = new DOMParser().parseFromString(xml, 'text/xml')
  return parseItems(doc)
}

// Parses the XMLDocument to RSSItem[]
const parseItems = (doc: XMLDocument): RSSItem[] => {
  const elements = doc.querySelectorAll('item')
  return Array.from(elements).map(mapItem)
}

// Maps an individual XML element to RSSItem
const mapItem = (element: Element): RSSItem => {
  return {
    title: getText(element, 'title'),
    link: getText(element, 'link'),
    pubDate: getText(element, 'pubDate'),
    author: getText(element, 'author') ?? getText(element, 'creator')
  }
}

// Helper function to extract text content
const getText = (element: Element, name: string): string => {
  const node = element.querySelector(name)
  return node?.textContent ?? ''
}

// Refactored RSS Component
function RSS (props: RSSProps): React.ReactElement {
  const { items, isLoading, refresh } = useRSSFeed(props.url, transformRSSData)

  return (
    <SiteFeed
      title={props.title}
      homepage={props.homepage}
      isDarkMode={props.isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={refresh}
    />
  )
}

export default RSS
