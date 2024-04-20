type Tier = 'A' | 'B' | 'C' | 'NONE'

interface Character {
  name: string
  slug: string
  image: string
  tier: Tier
}
