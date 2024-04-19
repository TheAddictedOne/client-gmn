import { Client } from '@notionhq/client'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Runtime                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

const notion = new Client({ auth: process.env.NOTION_KEY })
const db = await notion.databases.query({
  database_id: process.env.NOTION_PAGE_ID
})
Bun.write('.discover.json', JSON.stringify(db, null, 2))

