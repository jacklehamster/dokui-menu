import { useEffect, useState } from "react";
import { MessageModel } from "./model/MessageModel";

interface Props {
  message?: MessageModel;
}

export function useHideMessage({ message }: Props) {
  const [visible, setVisible] = useState(true);
  const [messageHidden, setMessageHidden] = useState(false);

  useEffect(() => {
    if (!visible) {
      setMessageHidden(true);
    }
  }, [visible, setMessageHidden]);

  useEffect(() => {
    setMessageHidden(false);
  }, [message, setMessageHidden]);

  return { visible: visible && !messageHidden, setVisible };
}
