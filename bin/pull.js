import { Client } from '@notionhq/client'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Runtime                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

const notion = new Client({ auth: process.env.NOTION_KEY })
const db = await notion.databases.query({
  database_id: process.env.NOTION_PAGE_ID,
  sorts: [
    {
      property: "name",
      direction: "ascending"
    }
  ]
  // filter: {
  //   property: "image",
  //   rich_text: {
  //     is_not_empty: true
  //   }
  // }
})
const results = db.results.map((result) => {
  const name = result.properties.name.title[0].plain_text
  return { name }
})
Bun.write('./src/app/data.json', JSON.stringify(results, null, 2))
