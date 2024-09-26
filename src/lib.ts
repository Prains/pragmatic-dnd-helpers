import type {
  ElementDragType,
  MonitorArgs,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";

export const useDragMonitor = (args: MonitorArgs<ElementDragType>) =>
  useEffect(() => {
    return monitorForElements(args);
  }, [args]);
