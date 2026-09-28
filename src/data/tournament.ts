export interface Tournament {
  id: string
  titleIntro: string
  titleMain: string
  date: string
  dateLabel: string
  venue: string
  teeTime: string | null
  registrationLabel: string
}

// Replace this seed with fetched data; use null while the request is pending.
export const featuredTournament: Tournament = {
  id: 'cat-on-the-green-2026',
  titleIntro: 'Cat on the',
  titleMain: 'GREEN.',
  date: '2026-12-10',
  dateLabel: 'Thursday, December 10, 2026',
  venue: 'Northwoods Golf Club',
  teeTime: null,
  registrationLabel: 'Register today!',
}
