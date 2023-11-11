import './RSS.css'
import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import SiteFeed from './SiteFeed'
import type { RSSItem } from './types'

interface RSSProps {
  url: string
  title: string
  homepage: string
  isDarkMode: boolean
}

function RSS ({ homepage, url, title, isDarkMode }: RSSProps): React.ReactElement {
  const [items, setItems] = useState<RSSItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchItems = async (): Promise<void> => {
    try {
      const response = await API.get('proxy', `/proxy?url=${encodeURIComponent(url)}`, {})
      const xml = response.feedContents

      const doc = new DOMParser().parseFromString(xml, 'text/xml')
      const newItems = parseItems(doc)

      setItems(newItems)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const parseItems = (doc: XMLDocument): RSSItem[] => {
    const elements = doc.querySelectorAll('item')
    const items = []

    for (let i = 0; i < elements.length; i++) {
      items.push(mapItem(elements[i]))
    }
    return items
  }

  const mapItem = (element: Element): RSSItem => {
    return {
      title: getText(element, 'title'),
      link: getText(element, 'link'),
      pubDate: getText(element, 'pubDate'),
      author: getText(element, 'author') ?? getText(element, 'creator')
    }
  }

  const getText = (element: Element, name: string): string => {
    const node = element.querySelector(name)
    return node?.textContent ?? ''
  }

  useEffect(() => {
    void fetchItems()
  }, [url])

  const handleRefresh = (): void => {
    setIsLoading(true)
    void fetchItems()
  }

  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  )
}

export default RSS
