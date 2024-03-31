import React, { ReactNode, useContext } from 'react';
import { DEFAULT_EDIT_CONTEXT, EditContextType } from './EditContext';
import { useEditControlContext } from './useInitEditContext';
import { EditToggle } from '@/context/edit/EditToggle';

interface Props {
  children: ReactNode;
}

const Context = React.createContext<EditContextType>(DEFAULT_EDIT_CONTEXT);
const EditContextProvider: React.FC<Props> = ({ children }: Props) => {
  const context = useEditControlContext();
  return <Context.Provider value={context}>
    <EditToggle />
    {children}
  </Context.Provider>;
};

export const useEditContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useEditContext must be used within a Provider');
  }
  return context;
};

export { EditContextProvider };
