import type { DraggableChildrenParams } from "../types";
interface DroppableItemProps {
    children: ({ isDragging }: DraggableChildrenParams) => React.ReactNode;
    initialData?: Record<string, unknown>;
    preview?: React.ReactNode;
    params?: {
        onDragStart?: () => void;
        onDrop?: () => void;
    };
}
export declare const Draggable: import("react").NamedExoticComponent<DroppableItemProps>;
export {};
