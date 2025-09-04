import useStore from '@/store.ts'
import { useState } from 'react'
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";

export const DraggableTableRow = ({ text, index }: { text: string, index: number }) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id: text });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  const [localText, setLocalText] = useState(text)

  const removeText = useStore((state: { removeText: void; }) => state.removeText)
  const setText = useStore((state: { setText: void; }) => state.setText)

  return (
    <TableRow className="w-full" ref={setNodeRef} style={style}>
      <TableCell className="font-medium w-0">
        <DragHandle {...attributes} {...listeners} className="flex justify-center" />
      </TableCell>
      <TableCell className="font-medium">
        <Input
          type="text"
          value={localText}
          onChange={(e: { target: { value: string; }; }) => setLocalText(e.target.value)}
          onBlur={() => setText(index, localText)}
        />
      </TableCell>
      <TableCell className="font-medium">
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => removeText(index)}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};
