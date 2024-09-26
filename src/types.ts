import type { MutableRefObject } from "react";

export type ExtendableRecord = Record<string, unknown>;

export type DraggableChildrenParams = {
  isDragging: boolean;
};

export type DroppableChildrenParams = {
  isDraggedOver: boolean;
  droppableRef: MutableRefObject<any>;
};
