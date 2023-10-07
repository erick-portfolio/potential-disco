import { Fragment } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowClockwise } from 'react-bootstrap-icons';

import { RSSItem } from './types';

import './RSS.css';

interface Props {
  title: string;
  homepage: string;
  isDarkMode: boolean;
  items: RSSItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

function SiteFeed({
  title,
  homepage,
  isDarkMode,
  items,
  isLoading,
  onRefresh  
}: Props) {

  const handleRefresh = () => {
    onRefresh();
  };
  
  const formatDate = (date: string) => {
    const pubDate = new Date(date);
    return isNaN(pubDate.getTime()) ? date : pubDate.toLocaleString();
  }

  const FeedCard = ({ item }: { item: RSSItem }) => (
    <Card className="feed-card">
      <Card.Body>
      <Link
      to={item.link}
      >
        <Card.Title>{item.title}</Card.Title>
        </Link>
        <Card.Subtitle>
          {formatDate(item.pubDate)}
          {item.author && <span> by {item.author}</span>}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );

  return (
    <Fragment>

      <div className="feed-header">
        <h1>
          <div className="row">
            <div className="col-10">
              <Link 
                className="title-link"
                to={homepage}
              >
                {title}
              </Link>
            </div>

            <div className="col-2">
              <Button 
                variant={isDarkMode ? 'dark' : 'light'}
                className="refresh-btn"
                onClick={handleRefresh}
              >
                <ArrowClockwise />
              </Button>
            </div>
          </div>
        </h1>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        items.slice(0,6).map(item => (
          <FeedCard 
            key={item.link}
            item={item}
          />
        ))
      )}

    </Fragment>
  );
}

export default SiteFeed;
