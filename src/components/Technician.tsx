import React from 'react'
import type { RSSProps, RSSItem } from './RSSInterfaces'
import { fetchRSSData } from './RSSUtils'
import SiteFeed from './SiteFeed'
import cheerio from 'cheerio'

// Transformation function specific to Technician
async function transformTechnicianData (apiResponseRaw: any): Promise<RSSItem[]> {
  const response = apiResponseRaw.feedContents.toString()
  const $ = cheerio.load(response)
  const feedArray: RSSItem[] = []

  $('.tnt-headline.headline').each((index, element) => {
    feedArray.push({
      author: '',
      link: $(element).find('a').attr('href') ?? '',
      pubDate: 'Latest',
      title: $(element).text()
    })
  })

  $('article').each((index, element) => {
    feedArray.push({
      author: $(element).find("[id^='author']").text(),
      link: $(element).find('a').attr('href') ?? '',
      pubDate: $(element).find('.asset-date').text(),
      title: $(element).find('.tnt-asset-link').attr('aria-label') ?? 'Title Error'
    })
  })

  return feedArray
}

// Refactored Technician Component
function Technician (props: RSSProps): React.ReactElement {
  const [items, setItems] = React.useState<RSSItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const urlRoot = 'https://www.technicianonline.com'
  const urlPath = '/sports'
  const url = urlRoot + urlPath

  React.useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      const fetchedItems = await fetchRSSData(url, transformTechnicianData)
      setItems(fetchedItems)
      setIsLoading(false)
    }

    fetchData().catch(console.error)
  }, [url])

  const handleRefresh = (): void => {
    fetchRSSData(url, transformTechnicianData).then(fetchedItems => {
      setItems(fetchedItems)
      setIsLoading(false)
    }).catch(console.error)
  }

  return (
    <SiteFeed
      title={props.title}
      homepage={props.homepage}
      isDarkMode={props.isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  )
}

export default Technician
