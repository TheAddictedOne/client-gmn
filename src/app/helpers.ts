import names from '@/app/names.json'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Helpers                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export function initFromScratch(names: string[]): Character[] {
  return names.map((name) => {
    name = name.toLowerCase()
    const slug = name.replaceAll(' ', '-')
    const image = `/${slug}.webp`
    const tier = 'NONE'
    return { name, slug, image, tier }
  })
}

export function init(): Character[] {
  const store = window.localStorage.getItem('store')
  try {
    return store ? JSON.parse(store) : initFromScratch(names)
  } catch (error) {
    console.warn(error)
    return initFromScratch(names)
  }
}

export function move(characters: Character[], slug: string, tier: Tier): Character[] {
  return characters.map((character) =>
    character.slug === slug ? { ...character, tier } : character
  )
}

export function reorder(characters: Character[]): Section[] {
  const store: Section[] = [
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
