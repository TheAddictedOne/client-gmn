import { Client } from '@notionhq/client'

// Constants

const table = [
  { name: 'Fort probable', A: 100, B: 30, C: 0, D: -50 },
  { name: 'Envisageable', A: 20, B: 40, C: 0, D: -30 },
  { name: 'Mouais', A: 0, B: 0, C: 15, D: 0 },
  { name: 'Hors de question !', A: -40, B: -20, C: 0, D: 80 },
]

// Functions

async function getCharacters() {
  const client = new Client({ auth: process.env.NOTION_KEY })
  const database = await client.databases.query({ database_id: process.env.NOTION_PAGE_ID })

  return database.results.map((result) => {
    const name = result.properties.name.title[0].plain_text
    const ranking = result.properties.ranking.select.name
    const { A, B, C, D } = table.find((row) => row.name === ranking)

    const character = { name, A, B, C, D, multiplier: 1 }

    if (name === 'Nova') return { ...character, multiplier: 5, why: '1er prénom' }
    if (name === 'Solanum') return { ...character, multiplier: 3, why: '2nd prénom' }
    if (name === 'Jessie') return { ...character, multiplier: 3, why: 'Une de mes ex 🤯' }

    return character
  })
}

async function getFriends() {
  const client = new Client({ auth: process.env.GMN_KEY })
  const database = await client.databases.query({ database_id: process.env.GMN_PAGE_ID })

  return database.results.map((result) => {
    return {
      name: result.properties.name.rich_text[0].plain_text,
      A: result.properties.A.multi_select.map(({ name }) => name),
      B: result.properties.A.multi_select.map(({ name }) => name),
      C: result.properties.A.multi_select.map(({ name }) => name),
      D: result.properties.A.multi_select.map(({ name }) => name),
    }
  })
}

function computeScores(characters, friends) {
  return friends
    .map((friend) => {
      let score = 0
      friend.A.forEach((name) => {
        const { A, multiplier } = characters.find((character) => character.name === name)
        score += A * multiplier
      })
      friend.B.forEach((name) => {
        const { B, multiplier } = characters.find((character) => character.name === name)
        score += B * multiplier
      })
      friend.C.forEach((name) => {
        const { C, multiplier } = characters.find((character) => character.name === name)
        score += C * multiplier
      })
      friend.D.forEach((name) => {
        const { D, multiplier } = characters.find((character) => character.name === name)
        score += D * multiplier
      })
      return { name: friend.name, score }
    })
    .sort((a, b) => {
      if (a.score < b.score) return 1
      if (a.score > b.score) return -1
      return 0
    })
}

// REST

export async function GET() {
  const characters = await getCharacters()
  const friends = await getFriends()
  const scores = computeScores(characters, friends)

  return Response.json({ characters, scores, table })
}
