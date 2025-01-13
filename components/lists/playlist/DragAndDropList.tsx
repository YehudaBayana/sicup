// DragAndDropList.tsx
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
import { AlbumTracksItem, Track } from "../../../utils/types";
import { Divider, Typography } from "@mui/material";

interface DragAndDropListProps {
  isDraggable: boolean;
  listItems: AlbumTracksItem[] | Track[];
  imageSrc?: string;
}
const DragAndDropList: React.FC<DragAndDropListProps> = ({
  isDraggable,
  listItems,
  imageSrc,
}) => {
  const [items, setItems] = useState<AlbumTracksItem[] | Track[]>(listItems);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setItems(listItems);
  }, [listItems]);

  const sensors = isDraggable
    ? useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))
    : undefined;

  if (!hydrated) {
    return null;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isDraggable) return;
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // Type guard to ensure `items` is of the correct type
    if (items.every((item) => "track" in item)) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        return arrayMove(prevItems as Track[], oldIndex, newIndex);
      });
    } else {
      console.error("Items are not of type Track[]");
    }
  };

  if (!items || items.length === 0) {
    return <Typography variant="h6">No items to display.</Typography>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={isDraggable ? closestCenter : undefined}
      onDragStart={() => isDraggable && disableScroll()}
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
          }}
        >
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <SortableItem
                imageSrc={imageSrc || (item as Track).album.images[0].url}
                item={item}
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDropList;
