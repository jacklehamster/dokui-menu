import { forEach, List } from "abstract-list";
import { LayoutModel } from "./Layout";
import { useLayoutContext } from "@/context/layout/LayoutContextProvider";
import { useEffect } from "react";

interface Props {
  layouts?: List<LayoutModel>;
}

export function useLayoutRegistry({ layouts }: Props) {
  const { getLayout } = useLayoutContext();
  useEffect(() => {
    forEach(layouts, layout => {
      if (layout) {
        getLayout(layout);
      }
    });
  }, [layouts, useLayoutContext]);
}
