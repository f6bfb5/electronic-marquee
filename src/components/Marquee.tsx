import useStore from '@/store.ts'
import { useState, useEffect } from 'react'

export const Marquee = ({
  fontFamily = useStore((state: { fontFamily: string }) => state.fontFamily),
  fontSize = useStore((state: { fontSize: number }) => state.fontSize),
  textColor = useStore((state: { textColor: string }) => state.textColor),
  textsPerSecond = useStore((state: { textsPerSecond: number }) => state.textsPerSecond),
  marqueeStyle = useStore((state: { marqueeStyle: string }) => state.marqueeStyle)
}) => {
  const data = useStore((state: { data: [] }) => state.data)

  const [animationKey, setAnimationKey] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const displayingText = useStore((state: { displayingText: string }) => state.displayingText)

  const setNextText = useStore((state: { setNextText: void }) => state.setNextText)
  const resetDisplayingText = useStore((state: { resetDisplayingText: void }) => state.resetDisplayingText)

  useEffect(() => {
    if (!isAnimating) {
      setNextText()
      setAnimationKey(prevKey => prevKey + 1)
      setIsAnimating(true)
    }
  }, [isAnimating, setNextText])

  useEffect(() => {
    resetDisplayingText()
    setAnimationKey(prevKey => prevKey + 1)
  }, [data, resetDisplayingText])

  function getTextLength(text: string) {
    const chars = text.split("");
    const reg = /^[A-Za-z0-9]*$/;
    let length = 0;
    for (let i = 0, ilen = chars.length; i < ilen; i++) {
      // length += reg.test(chars[i]) ? 0.5 : 1;
      length += reg.test(chars[i]) ? 2 : 1;
    }
    return length;
  }

  function getAnimationDuration(text: string) {
    return Math.ceil((getTextLength(text) / textsPerSecond))
  }

  function getAnimationSteps(text: string) {
    return Math.ceil((getTextLength(text) / textsPerSecond) * 6)
  }

  function animationEndHandler(animationName: string) {
    if (animationName == 'marquee' || animationName == 'marquee-ease-out') {
      setIsAnimating(false)
    }
  }

  const marqueeStyleArray = [
    {
      class: 'pl-[100%]',
      style: {
        animation: `marquee ${getAnimationDuration(displayingText)}s steps(${getAnimationSteps(displayingText)}, start) forwards`,
      }
    },
    {
      class: 'translate-x-[100vw]',
      style: {
        animation: `marquee-ease-in 2s ease forwards,
            marquee-ease-out ${getAnimationDuration(displayingText)}s linear 2s forwards`,
      }
    }
  ]

  return (
    <>
      <div
        className={`relative min-h-[1em] w-full bg-[#2f1825] font-bold overflow-hidden`}
        style={{ fontSize: `${fontSize}`, color: textColor, fontFamily: `"${fontFamily}"` }}
      >
        <div className="absolute inset-0 z-10 [background-image:radial-gradient(transparent_0_1px,rgba(0,0,0,.7)_1px)] [background-size:3px_3px]">
        </div>
        <p
          className={`absolute whitespace-nowrap leading-none text-shadow ${marqueeStyleArray[marqueeStyle].class}`}
          style={marqueeStyleArray[marqueeStyle].style}
          key={animationKey}
          onAnimationEnd={(e) => { animationEndHandler(e.animationName) }}
        >
          {displayingText}
        </p>
      </div>
    </>
  )
}
