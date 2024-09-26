# pragmatic-dnd-helpers

React helpers for Pragmatic Drag and Drop

## Droppable Component

The `Droppable` component is a React component designed to facilitate drag-and-drop interactions using the Atlaskit pragmatic drag-and-drop library. It provides a simple interface to handle drag events within a specified droppable area.

## Usage

```jsx
import React from "react";
import { Droppable } from "./path/to/Droppable";

function MyComponent() {
  return (
    <Droppable
      params={{
        onDragEnter: () => console.log("Drag entered"),
        onDragLeave: () => console.log("Drag left"),
        onDrop: () => console.log("Dropped"),
        canDrop: (args) => {
          // Optional custom logic for determining if drop is allowed
          return true;
        },
      }}
      data={{ key: "value" }} // Optional data to associate with the droppable area
    >
      {({ isDraggedOver, droppableRef }) => (
        <div
          ref={droppableRef}
          style={{
            backgroundColor: isDraggedOver ? "lightblue" : "white",
            border: "1px solid black",
            padding: "20px",
          }}
        >
          Drop items here
        </div>
      )}
    </Droppable>
  );
}
```

## Draggable

```jsx
import React from "react";
import { Draggable } from "./path/to/draggable";

const App = () => {
  return (
    <Draggable
      initialData={{ id: 1 }}
      preview={<div>Dragging...</div>}
      params={{
        onDragStart: () => console.log("Drag started"),
        onDrop: () => console.log("Dropped"),
      }}
    >
      {({ isDragging }) => <div style={{ opacity: isDragging ? 0.5 : 1 }}>Drag me!</div>}
    </Draggable>
  );
};

export default App;
```

## useDragMonitor

Hook that accepts a monitorArgs, such as onDrop to control the drag and drop state.

```jsx
import React, { useCallback } from "react";
import { useDragMonitor } from "./path/to/lib";
import { ElementDragType } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";

const App = () => {
  const handleDrop = useCallback((args: ElementDragType) => {
    console.log("Dropped", args);
  }, []);

  useDragMonitor({
    onDrop: handleDrop,
  });

  return (
    <div>
      <p>Drag items on this page to see console logs for drag and drop events.</p>
    </div>
  );
};

export default App;
```
