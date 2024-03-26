import { useCallback, useMemo } from "react";
import { LayoutContextType } from "./LayoutContext";
import { Layout, LayoutModel } from "../../common/layout/Layout";
import { UniqueLayoutWithCallback } from "unique-layout";

export function useInitLayoutContext() {
  const layoutModels = useMemo<Record<string, LayoutModel>>(() => ({}), []);
  const registerLayout = useCallback((layout: LayoutModel | LayoutModel[]) => {
    const layouts = Array.isArray(layout) ? layout : [layout];
    layouts.forEach(layout => {
      if (layout.name) {
        layoutModels[layout.name] = layout;
      }
    });
  }, [layoutModels]);
  const getLayout = useCallback((layout: Layout) => {
    if (typeof layout === "string") {
      return layoutModels[layout];
    }
    if (layout.name) {
      layoutModels[layout.name] = layout;
    }
    return layout;
  }, [layoutModels]);
  const uniqueLayout = useMemo(() => new UniqueLayoutWithCallback(), []);

  const context: LayoutContextType = useMemo(() => ({
    getLayout,
    uniqueLayout,
  }), [getLayout, uniqueLayout]);

  return { context, registerLayout };
}
