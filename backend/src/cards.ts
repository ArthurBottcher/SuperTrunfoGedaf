export interface Card {
  name: string
  type: 'trunfo' | 'hero' | 'common'
  img: string
  attributes: {
    win: number
    con: number
    dex: number
    cha: number
    int: number
    str: number
  }
  abilities?: {
    onReveal: { desc: string; fn: () => void } | null
    onWin: { desc: string; fn: () => void } | null
    onLose: { desc: string; fn: () => void } | null
    onDraw: { desc: string; fn: () => void } | null
    onInit: { desc: string; fn: () => void } | null
  }
}

export type Attributes = 'win' | 'con' | 'dex' | 'cha' | 'int' | 'str'

export const TrunfoCards: Array<Card> = [
  {
    name: 'Rei James',
    type: 'trunfo',
    attributes: {
      cha: 18,
      con: 14,
      dex: 13,
      int: 16,
      str: 16,
      win: 25,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Barão',
    type: 'trunfo',
    attributes: {
      cha: 16,
      con: 18,
      dex: 16,
      int: 25,
      str: 11,
      win: 13,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Sátiro Ed',
    type: 'trunfo',
    attributes: {
      cha: 14,
      con: 11,
      dex: 18,
      int: 12,
      str: 25,
      win: 15,
    },
    img: 'https://picsum.photos/100/100',
  },
]

export const HeroCards: Array<Card> = [
  {
    name: 'Irtimid',
    type: 'hero',
    attributes: {
      cha: 14,
      con: 8,
      dex: 12,
      int: 10,
      str: 17,
      win: 20,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Belror',
    type: 'hero',
    attributes: {
      cha: 8,
      con: 20,
      dex: 10,
      int: 17,
      str: 14,
      win: 12,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Aron',
    type: 'hero',
    attributes: {
      cha: 12,
      con: 17,
      dex: 14,
      int: 8,
      str: 20,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Tilion',
    type: 'hero',
    attributes: {
      cha: 20,
      con: 14,
      dex: 12,
      int: 10,
      str: 8,
      win: 17,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Salazar',
    type: 'hero',
    attributes: {
      cha: 14,
      con: 12,
      dex: 8,
      int: 17,
      str: 10,
      win: 20,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Paul Nabok',
    type: 'hero',
    attributes: {
      cha: 8,
      con: 10,
      dex: 20,
      int: 12,
      str: 17,
      win: 14,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Ariev',
    type: 'hero',
    attributes: {
      cha: 10,
      con: 14,
      dex: 17,
      int: 20,
      str: 12,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Keivon',
    type: 'hero',
    attributes: {
      cha: 20,
      con: 12,
      dex: 14,
      int: 10,
      str: 8,
      win: 17,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Elrin',
    type: 'hero',
    attributes: {
      cha: 12,
      con: 17,
      dex: 8,
      int: 20,
      str: 10,
      win: 14,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Theu',
    type: 'hero',
    attributes: {
      cha: 17,
      con: 20,
      dex: 10,
      int: 8,
      str: 14,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Alatar',
    type: 'hero',
    attributes: {
      cha: 10,
      con: 14,
      dex: 8,
      int: 12,
      str: 20,
      win: 17,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Sato',
    type: 'hero',
    attributes: {
      cha: 8,
      con: 14,
      dex: 20,
      int: 10,
      str: 17,
      win: 12,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Zaax',
    type: 'hero',
    attributes: {
      cha: 14,
      con: 12,
      dex: 17,
      int: 10,
      str: 8,
      win: 20,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Zord',
    type: 'hero',
    attributes: {
      cha: 10,
      con: 17,
      dex: 20,
      int: 8,
      str: 12,
      win: 14,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Draco',
    type: 'hero',
    attributes: {
      cha: 17,
      con: 8,
      dex: 14,
      int: 20,
      str: 10,
      win: 12,
    },
    img: 'https://picsum.photos/100/100',
  },
]

export const CommonCards: Array<Card> = [
  {
    name: 'Seu Humberto',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Natum',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Cleber',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Fred',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Farla',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Oriwa King',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Sadroc',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Katrina',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Adm',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Aurora',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Andrius',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Torogan',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Beto Xara',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Pigmeu',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Lazev (velaz)',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Grunlax',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Xer',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Williham',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
  {
    name: 'Monolo',
    type: 'common',
    attributes: {
      cha: 10,
      con: 10,
      dex: 10,
      int: 10,
      str: 10,
      win: 10,
    },
    img: 'https://picsum.photos/100/100',
  },
]
