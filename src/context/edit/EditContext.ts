export interface EditContextType {
  editing: boolean;
  toggleEditing(): void;
}

export const DEFAULT_EDIT_CONTEXT: EditContextType = {
  editing: false,
  toggleEditing() {
  },
};
