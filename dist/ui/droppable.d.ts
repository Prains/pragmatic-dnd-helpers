import type { DroppableChildrenParams } from "../types";
import type { DropTargetGetFeedbackArgs, ElementDragType } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
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
export declare const Droppable: import("react").NamedExoticComponent<DroppableProps>;
export {};
