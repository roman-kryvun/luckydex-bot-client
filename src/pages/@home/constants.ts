
export const CAN_BE_TRADED = ['808', '809']
export const CAN_NO_BE_TRADED = ['718']

export const geners = [
  { key: '0', gen: '0', region: 'All' },
  { key: '1', gen: '1', region: 'Kanto', rangeStart: 1, rangeEnd: 152 },
  { key: '2', gen: '2', region: 'Johto', rangeStart: 152, rangeEnd: 252 },
  { key: '3', gen: '3', region: 'Hoenn', rangeStart: 252, rangeEnd: 387 },
  { key: '4', gen: '4', region: 'Sinnoh', rangeStart: 387, rangeEnd: 494 },
  { key: '5', gen: '5', region: 'Unova', rangeStart: 494, rangeEnd: 650 },
  { key: '6', gen: '6', region: 'Kalos', rangeStart: 650, rangeEnd: 722 },
  { key: '7.0', gen: '7', region: 'Alola', rangeStart: 722, rangeEnd: 807,  },
  { key: '7.1', gen: '7', region: 'Unknown', rangeStart: 808, rangeEnd: 810  },
  { key: '8', gen: '8', region: 'Galar', rangeStart: 810, rangeEnd: 899 },
  { key: '8.2', gen: '8', region: 'Hisui', rangeStart: 899, rangeEnd: 906 },
  { key: '9', gen: '9', region: 'Paldea', rangeStart: 906, rangeEnd: 1001 },
]

export const UNIC_GENERATIONS = [...new Set(geners.map(({ gen }) => gen))]
export const REGIONS: { [str: string]: string } = {
  '1': 'Kanto',
  '152': 'Johto',
  '252': 'Hoenn',
  '387': 'Sinnoh',
  '494': 'Unova',
  '650': 'Kalos',
  '722': 'Alola',
  '810': 'Galar',
  '899': 'Hisui',
  '906': 'Paldea',
  '808': 'Unknown',
}

