import React, { useEffect, useState } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './Schedule.css';

interface ScheduleProps {
  isDarkMode: boolean;
}

interface IRootObject {
  timestamp: string;
  status: string;
  season: ISeason;
  team: ITeam;
  events: IEventsItem[];
  requestedSeason: IRequestedSeason;
}
interface ISeason {
  year: number;
  type?: number;
  name?: string;
  displayName: string;
  half?: number;
}
interface ITeam {
  id: string;
  abbreviation: string;
  location: string;
  name?: string;
  displayName: string;
  clubhouse?: string;
  color?: string;
  logo?: string;
  recordSummary?: string;
  seasonSummary?: string;
  standingSummary?: string;
  groups?: IGroups;
  nickname?: string;
  shortDisplayName?: string;
  logos?: ILogosItem[];
  links?: ILinksItem[];
}
interface IGroups {
  id: string;
  parent: IParent;
  isConference: boolean;
}
interface IParent {
  id: string;
}
interface IEventsItem {
  id: string;
  date: string;
  name: string;
  shortName: string;
  season: ISeason;
  seasonType: ISeasonType;
  week: IWeek;
  timeValid: boolean;
  competitions: ICompetitionsItem[];
  links: ILinksItem[];
}
interface ISeasonType {
  id: string;
  type: number;
  name: string;
  abbreviation: string;
}
interface IWeek {
  number: number;
  text: string;
}
interface ICompetitionsItem {
  id: string;
  date: string;
  attendance: number;
  type: IType;
  timeValid: boolean;
  neutralSite: boolean;
  boxscoreAvailable: boolean;
  ticketsAvailable: boolean;
  venue: IVenue;
  competitors: ICompetitorsItem[];
  notes: any[];
  broadcasts: IBroadcastsItem[];
  status: IStatus;
  tickets?: ITicketsItem[];
}
interface IType {
  id: string;
  text?: string;
  abbreviation?: string;
  slug?: string;
  type?: string;
  shortName?: string;
  name?: string;
  state?: string;
  completed?: boolean;
  description?: string;
  detail?: string;
  shortDetail?: string;
}
interface IVenue {
  fullName: string;
  address: IAddress;
}
interface IAddress {
  city: string;
  state: string;
  zipCode: string;
}
interface ICompetitorsItem {
  id: string;
  type: string;
  order: number;
  homeAway: string;
  winner?: boolean;
  team: ITeam;
  score?: IScore;
  record?: IRecordItem[];
  curatedRank: ICuratedRank;
  leaders?: ILeadersItem[];
}
interface ILogosItem {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel: string[];
  lastUpdated: string;
}
interface ILinksItem {
  rel: string[];
  href: string;
  text?: string;
  language?: string;
  shortText?: string;
  isExternal?: boolean;
  isPremium?: boolean;
}
interface IScore {
  value: number;
  displayValue: string;
}
interface IRecordItem {
  id: string;
  abbreviation?: string;
  displayName: string;
  shortDisplayName: string;
  description: string;
  type: string;
  displayValue: string;
}
interface ICuratedRank {
  current: number;
}
interface ILeadersItem {
  name?: string;
  displayName?: string;
  abbreviation?: string;
  leaders?: ILeadersItem[];
  displayValue?: string;
  value?: number;
  athlete?: IAthlete;
}
interface IAthlete {
  id: string;
  lastName: string;
  displayName: string;
  shortName: string;
  links: ILinksItem[];
}
interface IBroadcastsItem {
  type: IType;
  market: IMarket;
  media: IMedia;
  lang: string;
  region: string;
}
interface IMarket {
  id: string;
  type: string;
}
interface IMedia {
  shortName: string;
}
interface IStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: IType;
}
interface ITicketsItem {
  id: string;
  summary: string;
  description: string;
  maxPrice: number;
  startingPrice: number;
  numberAvailable: number;
  totalPostings: number;
  links: ILinksItem[];
}
interface IRequestedSeason {
  year: number;
  type: number;
  name: string;
  displayName: string;
}

function EventCard({ event, isNextGame }: { event: IEventsItem; isNextGame: boolean }) {
  return (
    <Card key={event.id} className={`mb-3 ${isNextGame ? 'active' : ''}`}>
      <Card.Body>
        <Card.Title>
          <Link to={event.links[0]?.href} target="_blank" rel="noopener noreferrer">
            {event.shortName}
          </Link>
        </Card.Title>
        <Card.Text className="mb-2 text-muted">
          <strong>Date: </strong>
          {new Date(event.date).toLocaleString()}
        </Card.Text>
        <Card.Text>
          <strong>Score: </strong>
          {event.competitions[0]?.competitors[0]?.team.abbreviation}{' '}
          {event.competitions[0]?.competitors[0]?.score?.value
            ? event.competitions[0]?.competitors[0]?.score?.value
            : 0}{' '}
          -{' '}
          {event.competitions[0]?.competitors[1]?.team.abbreviation}{' '}
          {event.competitions[0]?.competitors[1]?.score?.value
            ? event.competitions[0]?.competitors[0]?.score?.value
            : 0}
        </Card.Text>
        <Card.Text>
          <strong>Venue:</strong> {event.competitions[0]?.venue?.fullName || 'N/A'}
        </Card.Text>
        <Card.Text>
          <strong>Attendance:</strong> {event.competitions[0]?.attendance || 'N/A'}
        </Card.Text>
        <Card.Text>
          <strong>TV Broadcast:</strong>{' '}
          {event.competitions[0].broadcasts[0]?.media.shortName || 'N/A'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function ScheduleTab({
  events,
  showPreviousGames,
  toggleShowPreviousGames,
  isDarkMode,
}: {
  events: IEventsItem[];
  showPreviousGames: boolean;
  toggleShowPreviousGames: () => void;
  isDarkMode: boolean;
}) {
  const currentDate = new Date();

  const filterEvents = (events: IEventsItem[]) => {
    let nextGameFound = false;
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      if (showPreviousGames) {
        return true;
      }
      if (!nextGameFound && eventDate >= currentDate) {
        nextGameFound = true;
        return true;
      }
      return false;
    });
  };

  const filteredEvents = filterEvents(events);

  return (
    <div>
      {filteredEvents.length !== 0 ? (
        <button
          className={`btn btn-outline-${isDarkMode ? 'light' : 'dark'}`}
          onClick={toggleShowPreviousGames}
        >
          {showPreviousGames ? 'Show Current Game' : 'Show All Games'}
        </button>
      ) : ("")}
      {filteredEvents.length === 0 ? (
        <div className="schedule-message">No upcoming games.</div>
      ) : (
        filteredEvents.map((event: IEventsItem, index) => (
          <div>
            <EventCard event={event} key={event.id} isNextGame={index === 0} />
          </div>
        ))
      )}
    </div>
  );
}

export function Schedule({ isDarkMode }: ScheduleProps) {
  const [footballSchedule, setFootballSchedule] = useState<IRootObject | null>(null);
  const [basketballSchedule, setBasketballSchedule] = useState<IRootObject | null>(null);
  const [activeTab, setActiveTab] = useState<string>('football');
  const [showPreviousFootballGames, setShowPreviousFootballGames] = useState(false);
  const [showPreviousBasketballGames, setShowPreviousBasketballGames] = useState(false);

  useEffect(() => {
    // Fetch football data
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/ncsu/schedule')
      .then((response) => response.json())
      .then((data: IRootObject) => setFootballSchedule(data))
      .catch((error) => console.error('Error fetching football data:', error));

    // Fetch basketball data
    fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/152/schedule')
      .then((response) => response.json())
      .then((data: IRootObject) => setBasketballSchedule(data))
      .catch((error) => console.error('Error fetching basketball data:', error));
  }, []);

  if (footballSchedule === null || basketballSchedule === null) {
    return <div>Loading...</div>;
  }

  const toggleShowPreviousFootballGames = () => {
    setShowPreviousFootballGames(!showPreviousFootballGames);
  };

  const toggleShowPreviousBasketballGames = () => {
    setShowPreviousBasketballGames(!showPreviousBasketballGames);
  };

  return (
    <div className={`mt-5 ${isDarkMode ? 'dark' : 'light'}`} id="schedule">
      <h1>NC State Schedules</h1>
      <Tabs
        id="schedule-tabs"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || 'football')}
      >
        <Tab eventKey="football" title="Football">
          <ScheduleTab
            events={footballSchedule.events}
            showPreviousGames={showPreviousFootballGames}
            toggleShowPreviousGames={toggleShowPreviousFootballGames}
            isDarkMode={isDarkMode}
          />
        </Tab>
        <Tab eventKey="basketball" title="Basketball">
          <ScheduleTab
            events={basketballSchedule.events}
            showPreviousGames={showPreviousBasketballGames}
            toggleShowPreviousGames={toggleShowPreviousBasketballGames}
            isDarkMode={isDarkMode}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Schedule;