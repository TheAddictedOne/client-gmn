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
