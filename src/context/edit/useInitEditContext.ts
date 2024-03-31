import { useMemo, useState } from "react";
import { EditContextType } from "./EditContext";

export function useEditControlContext() {
  const [editing, setEditing] = useState(false);

  const context: EditContextType = useMemo(() => ({
    editing,
    toggleEditing: () => {
      setEditing(editing => !editing);
    },
  }), [editing, setEditing]);

  return context;
}
