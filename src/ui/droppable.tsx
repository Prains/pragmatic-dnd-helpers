import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import type { DroppableChildrenParams } from "../types.ts";
import type {
  DropTargetGetFeedbackArgs,
  ElementDragType,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types.js";
interface DroppableProps {
  children: ({ isDraggedOver, droppableRef }: DroppableChildrenParams) => React.ReactNode;
  params?: {
    onDragEnter?: () => void;
    onDragLeave?: () => void;
    onDrop?: () => void;
    canDrop?: ((args: DropTargetGetFeedbackArgs<ElementDragType>) => boolean) | undefined;
  };
  data?: Record<string, unknown>;
}

export const Droppable = memo(({ children, params, data }: DroppableProps) => {
  const droppableRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = droppableRef.current;
    invariant(el, "droppable ref is not defined");

    return dropTargetForElements({
      element: el,
      getData: () => data || {},
      onDragEnter: () => {
        setIsDraggedOver(true);
        params?.onDragEnter?.();
      },
      canDrop: params?.canDrop,
      onDragLeave: () => {
        setIsDraggedOver(false);
        params?.onDragLeave?.();
      },
      onDrop: () => {
        setIsDraggedOver(false);
        params?.onDrop?.();
      },
    });
  }, [params, data]);

  return <>{children({ isDraggedOver, droppableRef })}</>;
});

Droppable.displayName = "Droppable";
