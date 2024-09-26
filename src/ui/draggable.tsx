import { memo, useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import type { DraggableChildrenParams } from "../types";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";

interface DroppableItemProps {
  children: ({ isDragging }: DraggableChildrenParams) => React.ReactNode;
  initialData?: Record<string, unknown>;
  preview?: React.ReactNode;
  params?: {
    onDragStart?: () => void;
    onDrop?: () => void;
  };
}

type DraggableState =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement;
    }
  | {
      type: "dragging";
    };

export const Draggable = memo(({ children, initialData, params, preview }: DroppableItemProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<DraggableState>({ type: "idle" });

  useEffect(() => {
    const el = draggableRef.current;
    invariant(el, "draggable ref is not defined");

    return draggable({
      element: el,
      getInitialData: () => initialData || {},
      onDragStart: () => {
        setDragging(true);
        params?.onDragStart?.();
      },
      onDrop: () => {
        setDragging(false);
        params?.onDrop?.();
      },
      onGenerateDragPreview: preview
        ? ({ nativeSetDragImage }) => {
            setCustomNativeDragPreview({
              getOffset: pointerOutsideOfPreview({
                x: "16px",
                y: "8px",
              }),
              nativeSetDragImage,
              render({ container }) {
                setState({ type: "preview", container });
                return () => setState({ type: "dragging" });
              },
            });
          }
        : undefined,
    });
  }, [initialData, params, preview]);

  return (
    <div ref={draggableRef}>
      {children({ isDragging: dragging })}
      {state.type === "preview" && preview ? createPortal(preview, state.container) : null}
    </div>
  );
});

Draggable.displayName = "Draggable";
