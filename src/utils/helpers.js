import names from '@/utils/names.json'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Helpers                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export function initFromScratch(names) {
  return names.map((name) => {
    name = name.toLowerCase()
    const slug = name.replaceAll(' ', '-')
    const image = `/${slug}.webp`
    const tier = 'NONE'
    return { name, slug, image, tier }
  })
}

export function initCharacters() {
  const store = window.localStorage.getItem('store')
  try {
    return store ? JSON.parse(store) : initFromScratch(names)
  } catch (error) {
    console.warn(error)
    return initFromScratch(names)
  }
}

export function move(characters, slug, tier) {
  return characters.map((character) =>
    character.slug === slug ? { ...character, tier } : character
  )
}

export function reorder(characters) {
  const store = [
    { tier: 'A', characters: [] },
    { tier: 'B', characters: [] },
    { tier: 'C', characters: [] },
    { tier: 'D', characters: [] },
  ]
  characters.forEach((character) => {
    if (character.tier === 'A') store[0].characters.push(character)
    if (character.tier === 'B') store[1].characters.push(character)
    if (character.tier === 'C') store[2].characters.push(character)
    if (character.tier === 'D') store[3].characters.push(character)
  })
  return store
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
