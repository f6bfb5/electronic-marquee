import useStore from '@/store.ts'
import { useEffect } from 'react'
import { Marquee } from './components/Marquee'
import { MarqueeExportMenu } from './components/MarqueeExportMenu'
import { MarqueeListMenu } from './components/MarqueeListMenu'
import { MarqueeOptionsMenu } from './components/MarqueeOptionsMenu'
import { Toaster } from "@/components/ui/toaster"
import LZString from "lz-string";

function App() {
  const isMarqueeOnly = useStore((state) => state.isMarqueeOnly)

  const setMarqueeOnly = useStore((state) => state.setMarqueeOnly)
  const setFontSize = useStore((state: { setFontSize: void }) => state.setFontSize)

  const isDefault = useStore((state: { isDefault: boolean }) => state.isDefault)
  const setData = useStore((state) => state.setData)
  const setFontFamily = useStore((state) => state.setFontFamily)
  const setRandomPlay = useStore((state) => state.setRandomPlay)
  const setMarqueeStyle = useStore((state) => state.setMarqueeStyle)
  const setTextColor = useStore((state) => state.setTextColor)
  const setTextsPerSecond = useStore((state) => state.setTextsPerSecond)

  useEffect(() => {
    const hash = window.location.hash
    if (hash && isDefault) {
      const p = hash.slice(1)
      const decompressedP = LZString.decompressFromBase64(p)
      const decompressedData = JSON.parse(decompressedP)
      console.log(decompressedData)
      setData(decompressedData.data)
      setFontFamily(decompressedData.fontfamily)
      setFontSize(decompressedData.fontsize)
      setRandomPlay(decompressedData.israndomplay)
      setMarqueeStyle(decompressedData.marqueestyle)
      setTextColor(decompressedData.textcolor)
      setTextsPerSecond(decompressedData.textspersecond)
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(new URL(window.location.href).search)
    // hide menu
    if (params.has('h')) {
      setMarqueeOnly(params.get('h') === 'true')
    }
    // font size same as client height
    if (params.has('s')) {
      if (params.get('s') === 'true') {
        setFontSize('100vh')
      }
    }
  }, [])

  return (
    <>
      <div className="sticky top-0 z-10">
        <Marquee />
      </div>
      {isMarqueeOnly
        ? ''
        : <div className="m-auto py-2 max-w-4xl">
          <MarqueeListMenu className=" h-[max(480px,40vh)] m-2 p-4 flex flex-col gap-4 border rounded" />
          <MarqueeOptionsMenu className="m-2 p-4 flex flex-col gap-4 border rounded" />
          <MarqueeExportMenu className="m-2 p-4 flex flex-col gap-4 border rounded" />
        </div>
      }
      <Toaster />
    </>
  )
}

export default App
