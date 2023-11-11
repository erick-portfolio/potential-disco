import React, { useEffect, useState } from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Schedule.css'

interface ScheduleProps {
  isDarkMode: boolean
}

interface IRootObject {
  timestamp: string
  status: string
  season: ISeason
  team: ITeam
  events: IEventsItem[]
  requestedSeason: IRequestedSeason
}
interface ISeason {
  year: number
  type?: number
  name?: string
  displayName: string
  half?: number
}
interface ITeam {
  id: string
  abbreviation: string
  location: string
  name?: string
  displayName: string
  clubhouse?: string
  color?: string
  logo?: string
  recordSummary?: string
  seasonSummary?: string
  standingSummary?: string
  groups?: IGroups
  nickname?: string
  shortDisplayName?: string
  logos?: ILogosItem[]
  links?: ILinksItem[]
}
interface IGroups {
  id: string
  parent: IParent
  isConference: boolean
}
interface IParent {
  id: string
}
interface IEventsItem {
  id: string
  date: string
  name: string
  shortName: string
  season: ISeason
  seasonType: ISeasonType
  week: IWeek
  timeValid: boolean
  competitions: ICompetitionsItem[]
  links: ILinksItem[]
}
interface ISeasonType {
  id: string
  type: number
  name: string
  abbreviation: string
}
interface IWeek {
  number: number
  text: string
}
interface ICompetitionsItem {
  id: string
  date: string
  attendance: number
  type: IType
  timeValid: boolean
  neutralSite: boolean
  boxscoreAvailable: boolean
  ticketsAvailable: boolean
  venue: IVenue
  competitors: ICompetitorsItem[]
  notes: any[]
  broadcasts: IBroadcastsItem[]
  status: IStatus
  tickets?: ITicketsItem[]
}
interface IType {
  id: string
  text?: string
  abbreviation?: string
  slug?: string
  type?: string
  shortName?: string
  name?: string
  state?: string
  completed?: boolean
  description?: string
  detail?: string
  shortDetail?: string
}
interface IVenue {
  fullName: string
  address: IAddress
}
interface IAddress {
  city: string
  state: string
  zipCode: string
}
interface ICompetitorsItem {
  id: string
  type: string
  order: number
  homeAway: string
  winner?: boolean
  team: ITeam
  score?: IScore
  record?: IRecordItem[]
  curatedRank: ICuratedRank
  leaders?: ILeadersItem[]
}
interface ILogosItem {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}
interface ILinksItem {
  rel: string[]
  href: string
  text?: string
  language?: string
  shortText?: string
  isExternal?: boolean
  isPremium?: boolean
}
interface IScore {
  value: number
  displayValue: string
}
interface IRecordItem {
  id: string
  abbreviation?: string
  displayName: string
  shortDisplayName: string
  description: string
  type: string
  displayValue: string
}
interface ICuratedRank {
  current: number
}
interface ILeadersItem {
  name?: string
  displayName?: string
  abbreviation?: string
  leaders?: ILeadersItem[]
  displayValue?: string
  value?: number
  athlete?: IAthlete
}
interface IAthlete {
  id: string
  lastName: string
  displayName: string
  shortName: string
  links: ILinksItem[]
}
interface IBroadcastsItem {
  type: IType
  market: IMarket
  media: IMedia
  lang: string
  region: string
}
interface IMarket {
  id: string
  type: string
}
interface IMedia {
  shortName: string
}
interface IStatus {
  clock: number
  displayClock: string
  period: number
  type: IType
}
interface ITicketsItem {
  id: string
  summary: string
  description: string
  maxPrice: number
  startingPrice: number
  numberAvailable: number
  totalPostings: number
  links: ILinksItem[]
}
interface IRequestedSeason {
  year: number
  type: number
  name: string
  displayName: string
}
function EventCard ({ event, isNextGame }: { event: IEventsItem, isNextGame: boolean }): React.ReactElement {
  const scoreComp1 = event.competitions[0]?.competitors[0]?.score?.value ?? 0
  const scoreComp2 = event.competitions[0]?.competitors[1]?.score?.value ?? 0
  const venue = event.competitions[0]?.venue?.fullName ?? 'N/A'
  const attendance = event.competitions[0]?.attendance?.toString() ?? 'N/A'
  const broadcast = event.competitions[0]?.broadcasts[0]?.media?.shortName ?? 'N/A'

  return (
    <Card key={event.id} className={`mb-3 ${isNextGame ? 'active' : ''}`}>
      <Card.Body>
        <Card.Title>
          <Link to={event.links[0]?.href ?? '#'} target='_blank' rel='noopener noreferrer'>
            {event.shortName}
          </Link>
        </Card.Title>
        <Card.Text className='mb-2'>
          <strong>Date: </strong>
          {new Date(event.date).toLocaleString()}
        </Card.Text>
        <Card.Text>
          <strong>Score: </strong>
          {`${event.competitions[0]?.competitors[0]?.team.abbreviation} ${scoreComp1} - ${event.competitions[0]?.competitors[1]?.team.abbreviation} ${scoreComp2}`}
        </Card.Text>
        <Card.Text>
          <strong>Venue:</strong> {venue}
        </Card.Text>
        <Card.Text>
          <strong>Attendance:</strong> {attendance}
        </Card.Text>
        <Card.Text>
          <strong>TV Broadcast:</strong> {broadcast}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

function ScheduleTab ({
  events,
  showPreviousGames,
  toggleShowPreviousGames,
  isDarkMode
}: {
  events: IEventsItem[]
  showPreviousGames: boolean
  toggleShowPreviousGames: () => void
  isDarkMode: boolean
}): React.ReactElement {
  const currentDate = new Date()

  const filterEvents = (events: IEventsItem[]): IEventsItem[] => {
    let nextGameFound = false
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      if (showPreviousGames) {
        return true
      }
      if (!nextGameFound && eventDate >= currentDate) {
        nextGameFound = true
        return true
      }
      return false
    })
  }

  const filteredEvents = filterEvents(events)

  return (
    <div>
      {filteredEvents.length === 0
        ? (<div className='schedule-message'>No upcoming games.</div>)
        : (filteredEvents.map((event, index) => (
          <div key={event.id}>
            <EventCard event={event} isNextGame={index === 0} />
          </div>
          )))
      }
    </div>
  )
}

export function Schedule ({ isDarkMode }: ScheduleProps): React.ReactElement {
  const [footballSchedule, setFootballSchedule] = useState<IRootObject | null>(null)
  const [basketballSchedule, setBasketballSchedule] = useState<IRootObject | null>(null)
  const [activeTab, setActiveTab] = useState<string>('football')
  const [showPreviousFootballGames, setShowPreviousFootballGames] = useState(false)
  const [showPreviousBasketballGames, setShowPreviousBasketballGames] = useState(false)

  useEffect(() => {
    const fetchFootballData = async (): Promise<void> => {
      try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/ncsu/schedule')
        const data = await response.json()
        setFootballSchedule(data)
      } catch (error) {
        console.error('Error fetching football data:', error)
      }
    }

    const fetchBasketballData = async (): Promise<void> => {
      try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/152/schedule')
        const data = await response.json()
        setBasketballSchedule(data)
      } catch (error) {
        console.error('Error fetching basketball data:', error)
      }
    }

    void fetchFootballData()
    void fetchBasketballData()
  }, [])

  const toggleShowPreviousFootballGames = (): void => {
    setShowPreviousFootballGames(!showPreviousFootballGames)
  }

  const toggleShowPreviousBasketballGames = (): void => {
    setShowPreviousBasketballGames(!showPreviousBasketballGames)
  }

  return (
    <div className={`mt-5 ${isDarkMode ? 'dark' : 'light'}`} id='schedule'>
      <h1>NC State Schedules</h1>
      <Tabs
        id='schedule-tabs'
        activeKey={activeTab}
        onSelect={(key) => { setActiveTab(key ?? 'football') }}
      >
        <Tab eventKey='football' title='Football'>
          <ScheduleTab
            events={footballSchedule?.events ?? []}
            showPreviousGames={showPreviousFootballGames}
            toggleShowPreviousGames={toggleShowPreviousFootballGames}
            isDarkMode={isDarkMode}
          />
        </Tab>
        <Tab eventKey='basketball' title='Basketball'>
          <ScheduleTab
            events={basketballSchedule?.events ?? []}
            showPreviousGames={showPreviousBasketballGames}
            toggleShowPreviousGames={toggleShowPreviousBasketballGames}
            isDarkMode={isDarkMode}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Schedule
