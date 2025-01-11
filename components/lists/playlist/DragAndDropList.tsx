import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import SortableItem from "./SortableItem";
import { disableScroll, enableScroll } from "../../../utils/functions";
import { AlbumTracksItem } from "../../../utils/types";
import { Divider } from '@mui/material';
// import { disableScroll, enableScroll } from "../utils/scroll";

interface DragAndDropListProps {
  isDraggable: boolean; // Flag to enable/disable drag-and-drop
  listItems: AlbumTracksItem[];
  imageSrc?: string;
}
const DragAndDropList: React.FC<DragAndDropListProps> = ({
  isDraggable,
  listItems,
  imageSrc,
}) => {
  const [items, setItems] = useState<AlbumTracksItem[]>(listItems);
  const [hydrated, setHydrated] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Render nothing on the server
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isDraggable) return;
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  if (!items || items.length === 0) {
    return null;
  }
  console.log("items ", items);

  return (
    <DndContext
      sensors={isDraggable ? sensors : undefined} // Disable sensors if not draggable
      collisionDetection={isDraggable ? closestCenter : undefined}
      onDragStart={() => {
        if (isDraggable) disableScroll();
      }}
      onDragEnd={(event) => {
        if (isDraggable) enableScroll();
        handleDragEnd(event);
      }}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <List
          component={Paper}
          sx={{
            width: "100%",
            marginTop: "20px",
            // backgroundColor: "#4f4f4f",
          }}
        >
          {items.map((item) => (<>
            <SortableItem imageSrc={imageSrc} key={item.id} item={item} />
            <Divider />
          </>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDropList;
