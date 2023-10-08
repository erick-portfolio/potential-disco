import React, { useEffect, useState } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';

import './Schedule.css';

interface ScheduleProps {
  isDarkMode: boolean;
}

export function Schedule({ isDarkMode }: ScheduleProps) {
  const [footballData, setFootballData] = useState<any>(null);
  const [basketballData, setBasketballData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('football');

  useEffect(() => {
    // Fetch football data
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/ncsu/schedule')
      .then((response) => response.json())
      .then((data) => setFootballData(data))
      .catch((error) => console.error('Error fetching football data:', error));

    // Fetch basketball data
    fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/152/schedule')
      .then((response) => response.json())
      .then((data) => setBasketballData(data))
      .catch((error) => console.error('Error fetching basketball data:', error));
  }, []);

  if (footballData === null || basketballData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`mt-5 ${isDarkMode ? 'dark' : 'light'}`} id="schedule">
      <h1>NC State Schedules</h1>
      <Tabs
        id="schedule-tabs"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || 'football')}
      >
        <Tab eventKey="football" title="Football">
          <div>
            {footballData.events.length === 0 ? (
              <div className="schedule-message">Schedule will be updated soon.</div>
            ) : (
              footballData.events.map((event: any) => (
                <Card key={event.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{event.shortName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(event.date).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text>
                      {event.competitions[0]?.competitors[0]?.score?.value !== undefined
                        ? `${event.competitions[0].competitors[0].score.value} - `
                        : ''}
                      {event.competitions[0]?.competitors[1]?.score?.value !== undefined
                        ? event.competitions[0].competitors[1].score.value
                        : ''}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Tab>
        <Tab eventKey="basketball" title="Basketball">
          <div>
            {basketballData.events.length === 0 ? (
              <div className="schedule-message">Schedule will be updated soon.</div>
            ) : (
              basketballData.events.map((event: any) => (
                <Card key={event.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{event.shortName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(event.date).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text>
                      {event.competitions[0]?.competitors[0]?.score?.value !== undefined
                        ? `${event.competitions[0].competitors[0].score.value} - `
                        : ''}
                      {event.competitions[0]?.competitors[1]?.score?.value !== undefined
                        ? event.competitions[0].competitors[1].score.value
                        : ''}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Schedule;
