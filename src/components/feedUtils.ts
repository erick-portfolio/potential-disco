// feedUtils.ts

import fetch from 'node-fetch'
import type { RSSItem } from './RSSInterfaces'

export const fetchFeed = async (url: string): Promise<string> => {
  const response = await fetch(url)
  return await response.text()
}

export const parseFeed = (xml: string): RSSItem[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')
  const items: RSSItem[] = []
  const entries = doc.getElementsByTagName('entry')
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const item = {
      title: getText(entry, 'title'),
      link: getText(entry, 'link') !== '' ? getText(entry, 'link') : getLink(entry, 'link'),
      pubDate: getText(entry, 'updated'),
      author: getText(entry, 'author')
    }
    items.push(item)
  }
  return items
}

const getText = (parent: Element, name: string): string => {
  const node = parent.querySelector(name)
  return node?.textContent ?? ''
}

const getLink = (parent: Element, name: string): string => {
  const node = parent.querySelector(name)
  return node?.getAttribute('href') ?? ''
}
