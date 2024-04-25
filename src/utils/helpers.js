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

export function getBacklog() {
  const store = window.localStorage.getItem('store')
  try {
    return store ? JSON.parse(store) : names
  } catch (error) {
    console.warn(error)
    return names
  }
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

export function getUUID(uuid = window.localStorage.getItem('uuid')) {
  if (!uuid) {
    uuid = window.crypto.randomUUID()
    window.localStorage.setItem('uuid', uuid)
  }
  return uuid
}
