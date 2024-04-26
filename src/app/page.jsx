'use client'

import WS from '@/components/ws.js'
import Header from '@/components/Header.jsx'
import Section from '@/components/Section.jsx'
import Backlog from '@/components/Backlog.jsx'
import { getItem, setItem, getUUID } from '@/utils/helpers.js'
import { useEffect, useState } from 'react'

const ws = WS()

const Page = () => {
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

    const sourceList = lists[source].filter((current) => current !== name)
    setters[source](sourceList)
    setItem(source, sourceList)

    const destinationList = [...lists[destination], name]
    setters[destination](destinationList)
    setItem(destination, destinationList)
    ws.sendUpdate({
      uuid: getUUID(),
      A: getItem('A'),
      B: getItem('B'),
      C: getItem('C'),
      D: getItem('D'),
    })

    setDragElement({ name: null, source: null, destination: null })
  }, [dragElement])

  const props = {
    dragElement,
    setDragElement,
  }

  return (
    <>
      <Header />
      <div className="TierList">
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
