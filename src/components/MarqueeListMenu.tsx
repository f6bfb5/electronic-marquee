import useStore from '@/store.ts'
import { SetStateAction, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { DraggableTableRow } from './DraggableTableRow'
import { StaticTableRow } from './StaticTableRow'

export const MarqueeListMenu = ({ className }) => {
  const [newText, setNewText] = useState('')
  const [activeId, setActiveId] = useState(null)
  const data = useStore((state: { data: [] }) => state.data)
  const addText = useStore((state: { addText: void }) => state.addText)

  const clickHandler = () => {
    addText(newText)
    setNewText('')
  }

  const handleDragStart = (e) => {
    setActiveId(e.active.id)
  }

  const handleDragEnd = (e) => {
    // compare index of start and end
    // if different then swap
    const { active, over } = e;
    if (active.id !== over.id) {
      const oldIndex = data.indexOf(active.id)
      const newIndex = data.indexOf(over.id)
      const newData = arrayMove(data, oldIndex, newIndex)
      useStore.setState({ data: newData })
    }
    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={className}>
      <h2
        className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        id="list-menu-title"
      >
        List
      </h2>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
      >
        <Table>
          <TableHeader className="sticky top-0 backdrop-blur">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Text</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext items={data} strategy={verticalListSortingStrategy}>
              {data.map((text: string, index: number) => (
                <DraggableTableRow key={text} text={text} index={index} />
              ))}
            </SortableContext>
          </TableBody>
          <TableFooter className="sticky bottom-0">
            <TableRow className="backdrop-blur">
              <TableCell className="whitespace-nowrap">
                <span>
                  Total: {data.length}
                </span>
              </TableCell>
              <TableCell className="flex items-center justify-between">
                <Input
                  type="text"
                  placeholder="Newline"
                  value={newText}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setNewText(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button className="w-full" onClick={clickHandler}>Add</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <DragOverlay>
          {
            activeId && (
              <Table className="w-full z-0">
                <TableBody>
                  <StaticTableRow text={activeId} />
                </TableBody>
              </Table>
            )
          }
        </DragOverlay>
      </DndContext>
    </div >
  )
}
