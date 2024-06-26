import { useCallback, useMemo } from 'react';
import { PromptModel } from './model/PromptModel';
import { Label } from './components/Label';
import { Button } from './components/Button';
import { useLanguageModel } from './lang/useLanguageModel';
import { useAlphabet } from './lang/useAlphabet';
import { useTextInput } from './lang/useTextInput';
import { useInputFocus } from './control/useInputFocus';
import { ActionButton, usePromptControl } from './control/usePromptControl';
import { Popup } from '@dobuki/react-popup';
import { BlinkUnderline } from './components/BlinkUnderline';

export interface Props {
  prompt: PromptModel;
  onConfirm(text: string): void;
  onClose(): void;
}
const COLUMNS = 10;

const GRID_TEMPLATE_COLUMN = new Array(COLUMNS).fill("auto").join(" ");

export function Prompt({ prompt, onConfirm, onClose }: Props): JSX.Element {
  const { currentLanguageModel, chooseLanguage } = useLanguageModel({ languages: prompt.languages });
  const { alphabet, setCapitalize } = useAlphabet({ languageModel: currentLanguageModel });
  const { addLetter, deleteLetter, randomizeText, text, setText } = useTextInput({ defaultText: prompt.defaultText, randomList: prompt.randomText });
  const { inputFocus, inputRef, focus } = useInputFocus({ text });
  const { disabled, removed, enableMouseHover, mouseHoverEnabled, position, setPosition, actionButtonSelected, onAction } = usePromptControl({
    alphabet,
    text,
    onClose,
    addLetter,
    deleteLetter,
    randomizeText,
    toggleCapitalize: useCallback(() => setCapitalize(cap => !cap), [setCapitalize]),
    chooseLanguage,
    onConfirm: prompt.input ?? onConfirm,
    randomList: prompt.randomText,
    inputFocus,
    canCapitalize: currentLanguageModel.capitalize,
    focus,
  });

  const clickable = useMemo(() => !disabled && mouseHoverEnabled, [disabled, mouseHoverEnabled]);

  return (
    <>
      <Popup
        layout={prompt.layout ?? {}}
        style={prompt.style}
        removed={removed}
        disabled={disabled}
        onBack={onClose}
        fit
      >
        <div style={{ padding: 5 }}>
          <Label label={prompt.label} />
          <div style={{ padding: 5, display: "flex" }}>
            <div autoCorrect='off' autoCapitalize='off' spellCheck='false'
                style={{
                  flex: 1,
                  color: "white",
                  backgroundColor: "black",
                  fontSize: 20,
                  border: "2px solid white",
                  borderRadius: "5px",
                  padding: 10,
                  cursor: "text",
                  minHeight: 25,
                }}
                onClick={() => focus()}>
              <div ref={inputRef} contentEditable
                style={{ width: "100%", display: "inline" }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    e.preventDefault();
                  }
                }}
                onKeyUp={({ code, currentTarget }) => {
                  if (code === "Escape") {
                    currentTarget.blur();
                  } else if (code === "Enter") {
                    currentTarget.blur();
                    setPosition([COLUMNS - 1, 4]);
                  }
                }}
                onInput={({ currentTarget }) => setText(currentTarget.textContent ?? undefined)} 
              />
              {!inputFocus && <BlinkUnderline />}
            </div>
            {prompt.randomText ? <Button hideOutline selected={!inputFocus && actionButtonSelected===ActionButton.RANDOM}
              padding={5} margin={5} emoji='🎲'
              disabled={inputFocus}
              onMouseOver={() => {
                setPosition([COLUMNS - 1, -1]);
              }}
              onMouseDown={() => {
                setPosition([COLUMNS - 1, -1]);
              }}
              onClick={onAction}
            /> : undefined}
          </div>
          <div style={{
            pointerEvents: inputFocus ? "none" : undefined,
            opacity: inputFocus ? .3 : 1,
            transition: "opacity .3s",
            cursor: clickable ? "inherit" : "auto",
          }} onMouseMove={() => {
            if (!disabled) {
              enableMouseHover();
            }
          }}>
            <div>
              <div style={{
                margin: 5, display: "grid",
                gridTemplateColumns: GRID_TEMPLATE_COLUMN,
              }}>
                {alphabet.map((letter, index) => {
                  return <Button key={index} selected={!inputFocus && Math.floor(index / COLUMNS) === position[1] && index % COLUMNS === position[0]} 
                    padding={3}
                    text={letter}
                    onMouseOver={() => {
                      if (mouseHoverEnabled) {
                        setPosition([index % COLUMNS, Math.floor(index / COLUMNS)]);
                      }
                    }}
                    onMouseDown={() => {
                      if (mouseHoverEnabled) {
                        setPosition([index % COLUMNS, Math.floor(index / COLUMNS)]);
                      }
                    }}
                    onClick={onAction}
                    />
                })}
              </div>
              <div style={{ margin: 5, display: "flex", gap: 10 }}>
                {prompt.languages && <Button selected={!inputFocus && actionButtonSelected===ActionButton.LANG} 
                  padding="0px 5px"
                  emoji='🌐'
                  onMouseOver={() => {
                    if (mouseHoverEnabled) {
                      setPosition([0, 4]);
                    }
                  }}
                  onMouseDown={() => {
                    if (mouseHoverEnabled) {
                      setPosition([0, 4]);
                    }
                  }}
                  onClick={onAction}
                  />}
                {currentLanguageModel.capitalize && <Button selected={!inputFocus && actionButtonSelected===ActionButton.CAP} 
                  padding="0px 5px"
                  text="Aa"
                  onMouseOver={() => {
                    if (mouseHoverEnabled) {
                      setPosition([1, 4]);
                    }
                  }}
                  onMouseDown={() => {
                    if (mouseHoverEnabled) {
                      setPosition([1, 4]);
                    }
                  }}
                  onClick={onAction}
                  />}
                <Button selected={!inputFocus && actionButtonSelected===ActionButton.SPACE} 
                  padding="0px 10px"
                  stretch
                  text="space"
                  onMouseOver={() => {
                    if (mouseHoverEnabled) {
                      setPosition([5, 4]);
                    }
                  }}
                  onMouseDown={() => {
                    if (mouseHoverEnabled) {
                      setPosition([5, 4]);
                    }
                  }}
                  onClick={onAction}
                  />
                <Button selected={!inputFocus && actionButtonSelected===ActionButton.DEL} 
                  padding="0px 10px"
                  text="del"
                  disabled={!text?.length}
                  onMouseOver={() => {
                    if (mouseHoverEnabled && text?.length) {
                      setPosition([COLUMNS - 2, 4]);
                    }
                  }}
                  onMouseDown={() => {
                    if (mouseHoverEnabled && text?.length) {
                      setPosition([COLUMNS - 2, 4]);
                    }
                  }}
                  onClick={onAction}
                  />
                <Button selected={!inputFocus && actionButtonSelected===ActionButton.OK} 
                  padding="0px 20px"
                  text="ok"
                  disabled={!text?.length}
                  onMouseOver={() => {
                    if (mouseHoverEnabled && text?.length) {
                      setPosition([COLUMNS - 1, 4]);
                    }
                  }}
                  onMouseDown={() => {
                    if (mouseHoverEnabled && text?.length) {
                      setPosition([COLUMNS - 1, 4]);
                    }
                  }}
                  onClick={onAction}
                  />
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
