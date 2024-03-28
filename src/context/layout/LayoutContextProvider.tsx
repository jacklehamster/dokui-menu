import React, { ReactNode, useContext } from 'react';
import { DEFAULT_GAME_CONTEXT, LayoutContextType } from './LayoutContext';
import { useInitLayoutContext } from './useInitLayoutContext';

interface Props {
  children: ReactNode;
}

const Context = React.createContext<LayoutContextType>(DEFAULT_GAME_CONTEXT);
const LayoutContextProvider: React.FC<Props> = ({ children }: Props) => {
  const context = useInitLayoutContext();
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useDialogContext must be used within a Provider');
  }
  return context;
};

export { LayoutContextProvider };
