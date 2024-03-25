import { useCallback, useMemo, useState } from "react";
import { ControlContextType } from "./ControlContext";
import { PopupControl } from "../../controls/PopupControl";

interface Props {
  popupControl: PopupControl;
}

export function useInitControlContext({ popupControl }: Props) {
  const [controlsLocks, setControlsLocks] = useState<string[]>([]);
  const setControlsLock = useCallback((uid: string) => {
    if (uid) {
      setControlsLocks(uids => [...uids, uid]);
    }
  }, [setControlsLocks]);

  const removeControlsLock = useCallback((uid: string) => {
    setControlsLocks(oldUids => {
      return oldUids[oldUids.length - 1] === uid ? oldUids.slice(0, oldUids.length - 1) : oldUids;
    });
  }, [setControlsLocks]);

  const context: ControlContextType = useMemo(() => ({
    popupControl,
    controlsLock: controlsLocks[controlsLocks.length - 1],
    setControlsLock,
    removeControlsLock,
  }), [popupControl, controlsLocks.length, setControlsLock, removeControlsLock]);

  return context;
}
