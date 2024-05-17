import { Client } from '@notionhq/client'

export async function POST(req) {
  return Response.json({ KO: 'Not possible anymore' })

  const body = await req.json()

  const notion = new Client({ auth: process.env.GMN_KEY })

  try {
    const page = await notion.databases.query({
      database_id: process.env.GMN_PAGE_ID,
      filter: {
        property: 'uuid',
        rich_text: {
          equals: body.uuid,
        },
      },
    })

    if (page.results.length) {
      const id = page.results[0].id
      await notion.pages.update({
        page_id: id,
        properties: {
          name: {
            rich_text: [
              {
                text: { content: body.name },
              },
            ],
          },
          A: {
            multi_select: body.A.map((name) => {
              return { name }
            }),
          },
          B: {
            multi_select: body.B.map((name) => {
              return { name }
            }),
          },
          C: {
            multi_select: body.C.map((name) => {
              return { name }
            }),
          },
          D: {
            multi_select: body.D.map((name) => {
              return { name }
            }),
          },
        },
      })
      return Response.json({ status: 'UPDATE' })
    } else {
      const response = await notion.pages.create({
        parent: { database_id: process.env.GMN_PAGE_ID },
        properties: {
          uuid: {
            title: [
              {
                text: { content: body.uuid },
              },
            ],
          },
          name: {
            rich_text: [
              {
                text: {
                  content: body.name,
                },
              },
            ],
          },
          A: {
            multi_select: body.A.map((name) => {
              return { name }
            }),
          },
          B: {
            multi_select: body.B.map((name) => {
              return { name }
            }),
          },
          C: {
            multi_select: body.C.map((name) => {
              return { name }
            }),
          },
          D: {
            multi_select: body.D.map((name) => {
              return { name }
            }),
          },
        },
      })
      return Response.json({ status: 'CREATE' })
    }
  } catch ({ code, message, status }) {
    // https://developers.notion.com/reference/errors
    return Response.json({ code, message, status })
  }
}
