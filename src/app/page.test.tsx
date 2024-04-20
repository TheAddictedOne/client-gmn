import { expect, test } from 'vitest'
import { initFromScratch, move } from '@/app/page.tsx'

test('initFromScratch', () => {
  const names = [
    "Aerith Gainsborough",
    "Aloy",
    "amicia de Rune",
  ]
  expect(initFromScratch(names)).toEqual({
    s: [],
    a: [],
    b: [],
    c: [],
    characters: [
      { name: "aerith gainsborough", slug: 'aerith-gainsborough', image: '/aerith-gainsborough.webp' },
      { name: "aloy", slug: 'aloy', image: '/aloy.webp' },
      { name: "amicia de rune", slug: 'amicia-de-rune', image: '/amicia-de-rune.webp' },
    ]
  })
})

test('move from another tier', () => {
  const store = {
    s: [],
    a: [],
    b: [],
    c: [],
    characters: [
      { name:'baiken', slug: 'baiken', image: '/baiken.webp' },
      { name: 'caitlyn', slug: 'caitlyn', image: '/caitlyn.webp' },
      { name: 'catherine', slug: "catherine", image: '/catherine.webp' },
    ]
  }

  expect(move(store, 'baiken', 's')).toEqual({
    s: [
      { name:'baiken', slug: 'baiken', image: '/baiken.webp' },
    ],
    a: [
    ],
    b: [],
    c: [],
    characters: [
      { name: 'caitlyn', slug: 'caitlyn', image: '/caitlyn.webp' },
      { name: 'catherine', slug: "catherine", image: '/catherine.webp' },
    ]
  })
})

test('move to last of same tier', () => {
  const store = {
    s: [],
    a: [
      { name: 'ellie', slug: 'ellie', image: '/ellie.webp' },
      { name:'edna', slug: 'edna', image: '/edna.webp' },
    ],
    b: [],
    c: [],
    characters: [
      { name: 'jill', slug: "jill", image: '/jill.webp' },
    ]
  }

  expect(move(store, 'ellie', 'a')).toEqual({
    s: [],
    a: [
      { name:'edna', slug: 'edna', image: '/edna.webp' },
      { name: 'ellie', slug: 'ellie', image: '/ellie.webp' },
    ],
    b: [],
    c: [],
    characters: [
      { name: 'jill', slug: "jill", image: '/jill.webp' },
    ]
  })
})