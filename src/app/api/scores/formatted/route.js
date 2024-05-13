import { Client } from '@notionhq/client'

// Constants

const multipliers = [
  { name: 'Nova', multiplier: 3, why: '1er prénom' },
  { name: 'Solanum', multiplier: 2, why: '2nd prénom' },
  { name: 'Jessie', multiplier: 2, why: 'Une de mes ex 🤯' },
]

const points = [
  { name: 'Fort probable', A: 100, B: 25, C: 0, D: -50 },
  { name: 'Envisageable', A: 25, B: 50, C: 25, D: -25 },
  { name: 'Mouais', A: 0, B: 25, C: 50, D: 25 },
  { name: 'Hors de question !', A: -50, B: -25, C: 0, D: 50 },
]

// Functions

async function getCharacters() {
  const client = new Client({ auth: process.env.NOTION_KEY })
  const database = await client.databases.query({ database_id: process.env.NOTION_PAGE_ID })
  const pointsWithKey = points.reduce((prev, { name, A, B, C, D }) => {
    prev[name] = { A, B, C, D }
    return prev
  }, {})

  return database.results.map((result) => {
    const name = result.properties.name.title[0].plain_text
    const ranking = result.properties.ranking.select.name

    return { name, ...pointsWithKey[ranking] }
  })
}

async function getFriends() {
  const client = new Client({ auth: process.env.GMN_KEY })
  const database = await client.databases.query({ database_id: process.env.GMN_PAGE_ID })

  return database.results.map((result) => {
    return {
      name: result.properties.name.rich_text[0].plain_text,
      A: result.properties.A.multi_select.map((character) => character.name),
      B: result.properties.A.multi_select.map((character) => character.name),
      C: result.properties.A.multi_select.map((character) => character.name),
      D: result.properties.A.multi_select.map((character) => character.name),
      multipliers: [
        ...multipliers,
        { name: result.properties.top.select.name, multiplier: 2, why: 'Votre top pick' },
      ],
    }
  })
}

function computeScores(characters, friends) {
  const charactersWithKey = characters.reduce((prev, { name, A, B, C, D }) => {
    prev[name] = { A, B, C, D }
    return prev
  }, {})

  return friends
    .map((friend) => {
      let score = 0
      friend.A.forEach((name) => (score += charactersWithKey[name].A * getMultiplier(friend, name)))
      friend.B.forEach((name) => (score += charactersWithKey[name].B * getMultiplier(friend, name)))
      friend.C.forEach((name) => (score += charactersWithKey[name].C * getMultiplier(friend, name)))
      friend.D.forEach((name) => (score += charactersWithKey[name].D * getMultiplier(friend, name)))
      return { name: friend.name, score }
    })
    .sort((a, b) => {
      if (a.score < b.score) return 1
      if (a.score > b.score) return -1
      return 0
    })
}

function getMultiplier(friend, name) {
  return friend.multipliers.reduce((prev, m) => {
    return m.name === name ? prev * m.multiplier : prev
  }, 1)
}

// REST

export async function GET() {
  const characters = await getCharacters()
  const friends = await getFriends()
  const scores = computeScores(characters, friends)

  return Response.json({ characters, friends, scores, multipliers, points })
}
