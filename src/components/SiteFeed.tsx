import React, { Fragment } from 'react'
import type { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export interface Article {
  title: string
  link: string
  pubDate: string
  author: string | string[]
}

interface FeedCardProps {
  item: Article
}

const FeedCard: FC<FeedCardProps> = ({ item }) => {
  const formatDate = (date: string): string => {
    const pubDate = new Date(date)
    return isNaN(pubDate.getTime()) ? date : pubDate.toLocaleString()
  }

  const formatAuthors = (authors: string | string[]): string => {
    if (typeof authors === 'string') {
      return authors
    }
    if (Array.isArray(authors)) {
      return authors.join(', ').replace(/, ([^,]*)$/, ' and $1')
    }
    return ''
  }

  return (
    <Card className="feed-card">
      <Card.Body>
        <Link to={item.link} target="_blank" rel="noopener noreferrer">
          <Card.Title>{item.title}</Card.Title>
        </Link>
        <Card.Subtitle>
          {formatDate(item.pubDate)}
          {item.author !== '' ? ` by ${formatAuthors(item.author)}` : ''}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

interface SiteFeedProps {
  title: string
  homepage: string
  isDarkMode: boolean
  items: Article[]
}

const SiteFeed: FC<SiteFeedProps> = ({ title, homepage, isDarkMode, items }) => (
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
    {Array.isArray(items) && items.slice(0, 6).map((item, index) => (
      <FeedCard key={index} item={item} />
    ))}
  </Fragment>
)

export default SiteFeed
