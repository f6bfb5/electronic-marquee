import useStore from '@/store.ts'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
// import FontSelector from './FontSelector'

export const MarqueeOptionsMenu = ({ className }) => {
  const fontSize = useStore((state: { fontSize: string }) => state.fontSize)
  const textColor = useStore((state: { textColor: string }) => state.textColor)
  const textsPerSecond = useStore((state: { textsPerSecond: number }) => state.textsPerSecond)
  const marqueeStyle = useStore((state: { marqueeStyle: number }) => state.marqueeStyle)
  const isRandomPlay = useStore((state: { isRandomPlay: boolean }) => state.isRandomPlay)

  const setFontFamily = useStore((state: { setFontFamily: void }) => state.setFontFamily)
  const setFontSize = useStore((state: { setFontSize: void }) => state.setFontSize)
  const setTextColor = useStore((state: { setTextColor: void }) => state.setTextColor)
  const setTextsPerSecond = useStore((state: { setTextsPerSecond: void }) => state.setTextsPerSecond)
  const setMarqueeStyle = useStore((state: { setMarqueeStyle: void }) => state.setMarqueeStyle)
  const setRandomPlay = useStore((state: { setRandomPlay: void }) => state.setRandomPlay)

  const fontFamilyHandler = (e) => {
    const newValue = e.target.value
    console.log(newValue)
    setFontFamily(newValue)
  }

  const fontSizeHandler = (e) => {
    const newValue = e.target.value
    setFontSize(`${newValue}px`)
  }

  return (
    <div className={className}>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Options
      </h2>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>Font family</p>
        {/* <FontSelector /> */}
        <Input
          type="text"
          onInput={fontFamilyHandler}
        />
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>Font size</p>
        <Input
          type="range"
          value={Number(fontSize.replace('px', ''))}
          onInput={fontSizeHandler}
        />
        <span></span>
        <Input
          type="number"
          value={Number(fontSize.replace('px', ''))}
          placeholder="字體尺寸"
          onInput={fontSizeHandler}
        />
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <Label htmlFor="textColor" className="inline-block">Text color</Label>
        <Input
          type="color"
          id="textColor"
          value={textColor}
          onChange={(e: { target: { value: string } }) => setTextColor(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <Label htmlFor="textsPerSecond">Texts moved per second</Label>
        <Input
          type="number"
          id="textsPerSecond"
          value={textsPerSecond}
          placeholder="每秒移動字數"
          onChange={(e: { target: { value: number } }) => setTextsPerSecond(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>Marquee style</p>
        <RadioGroup value={marqueeStyle} defaultValue="0" onValueChange={(value: number) => setMarqueeStyle(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="marquee-style-1" />
            <Label htmlFor="marquee-style-1">step</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="marquee-style-2" />
            <Label htmlFor="marquee-style-2">ease</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-[16em_24em] w-full items-center gap-1.5 whitespace-nowrap">
        <p>Random play</p>
        <Checkbox id="random-play" value={isRandomPlay} onCheckedChange={setRandomPlay} />
      </div>
    </div>
  )
}
