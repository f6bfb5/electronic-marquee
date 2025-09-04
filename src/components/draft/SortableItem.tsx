import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * SortableItem component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.id - The unique identifier of the sortable item.
 * @returns {JSX.Element} The rendered SortableItem component.
 */
export function SortableItem(props: { id: string, children: JSX.Element }): JSX.Element {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}