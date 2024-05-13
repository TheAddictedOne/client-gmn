import { Client } from '@notionhq/client'

export async function GET(res) {
  const refClient = new Client({ auth: process.env.NOTION_KEY })
  const refDB = await refClient.databases.query({
    database_id: process.env.NOTION_PAGE_ID,
  })
  const refs = {}
  refDB.results.forEach((result) => {
    const name = result.properties.name.title[0].plain_text
    const ranking = result.properties.ranking.select.name
    // const multiplier = ['Nova', 'Solanum', 'Jessie'].includes(name) ? 3 : 1

    if (ranking === 'Fort probable') {
      refs[name] = { A: 5, B: 3, C: 0, D: -2 }
      return
    }
    if (ranking === 'Envisageable') {
      refs[name] = { A: 2, B: 4, C: 1, D: -1 }
      return
    }
    if (ranking === 'Mouais') {
      refs[name] = { A: 0, B: 1, C: 2, D: 1 }
      return
    }
    if (ranking === 'Hors de question !') {
      refs[name] = { A: -2, B: -1, C: 1, D: 3 }
      return
    }
  })

  const friendsClient = new Client({ auth: process.env.GMN_KEY })
  const friendsDB = await friendsClient.databases.query({
    database_id: process.env.GMN_PAGE_ID,
    sorts: [
      {
        property: 'name',
        direction: 'ascending',
      },
    ],
  })
  const friendsFormatted = friendsDB.results.map((result) => {
    return {
      name: result.properties.name.rich_text[0].plain_text,
      A: result.properties.A.multi_select.map((character) => character.name),
      B: result.properties.A.multi_select.map((character) => character.name),
      C: result.properties.A.multi_select.map((character) => character.name),
      D: result.properties.A.multi_select.map((character) => character.name),
    }
  })

  const users = getTotal()

  const characters = Object.entries(refs)
    .map(([name, value]) => {
      return {
        name,
        A: value.A,
        B: value.B,
        C: value.C,
        D: value.D,
      }
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })

  return Response.json({ users, characters })

  function getTotal() {
    const totals = []
    friendsFormatted.forEach((friend) => {
      let score = 0
      friend.A.forEach((name) => (score += refs[name].A))
      friend.B.forEach((name) => (score += refs[name].B))
      friend.C.forEach((name) => (score += refs[name].C))
      friend.D.forEach((name) => (score += refs[name].D))
      totals.push({ name: friend.name, score })
    })
    return totals.sort((a, b) => {
      if (a.score < b.score) return 1
      if (a.score > b.score) return -1
      return 0
    })
  }
}
