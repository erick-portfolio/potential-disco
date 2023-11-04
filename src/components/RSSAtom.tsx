import { useState, useEffect } from 'react';

import { fetchFeed, parseFeed } from './feedUtils';
import SiteFeed from './SiteFeed'; 
import { RSSItem as Item } from './types';


interface Props {
  url: string;
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function RSSAtom({ url, title, homepage, isDarkMode }: Props) {

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const xml = await fetchFeed(url);
      const newItems = await parseFeed(xml);
      setItems(newItems);
      setIsLoading(false);
    } catch (error) {
      // handle error
    }
  }

  useEffect(() => {
    fetchData();
  }, [url])

  const handleRefresh = async () => {

    setIsLoading(true);

    try {
      const xml = await fetchFeed(url);
      const newItems = await parseFeed(xml);
      setItems(newItems);
    } catch (error) {
      // handle error 
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <SiteFeed
      key={title}  
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={handleRefresh} 
    />
  );

}

export default RSSAtom;
