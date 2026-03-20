import { lazy } from "react";

export const componentRegistry: Record<
  string,
  React.LazyExoticComponent<any>
> = {
  Card: lazy(() => import("../cards/Card")),
  Modal: lazy(() => import("./modals/Modal")),
  InfoPanel: lazy(() => import("./InfoPanel")),
};
