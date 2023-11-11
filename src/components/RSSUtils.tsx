// RSSUtils.tsx
import type { RSSItem } from './RSSInterfaces'
import { API } from 'aws-amplify'

// Type for the transformation function that can be either synchronous or asynchronous
type TransformFunction =
  | ((data: any) => RSSItem[])
  | ((data: any) => Promise<RSSItem[]>)

export async function fetchRSSData (url: string, transformFunction: TransformFunction): Promise<RSSItem[]> {
  try {
    const apiResponseRaw = await API.get('proxy', `/proxy?url=${encodeURIComponent(url)}`, {})

    // Check if transformFunction returns a Promise
    const result = transformFunction(apiResponseRaw)
    if (result instanceof Promise) {
      // Await if it's a Promise
      return await result
    } else {
      // Directly return if it's not a Promise
      return result
    }
  } catch (error) {
    console.error('Error fetching RSS feed', error)
    return []
  }
}
