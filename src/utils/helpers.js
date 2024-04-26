import names from '@/utils/names.json'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Helpers                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export function getSlug(name) {
  return name.replaceAll(' ', '-').toLowerCase()
}

export function getImage(name) {
  return `/${getSlug(name)}.webp`
}

export function getItem(key) {
  if (!window) return []
  const defaultList = key === 'Backlog' ? names : []
  const list = window.localStorage.getItem(key)
  return !!list ? JSON.parse(list) : defaultList
}

export function setItem(key) {
  window.localStorage.setItem(key, JSON.stringify(key))
}

export function getUUID() {
  if (!window) return ''
  const uuid = window.localStorage.getItem('uuid')
  return !!uuid ? uuid : window.crypto.randomUUID()
}

export function getUsername() {
  if (!window) return ''
  const username = window.localStorage.getItem('username')
  return !!username ? username : ''
}

export function move(characters, slug, tier) {
  return characters.map((character) =>
    character.slug === slug ? { ...character, tier } : character
  )
}

export function getTiers(characters) {
  const sections = [
    { tier: 'A', list: [] },
    { tier: 'B', list: [] },
    { tier: 'C', list: [] },
    { tier: 'D', list: [] },
  ]
  characters.forEach((character) => {
    if (character.tier === 'A') store[0].list.push(character)
    if (character.tier === 'B') store[1].list.push(character)
    if (character.tier === 'C') store[2].list.push(character)
    if (character.tier === 'D') store[3].list.push(character)
  })
  return sections
}

export function formatLeaderboard(leaderboard, entry) {
  if (leaderboard.find((tierList) => tierList.uuid === entry.uuid)) {
    return leaderboard.map((tierList) => {
      return tierList.uuid === entry.uuid ? entry : tierList
    })
  }
  return [...leaderboard, entry]
}
