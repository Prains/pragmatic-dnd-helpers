import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
export const Droppable = memo(({ children, params, data }) => {
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
    return _jsx(_Fragment, { children: children({ isDraggedOver, droppableRef }) });
});
Droppable.displayName = "Droppable";
