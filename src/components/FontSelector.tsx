import useStore from '@/store.ts'
import { SetStateAction, useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function FontSelector() {
  const [fonts, setFonts] = useState([]);
  const data = useStore((state: { data: [] }) => state.data)
  const fontFamily = useStore((state: { fontFamily: string }) => state.fontFamily)
  const setFontFamily = useStore((state: { setFontFamily: SetStateAction<string> }) => state.setFontFamily)

  async function fetchFontData(fontName: string, bodyData: []) {
    fetch(
      "https://font.emtech.cc/g/" + fontName,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words: bodyData }),
      }
    )
      .then(response => response.json())
      .then(data => {
        console.warn(
          "emfont: 字體" +
          data.name +
          "已生成完成，若網頁沒有變動文字可以直接直接載入網址\n" +
          data.location +
          " 來使用。"
        );
        const fontName = data.name;
        const fontUrl = data.location.map(url => `url(${url})`);
        console.log(data)
        const font = new FontFace(fontName, fontUrl);
        font.load().then(loadedFont => {
          document.fonts.add(loadedFont);
        });
      })
      .catch(error => {
        console.error("emfont: " + error);
      });
  }

  useEffect(() => {
    import('https://font.emtech.cc/emfont.js')
      .then((mod) => {
        mod.emfont.init();
      });
  }, []);

  // fetch all fonts list when page load
  useEffect(() => {
    async function fetchPerFontData(fonts) {
      const promises = []
      setFontFamily({ class: fonts[0].family, zh: fonts[0].name_zh });
      fonts.forEach(font => {
        const dataBody = [font.name_zh, font.family]
        const promise = fetchFontData(font.id, dataBody)
        promises.push(promise)
      })
      Promise.all(promises)
    }

    async function fetchFontList() {
      fetch("https://font.emtech.cc/list")
        .then(response => response.json())
        .then(fontData => {
          if (fontData.length > 0) {
            setFonts(fontData);
            fetchPerFontData(fontData)
          }
        });
    }

    if (fonts.length === 0) {
      fetchFontList()
    }
  }, [fonts.length])

  // get new font data when data update or font-family changes
  useEffect(() => {
    if (fontFamily?.class && fontFamily?.class !== "") {
      const fontName = fontFamily.class.replace("emfont-", "")
      fetchFontData(fontName, data);
    }
  }, [data, fontFamily, fonts])

  return (
    <>
      <Select
        onValueChange={setFontFamily}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select font">
            {fontFamily.name_zh} ({fontFamily.family})
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fonts.map(font => (
              <SelectItem
                key={font.name_zh}
                value={{ family: font.family, name_zh: font.name_zh }}
                className={`${font.family}`}
              >
                {font.name_zh} ({font.family})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default FontSelector;
