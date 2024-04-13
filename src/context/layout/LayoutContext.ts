import { UniqueLayoutWithCallback } from "unique-layout";
import { Layout, LayoutModel } from "../../common/layout/Layout";

export interface LayoutContextType {
  getLayout(layout: Layout): LayoutModel | undefined;
  uniqueLayout: UniqueLayoutWithCallback;
}

export const DEFAULT_GAME_CONTEXT: LayoutContextType = {
  getLayout: layout => typeof (layout) === "object" ? layout : undefined,
  uniqueLayout: new UniqueLayoutWithCallback(),
};
