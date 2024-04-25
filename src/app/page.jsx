'use client'

import WS from '@/components/ws.js'
import Header from '@/components/Header.jsx'
import TierList from '@/components/TierList.jsx'
import Backlog from '@/components/Backlog.jsx'

const Page = () => {
  const ws = WS()

  // useEffect(() => {
  //   if (!backlog) return
  //   window.localStorage.setItem('backlog', JSON.stringify(backlog))
  //   ws.sendUpdate({ uuid: getUUID(), backlog })
  // }, [backlog])

  return (
    <>
      <Header />
      <TierList />
      <Backlog />
    </>
  )
}

export default Page
