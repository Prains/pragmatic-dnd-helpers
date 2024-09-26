import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";
export const useDragMonitor = (args) => useEffect(() => {
    return monitorForElements(args);
}, [args]);
