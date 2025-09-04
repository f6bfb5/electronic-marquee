import useStore from '@/store.ts'

export const Sandbox = () => {
  const { data } = useStore()
  const fontFamily = useStore((state: { fontFamily: string }) => state.fontFamily)

  return (
    // display data as table with each line as a row
    <div className="m-2 p-4 flex flex-col gap-4 border border-rounded">
      <table className={`w-full ${fontFamily}`}>
        <tbody>
          {data.map((text: string, index: number) => (
            <tr key={index}>
              <td className="font-medium w-0">
                {index + 1}
              </td>
              <td className="font-medium">
                {text}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>{fontFamily}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
