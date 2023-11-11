import React from 'react'
import SiteFeed from './SiteFeed'
import './RSS.css'
import cheerio from 'cheerio'
import type { RSSProps, RSSItem } from './RSSInterfaces'
import { fetchRSSData } from './RSSUtils'

// Transformation function specific to Wolfpacker
async function transformWolfpackerData (apiResponseRaw: any): Promise<RSSItem[]> {
  const response = apiResponseRaw.feedContents.toString()
  const $ = cheerio.load(response)
  const feedArray: RSSItem[] = []

  $('article').each((index, element) => {
    feedArray.push({
      author: $(element).find('.ArticleFeed_authorblock__eesEX .MuiTypography-root.MuiLink-root.MuiLink-underlineNone.ArticleFeed_name__OZ2nP.MuiTypography-caption.MuiTypography-colorPrimary, .ArticleCover_author__O0ZMp').text(),
      link: 'https://www.on3.com' + ($(element).find('a.MuiTypography-root.MuiLink-root.MuiLink-underlineHover, .ArticleCover_titlelink__TvbbB').attr('href') ?? ''),
      pubDate: $(element).find('.MuiTypography-root.ArticleFeed_date__rTL2d.MuiTypography-caption.MuiTypography-colorTextPrimary, .ArticleCover_time__vAnWk').clone().children().remove().end().text(),
      title: $(element).find('.MuiTypography-root.ArticleFeed_title__ct_XL.MuiTypography-h6.MuiTypography-colorTextPrimary, .ArticleCover_title__7E2I0').text()
    })
  })

  return feedArray
}

function Wolfpacker (props: RSSProps): React.ReactElement {
  const [items, setItems] = React.useState<RSSItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      const fetchedItems = await fetchRSSData(props.url, transformWolfpackerData)
      setItems(fetchedItems)
      setIsLoading(false)
    }

    fetchData().catch(console.error)
  }, [props.url])

  const handleRefresh = (): void => {
    fetchRSSData(props.url, transformWolfpackerData).then(fetchedItems => {
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

export default Wolfpacker
