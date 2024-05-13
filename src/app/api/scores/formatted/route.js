import { Client } from '@notionhq/client'

// Constants

const points = {
  A: 100,
  B: 40,
  C: 15,
  D: 80,
}

// Functions

async function getCharacters() {
  const client = new Client({ auth: process.env.NOTION_KEY })
  const database = await client.databases.query({ database_id: process.env.NOTION_PAGE_ID })

  return database.results.map((result) => {
    const name = result.properties.name.title[0].plain_text
    const rank = result.properties.ranking.select.name
    const character = { name, rank }

    return character
  })
}

async function getRawFriends() {
  const client = new Client({ auth: process.env.GMN_KEY })
  const database = await client.databases.query({ database_id: process.env.GMN_PAGE_ID })

  return database.results.map((result) => {
    const { A, B, C, D } = result.properties
    const tierA = A.multi_select.map(({ name }) => ({ name, rank: 'Fort probable' }))
    const tierB = B.multi_select.map(({ name }) => ({ name, rank: 'Envisageable' }))
    const tierC = C.multi_select.map(({ name }) => ({ name, rank: 'Mouais' }))
    const tierD = D.multi_select.map(({ name }) => ({ name, rank: 'Hors de question !' }))

    return {
      name: result.properties.name.rich_text[0].plain_text,
      characters: tierA.concat(tierB, tierC, tierD),
    }
  })
}

function computeScores(refs, friends) {
  return friends
    .map((friend) => {
      let totalA = 0
      let totalB = 0
      let totalC = 0
      let totalD = 0
      let bonus = 0

      friend.characters.forEach((character) => {
        const { rank } = refs.find((ref) => ref.name === character.name)
        if (rank === character.rank) {
          switch (rank) {
            case 'Fort probable':
              totalA++
              if (character.name === 'Nova') {
                bonus += 10 * points.A
              }
              if (character.name === 'Solanum') {
                bonus += 3 * points.A
              }
              break

            case 'Envisageable':
              totalB++
              break

            case 'Mouais':
              totalC++
              break

            case 'Hors de question !':
              totalD++
              if (character.name === 'Jessie') {
                bonus += 3 * points.D
              }
              break
          }
        }
      })

      const total =
        totalA * points.A + totalB * points.B + totalC * points.C + totalD * points.D + bonus

      return { name: friend.name, totalA, totalB, totalC, totalD, bonus, total }
    })
    .sort((a, b) => {
      if (a.total < b.total) return 1
      if (a.total > b.total) return -1
      return 0
    })
}

// REST

export async function GET() {
  const characters = await getCharacters()
  const friends = await getRawFriends()
  const scores = computeScores(characters, friends)
  const bonus = [
    { name: 'Nova', points: 10 * points.A, why: '1er prénom' },
    { name: 'Solanum', points: 3 * points.A, why: '2nd prénom' },
    { name: 'Jessie', points: 3 * points.D, why: 'Une de mes ex 🤯' },
  ]

  return Response.json({ characters, scores, points, bonus })
}
