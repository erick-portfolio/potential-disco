import React, { useEffect, useState } from 'react'
import SiteFeed from './SiteFeed'
import './RSS.css'
import cheerio from 'cheerio'
import { API } from 'aws-amplify'

interface WolfpackerItem {
  title: string
  link: string
  pubDate: string
  author: string
}

interface WolfpackerProps {
  title: string
  homepage: string
  isDarkMode: boolean
}

function Wolfpacker ({ homepage, title, isDarkMode }: WolfpackerProps): React.ReactElement {
  const [items, setItems] = useState<WolfpackerItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const urlRoot = 'https://www.on3.com'
  const urlPath = '/teams/nc-state-wolfpack'
  const url = urlRoot + urlPath

  const fetchData = async (): Promise<void> => {
    try {
      const responseRaw = await API.get('proxy', `/proxy?url=${encodeURIComponent(url)}`, {})
      const response = responseRaw.feedContents.toString()
      const $ = cheerio.load(response)
      const feedArray: WolfpackerItem[] = []
      $('article').each((index, element) => {
        const feed: WolfpackerItem = {
          author: $(element)
            .find(
              '.ArticleFeed_authorblock__eesEX  .MuiTypography-root.MuiLink-root.MuiLink-underlineNone.ArticleFeed_name__OZ2nP.MuiTypography-caption.MuiTypography-colorPrimary,  .ArticleCover_author__O0ZMp'
            )
            .text(),
          link:
            urlRoot +
            ($(element)
              .find(
                'a.MuiTypography-root.MuiLink-root.MuiLink-underlineHover, .ArticleCover_titlelink__TvbbB'
              )
              .attr('href') ?? ''),
          pubDate: $(element)
            .find(
              '.MuiTypography-root.ArticleFeed_date__rTL2d.MuiTypography-caption.MuiTypography-colorTextPrimary, .ArticleCover_time__vAnWk'
            )
            .clone()
            .children()
            .remove()
            .end()
            .text(),
          title: $(element)
            .find(
              '.MuiTypography-root.ArticleFeed_title__ct_XL.MuiTypography-h6.MuiTypography-colorTextPrimary, .ArticleCover_title__7E2I0'
            )
            .text()
        }
        feedArray.push(feed)
      })

      setItems(feedArray)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching RSS feed', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [url])

  const handleRefresh = (): void => {
    setIsLoading(true)
    void fetchData()
  }

  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.author
      }))}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  )
}

export default Wolfpacker
