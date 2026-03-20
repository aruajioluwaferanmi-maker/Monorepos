import React, { Suspense } from "react";
import { componentRegistry } from "./registry";

interface DynamicRendererProps {
  componentName: string;
  props?: any;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  componentName,
  props,
}) => {
  const Component = componentRegistry[componentName];

  if (!Component) {
    return (
      <div className="bg-red-100 text-red-600 p-4 rounded-lg">
        Component "{componentName}" not found in registry.
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="bg-gray-100 p-4 rounded-lg animate-pulse">
          Loading component...
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default DynamicRenderer;
