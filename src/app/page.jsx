'use client'

import WS from '@/components/ws.js'
import Header from '@/components/Header.jsx'
import Section from '@/components/Section.jsx'
import Backlog from '@/components/Backlog.jsx'
import { getItem, getUUID } from '@/utils/helpers.js'
import { useEffect, useState } from 'react'

const Page = () => {
  const ws = WS()
  const uuid = getUUID()
  const [tierA, setTierA] = useState(getItem('A'))
  const [tierB, setTierB] = useState(getItem('B'))
  const [tierC, setTierC] = useState(getItem('C'))
  const [tierD, setTierD] = useState(getItem('D'))
  const [backlog, setBacklog] = useState(getItem('Backlog'))
  const [dragElement, setDragElement] = useState({ name: null, source: null, destination: null })

  useEffect(() => {
    const { name, source, destination } = dragElement
    if (!name) return
    if (!source) return
    if (!destination) return
    if (source === destination) return

    const lists = {
      A: tierA,
      B: tierB,
      C: tierC,
      D: tierD,
      Backlog: backlog,
    }
    const setters = {
      A: setTierA,
      B: setTierB,
      C: setTierC,
      D: setTierD,
      Backlog: setBacklog,
    }
    setters[source](lists[source].filter((current) => current !== name))
    setters[destination]([...lists[destination], name])

    setDragElement({ name: null, source: null, destination: null })
  }, [dragElement])

  const props = {
    dragElement,
    setDragElement,
  }

  // useEffect(() => {
  //   if (!backlog) return
  //   window.localStorage.setItem('backlog', JSON.stringify(backlog))
  //   ws.sendUpdate({ uuid: getUUID(), backlog })
  // }, [backlog])

  return (
    <>
      <Header />
      <div>
        <Section source="A" title="Fort probable" {...props} list={tierA} setList={setTierA} />
        <Section source="B" title="Envisageable" {...props} list={tierB} setList={setTierB} />
        <Section source="C" title="Mouais" {...props} list={tierC} setList={setTierC} />
        <Section source="D" title="Hors de question" {...props} list={tierD} setList={setTierD} />
      </div>
      <Backlog source="Backlog" {...props} list={backlog} setList={setBacklog} />
    </>
  )
}

export default Page
