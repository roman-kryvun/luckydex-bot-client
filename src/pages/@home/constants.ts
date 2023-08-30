
export const CAN_BE_TRADED = ['808', '809']
export const CAN_NO_BE_TRADED = ['718']

export const geners = [
  { key: '0', gen: '0', region: 'All' },
  { key: '1', gen: '1', region: 'Kanto' },
  { key: '2', gen: '2', region: 'Johto' },
  { key: '3', gen: '3', region: 'Hoenn' },
  { key: '4', gen: '4', region: 'Sinnoh' },
  { key: '5', gen: '5', region: 'Unova' },
  { key: '6', gen: '6', region: 'Kalos' },
  { key: '7', gen: '7', region: 'Alola' },
  { key: '8', gen: '8', region: 'Galar', rangeStart: 810, rangeEnd: 898 },
  { key: '8.2', gen: '8', region: 'Hisui', rangeStart: 899, rangeEnd: 905 },
  { key: '9', gen: '9', region: 'Paldea' },
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
}

