import { expect, test } from 'vitest'
import { initFromScratch, move, reorder, formatLeaderboard } from '@/utils/helpers.ts'

test('initFromScratch', () => {
  const names = ['maya FEY', 'Aloy', 'amicia de Rune']
  expect(initFromScratch(names)).toEqual([
    { name: 'maya fey', slug: 'maya-fey', image: '/maya-fey.webp', tier: 'NONE' },
    { name: 'aloy', slug: 'aloy', image: '/aloy.webp', tier: 'NONE' },
    { name: 'amicia de rune', slug: 'amicia-de-rune', image: '/amicia-de-rune.webp', tier: 'NONE' },
  ])
})

test('move to another tier', () => {
  const store: Character[] = [
    { name: 'baiken', slug: 'baiken', image: '/baiken.webp', tier: 'NONE' },
    { name: 'caitlyn', slug: 'caitlyn', image: '/caitlyn.webp', tier: 'NONE' },
    { name: 'catherine', slug: 'catherine', image: '/catherine.webp', tier: 'NONE' },
  ]

  expect(move(store, 'baiken', 'A')).toEqual([
    { name: 'baiken', slug: 'baiken', image: '/baiken.webp', tier: 'A' },
    { name: 'caitlyn', slug: 'caitlyn', image: '/caitlyn.webp', tier: 'NONE' },
    { name: 'catherine', slug: 'catherine', image: '/catherine.webp', tier: 'NONE' },
  ])
})

test('move to same tier', () => {
  const store: Character[] = [
    { name: 'ellie', slug: 'ellie', image: '/ellie.webp', tier: 'B' },
    { name: 'edna', slug: 'edna', image: '/edna.webp', tier: 'NONE' },
    { name: 'jill', slug: 'jill', image: '/jill.webp', tier: 'NONE' },
  ]

  expect(move(store, 'ellie', 'B')).toEqual([
    { name: 'ellie', slug: 'ellie', image: '/ellie.webp', tier: 'B' },
    { name: 'edna', slug: 'edna', image: '/edna.webp', tier: 'NONE' },
    { name: 'jill', slug: 'jill', image: '/jill.webp', tier: 'NONE' },
  ])
})

test('move to backlog', () => {
  const store: Character[] = [
    { name: 'lilith', slug: 'lilith', image: '/lilith.webp', tier: 'C' },
    { name: 'malenia', slug: 'malenia', image: '/malenia.webp', tier: 'NONE' },
    { name: 'monika', slug: 'monika', image: '/monika.webp', tier: 'NONE' },
  ]

  expect(move(store, 'lilith', 'NONE')).toEqual([
    { name: 'lilith', slug: 'lilith', image: '/lilith.webp', tier: 'NONE' },
    { name: 'malenia', slug: 'malenia', image: '/malenia.webp', tier: 'NONE' },
    { name: 'monika', slug: 'monika', image: '/monika.webp', tier: 'NONE' },
  ])
})

test('move no effect', () => {
  const store: Character[] = [
    { name: 'makoto', slug: 'makoto', image: '/makoto.webp', tier: 'C' },
    { name: 'yuna', slug: 'yuna', image: '/yuna.webp', tier: 'A' },
    { name: 'velvet', slug: 'velvet', image: '/velvet.webp', tier: 'B' },
  ]

  expect(move(store, 'vi', 'NONE')).toEqual([
    { name: 'makoto', slug: 'makoto', image: '/makoto.webp', tier: 'C' },
    { name: 'yuna', slug: 'yuna', image: '/yuna.webp', tier: 'A' },
    { name: 'velvet', slug: 'velvet', image: '/velvet.webp', tier: 'B' },
  ])
})

test('reorder', () => {
  const store: Character[] = [
    { name: 'maya fey', slug: 'maya-fey', image: '/maya-fey.webp', tier: 'A' },
    { name: 'aloy', slug: 'aloy', image: '/aloy.webp', tier: 'B' },
    { name: 'amicia de rune', slug: 'amicia-de-rune', image: '/amicia-de-rune.webp', tier: 'C' },
    { name: 'makoto', slug: 'makoto', image: '/makoto.webp', tier: 'D' },
    { name: 'yuna', slug: 'yuna', image: '/yuna.webp', tier: 'NONE' },
    { name: 'velvet', slug: 'velvet', image: '/velvet.webp', tier: 'D' },
    { name: 'lilith', slug: 'lilith', image: '/lilith.webp', tier: 'C' },
    { name: 'malenia', slug: 'malenia', image: '/malenia.webp', tier: 'B' },
    { name: 'monika', slug: 'monika', image: '/monika.webp', tier: 'A' },
    { name: 'ellie', slug: 'ellie', image: '/ellie.webp', tier: 'NONE' },
    { name: 'edna', slug: 'edna', image: '/edna.webp', tier: 'NONE' },
    { name: 'jill', slug: 'jill', image: '/jill.webp', tier: 'NONE' },
  ]

  expect(reorder(store)).toEqual([
    {
      tier: 'A',
      characters: [
        { name: 'maya fey', slug: 'maya-fey', image: '/maya-fey.webp', tier: 'A' },
        { name: 'monika', slug: 'monika', image: '/monika.webp', tier: 'A' },
      ],
    },
    {
      tier: 'B',
      characters: [
        { name: 'aloy', slug: 'aloy', image: '/aloy.webp', tier: 'B' },
        { name: 'malenia', slug: 'malenia', image: '/malenia.webp', tier: 'B' },
      ],
    },
    {
      tier: 'C',
      characters: [
        {
          name: 'amicia de rune',
          slug: 'amicia-de-rune',
          image: '/amicia-de-rune.webp',
          tier: 'C',
        },
        { name: 'lilith', slug: 'lilith', image: '/lilith.webp', tier: 'C' },
      ],
    },
    {
      tier: 'D',
      characters: [
        { name: 'makoto', slug: 'makoto', image: '/makoto.webp', tier: 'D' },
        { name: 'velvet', slug: 'velvet', image: '/velvet.webp', tier: 'D' },
      ],
    },
  ])
})

test('format leaderboard with empty', () => {
  const leaderboard: ServerTierList[] = []
  const entry: ServerTierList = {
    uuid: 'abc',
    characters: [
      { name: 'urbosa', slug: 'urbosa', image: '/urbosa.webp', tier: 'A' },
      { name: 'wanda', slug: 'wanda', image: '/wanda.webp', tier: 'D' },
    ],
  }
  expect(formatLeaderboard(leaderboard, entry)).toEqual([
    {
      uuid: 'abc',
      characters: [
        { name: 'urbosa', slug: 'urbosa', image: '/urbosa.webp', tier: 'A' },
        { name: 'wanda', slug: 'wanda', image: '/wanda.webp', tier: 'D' },
      ],
    },
  ])
})

test('format leaderboard with new uuid', () => {
  const leaderboard: ServerTierList[] = [
    {
      uuid: 'p1',
      characters: [{ name: 'olympe', slug: 'olympe', image: '/olympe.webp', tier: 'A' }],
    },
  ]
  const entry: ServerTierList = {
    uuid: 'p2',
    characters: [{ name: 'mikasa', slug: 'mikasa', image: '/mikasa.webp', tier: 'A' }],
  }
  expect(formatLeaderboard(leaderboard, entry)).toEqual([
    {
      uuid: 'p1',
      characters: [{ name: 'olympe', slug: 'olympe', image: '/olympe.webp', tier: 'A' }],
    },
    {
      uuid: 'p2',
      characters: [{ name: 'mikasa', slug: 'mikasa', image: '/mikasa.webp', tier: 'A' }],
    },
  ])
})

test('format with update', () => {
  const leaderboard: ServerTierList[] = [
    {
      uuid: 'p1',
      characters: [{ name: 'jean', slug: 'jean', image: '/jean.webp', tier: 'A' }],
    },
  ]
  const entry: ServerTierList = {
    uuid: 'p1',
    characters: [{ name: 'louis', slug: 'louis', image: '/louis.webp', tier: 'B' }],
  }
  expect(formatLeaderboard(leaderboard, entry)).toEqual([
    {
      uuid: 'p1',
      characters: [{ name: 'louis', slug: 'louis', image: '/louis.webp', tier: 'B' }],
    },
  ])
})
