import { useEffect, useMemo, useRef, useState } from 'react';
import { Popup } from '../common/popup/Popup';
import { PromptModel } from './model/PromptModel';
import { useControlContext } from '@/context/controls/ControlContextProvider';
import { useControls } from '@/controls/useControls';
import { useActiveFocus } from '@/common/popup/useActiveFocus';
import { useRemove } from '@/dialog/useRemove';

export interface Props {
  prompt: PromptModel;
  onClose(): void;
}

export function Prompt({ prompt, onClose }: Props): JSX.Element {
  const [text, setText] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const { active } = useActiveFocus();
  const { removed, remove } = useRemove();

  const { lockState, popupControl } = useControls({
    active,
    listener: useMemo(() => ({
      //  to be filled
      onBack() {
        remove(onClose);
      },
    }), [remove, onClose]),
  });

  useEffect(() => {
    if (inputFocus) {
      popupControl.deactivate();
      return () => popupControl.activate();  
    }
  }, [popupControl, inputFocus]);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const onFocus = () => {
        setInputFocus(true);
        window.getSelection()?.selectAllChildren(input);
      };
      const onBlur = () => {
        setInputFocus(false);
      };
      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
    }
  }, [inputRef.current, setInputFocus]);

  const alphabet = useMemo(() => {
    return "abcdefghijklmnopqrstuvwxyz._-#0123456789".split("");
  }, []);

  return (
    <>
      <Popup
        layout={prompt.layout ?? {}}
        style={prompt.style}
        removed={removed}
        fit
      >
        <div style={{
          margin: 5,
        }}>{prompt.label}</div>
        <div style={{
          padding: 5,
        }}>
          <div ref={inputRef} 
          autoCorrect='off' autoCapitalize='off' spellCheck='false'
          style={{
            color: "white",
            backgroundColor: "black",
            fontSize: 20,
            border: "2px solid white",
            borderRadius: "5px",
            padding: 10,
            cursor: "text",
          }} onKeyDown={e => {
            if (e.code === "Enter") {
              e.currentTarget.blur();
            }
          }} contentEditable={true} onInput={e => setText(e.currentTarget.textContent ?? "")}>
          </div>
        </div>
        <div>
          <div style={{
            margin: 5, display: "grid",
            gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto"
          }}>
            {alphabet.map((letter, index) => <div key={index} style={{
              outline: "1px solid DimGray",
              textAlign: 'center',
              padding: 3,
            }}>{letter}</div>)}
          </div>
        <div style={{
            margin: 5, display: "flex", gap: 10,
        }}>
          <div style={{
              padding: "0px 5px",
              outline: "1px solid DimGray",
          }}>🌐</div>
          <div style={{
              padding: "0px 5px",
              outline: "1px solid DimGray",
          }}>Aa</div>
          <div style={{
              padding: "0px 5px",
              outline: "1px solid DimGray",
              flexGrow: 1,
              textAlign: "center",
          }}>space</div>
          <div style={{
              padding: "0px 20px",
              outline: "1px solid DimGray",
          }}>Confirm</div>
        </div>
        </div>
      </Popup>
    </>
  );
}
