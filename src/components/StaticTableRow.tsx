import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useSortable } from "@dnd-kit/sortable";

import { DragHandle } from "./DragHandle";

export const StaticTableRow = ({ text }: { text: string }) => {
  const {
    attributes,
  } = useSortable({ id: text });

  return (
    <TableRow className="w-full">
      <TableCell className="font-medium w-0">
        <DragHandle {...attributes} className="flex justify-center" />
      </TableCell>
      <TableCell className="font-medium">
        <Input type="text" placeholder="Newline" value={text} readOnly />
      </TableCell>
      <TableCell className="font-medium">
        <Button className="w-full" variant="destructive">Remove</Button>
      </TableCell>
    </TableRow>
  );
};

