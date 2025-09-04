import useStore from '@/store.ts'
import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import LZString from "lz-string";
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export const MarqueeExportMenu = ({ className }) => {
  const data = useStore((state) => state.data)
  const fontFamily = useStore((state) => state.fontFamily)
  const fontSize = useStore((state) => state.fontSize)
  const textColor = useStore((state) => state.textColor)
  const textsPerSecond = useStore((state) => state.textsPerSecond)
  const marqueeStyle = useStore((state) => state.marqueeStyle)
  const isRandomPlay = useStore((state) => state.isRandomPlay)

  const urlPara = JSON.stringify({
    data: data,
    fontfamily: fontFamily,
    fontsize: fontSize,
    textcolor: textColor,
    textspersecond: textsPerSecond,
    marqueestyle: marqueeStyle,
    israndomplay: isRandomPlay
  })
  const [hideMenu, setHideMenu] = useState(false)
  const [sameAsClientHeight, setSameAsClientHeight] = useState(false)

  const shareUrl = `${window.location.origin}/`
    + (hideMenu || sameAsClientHeight ? `?` : ``)
    + (hideMenu ? `&h=true` : ``)
    + (sameAsClientHeight ? `&s=true` : ``)
    + `#${LZString.compressToBase64(urlPara)}`

  const { toast } = useToast()
  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current.select()
    document.execCommand("copy")
    toast({
      description: "URL is copied to clipboard.",
      duration: 2000,
    })
  }

  return (
    <div className={className}>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Export
      </h2>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>URL</p>
        <Input
          type="url"
          className="cursor-pointer"
          value={shareUrl}
          onFocus={handleFocus}
          ref={inputRef}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>Hide menu</p>
        <Checkbox id="hide-menu" value={hideMenu} onCheckedChange={setHideMenu} />
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>Font size same as client height</p>
        <Checkbox id="same-as-client-height" value={sameAsClientHeight} onCheckedChange={setSameAsClientHeight} />
      </div>
    </div>
  )
}
