import { Client } from '@notionhq/client'

export async function GET(res) {
  const notion = new Client({ auth: process.env.GMN_KEY })
  const db = await notion.databases.query({
    database_id: process.env.GMN_PAGE_ID,
    sorts: [
      {
        property: 'name',
        direction: 'ascending',
      },
    ],
    // filter: {
    //   property: "image",
    //   rich_text: {
    //     is_not_empty: true
    //   }
    // }
  })
  return Response.json(db)
}
