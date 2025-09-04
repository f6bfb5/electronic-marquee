import { create } from 'zustand'

type Store = {
  data: string[],
  displayingIndex: number,
  displayingText: string,
  defaultText: string,
  fontFamily: object,
  fontSize: string,
  textColor: string,
  textsPerSecond: number,
  marqueeStyle: string,
  isRandomPlay: boolean,
  isMarqueeOnly: boolean,
  isDefault: boolean,
  setData: (newData: []) => void,
  addText: (newText: string) => void,
  removeText: (index: number) => void,
  setText: (index: number, newText: string) => void,
  getDisplayingText: () => string,
  setFontFamily: (newFontFamily: object) => void,
  setFontSize: (newFontSize: string) => void,
  setTextColor: (newTextColor: string) => void,
  setTextsPerSecond: (newTextsPerSecond: number) => void,
  setRandomPlay: (newRandomPlay: boolean) => void,
  setMarqueeOnly: (newMarqueeOnly: boolean) => void,
  setMarqueeStyle: (newMarqueeStyle: number) => void,
  setNextText: (animationName: string) => void,
  resetDisplayingText: () => void,
}

const useStore = create<Store>((set, get) => ({
  data: ['いつでも捜しているよ　どっかに君の姿を',
    'カバンの中も 机の中も　探したけれど見つからないのに　それより僕と踊りませんか',
    '朝が来るまで終わる事のないダンスを',
    '踊ってない夜を知らない　踊ってない夜が気に入らない',
    '君は知ってるかい？　踊らな死ぬ事を'],
  displayingIndex: 0,
  displayingText: '',
  defaultText: '君は知ってるかい？　踊らな死ぬ事を',
  fontFamily: { class: '', zh: '' },
  fontSize: '26px',
  textColor: "#ea1717",
  textsPerSecond: 3,
  marqueeStyle: "0",
  isRandomPlay: false,
  isMarqueeOnly: false,
  isDefault: true,
  setData: (newData) => {
    set({ data: newData, isDefault: false })
  },
  addText: (newText) => {
    if (get().isDefault) {
      set(({ data: [newText], isDefault: false }))
    } else {
      set((state) => ({ data: [...state.data, newText] }))
    }
  },
  removeText: (index) => {
    set((state) => {
      const newData = state.data.filter((e, i) => i !== index)
      return { data: newData }
    })
  },
  setText: (index, newText) => {
    const newData = get().data
    newData[index] = newText
    set(({ data: [...newData] }))
  },
  getDisplayingText: () => {
    return get().data[get().displayingIndex]
  },
  setFontFamily: (newFontFamily) => {
    set(({ fontFamily: newFontFamily }))
  },
  setFontSize: (newFontSize) => {
    set(({ fontSize: newFontSize }))
  },
  setTextColor: (newTextColor) => {
    set(({ textColor: newTextColor }))
  },
  setTextsPerSecond: (newTextsPerSecond) => {
    set(({ textsPerSecond: newTextsPerSecond }))
  },
  setRandomPlay: (newRandomPlay) => {
    set(({ isRandomPlay: newRandomPlay }))
  },
  setMarqueeOnly: (newMarqueeOnly) => {
    set(({ isMarqueeOnly: newMarqueeOnly }))
  },
  setMarqueeStyle: (newMarqueeStyle) => {
    set(({ marqueeStyle: newMarqueeStyle }))
  },
  setNextText: () => {
    if (get().data.length > 0) {
      if (get().isRandomPlay) {
        const randomIndex = Math.floor(Math.random() * get().data.length)
        set(({ displayingIndex: randomIndex, displayingText: get().data[randomIndex] }))
      } else {
        if (get().displayingIndex + 1 >= get().data.length) set(({ displayingIndex: 0 }))
        else set(({ displayingIndex: get().displayingIndex + 1 }))

        set(({ displayingText: get().getDisplayingText() }))
      }
    } else {
      set(({ displayingText: get().defaultText }))
    }
  },
  resetDisplayingText: () => {
    if (get().data.length > 0) {
      set(({ displayingText: get().data[0], displayingIndex: 0 }))
    } else {
      set(({ displayingText: get().defaultText }))
    }
  },
}))

export default useStore
