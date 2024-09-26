import { jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";
export const Draggable = memo(({ children, initialData, params, preview }) => {
    const draggableRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [state, setState] = useState({ type: "idle" });
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
    return (_jsxs("div", { ref: draggableRef, children: [children({ isDragging: dragging }), state.type === "preview" && preview ? createPortal(preview, state.container) : null] }));
});
Draggable.displayName = "Draggable";
