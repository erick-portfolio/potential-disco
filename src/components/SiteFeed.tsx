import React, { Fragment } from 'react'
import type { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { RSSItem } from './RSSInterfaces'

interface FeedCardProps {
  item: RSSItem
}

const FeedCard: FC<FeedCardProps> = ({ item }) => {
  const formatDate = (date: string): string => {
    const pubDate = new Date(date)
    return isNaN(pubDate.getTime()) ? date : pubDate.toLocaleString()
  }

  return (
    <Card className="feed-card">
      <Card.Body>
        <Link to={item.link} target="_blank" rel="noopener noreferrer">
          <Card.Title>{item.title}</Card.Title>
        </Link>
        <Card.Subtitle>
          {formatDate(item.pubDate)}
          {item.author !== '' ? ` by ${item.author}` : ''}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

interface Props {
  title: string
  homepage: string
  isDarkMode: boolean
  items: RSSItem[]
  isLoading: boolean
}

const SiteFeed: FC<Props> = ({ title, homepage, isDarkMode, items, isLoading }) => (
  <Fragment>
    <div className="feed-header">
      <h1>
        <Link
          className="title-link"
          to={homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </Link>
      </h1>
    </div>
    {isLoading
      ? (<div className="loading-spinner"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>)
      : (Array.isArray(items) && items.slice(0, 6).map((item) => <FeedCard key={item.link} item={item} />))
      }
  </Fragment>
)

export default SiteFeed
