type Tier = 'A' | 'B' | 'C' | 'D' | 'NONE'

interface Character {
  name: string
  slug: string
  image: string
  tier: Tier
}

interface Section {
  tier: Tier
  characters: Character[]
}

interface CharacterParams {
  store: Character[]
  setStore: function
  character: Character
}

interface TierListParams {
  store: Character[]
  setStore: function
}

interface SectionParams {
  tier: Tier
  characters: Character[]
}
