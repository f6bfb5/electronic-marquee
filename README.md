# Electronic Marquee

## Preview

- [Step](/marquee-step.webm)
- [Ease](/marquee-ease.webm)

## Architecture

- Marquee
- MarqueeListMenu
  - dnd-kit*
  - Table*
    - DraggableTableRow
      - DragHandle
  - StaticTableRow
    - DragHandle
- MarqueeOptionsMenu
  - FontSelector
- MarqueeExportMenu
  - LZString*
- Toaster*

## Libraries and references

- [Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [create shadcn inline form. label and input without flex | A v0.dev template - v0](https://v0.dev/r/RvJVJrJ9L55)
- [Presets / Sortable / Vertical - Basic Setup ⋅ Storybook](https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/story/presets-sortable-vertical--basic-setup&globals=backgrounds.grid:false)
  - [Sortable | @dnd-kit – Documentation](https://docs.dndkit.com/presets/sortable)
  - [react-table drag and drop sort rows with @dnd-kit - CodeSandbox](https://codesandbox.io/s/react-table-drag-and-drop-sort-rows-with-dnd-kit-btpy9)
- [Edit-Mr/emfont: A free webfont service](https://github.com/Edit-Mr/emfont)
  - [emfont - 免費中文 Webfont 服務](https://font.emtech.cc/)

## TODO

- read lines from file
- text gradient glow

## Marquee

- 跑馬燈
  - 預覽
  - 取得網址
    - string array
    - is compressed
    - is displaying menu
    - style
      - font-family
      - font-size
      - color
      - textspersecond
      - border
  - 選項
    - 字體
    - 顏色
    - 每秒字數
    - 外框線

## Animations

- keyframes1
  - translateX(100%)
  - 0%
    - translateX(100%)
  - 38%
    - translateX(8px)
  - 100%
    - translateX(8px)
  - 2s
  - ease
  - forwards
- keyframes2
  - 0%
    - translateX(8px)
  - 100%
    - translateX(-100%)
  - getAnimationDuration()
  - linear
  - forwards
