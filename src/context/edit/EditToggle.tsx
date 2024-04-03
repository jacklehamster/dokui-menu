import { useEditContext } from "../../context/edit/EditContextProvider";

export function EditToggle() {
  const {editing, toggleEditing} = useEditContext();

  return <button style={{
      position: "absolute",
      top: 0,
      right: 0,
      cursor: "pointer",
      zIndex: 1000,
      padding: "5px 15px",
      backgroundColor: editing ? "#cceeff" : undefined,
    }}
    onClick={() => toggleEditing()}>
      {editing ? "EDIT ON" : "EDIT OFF"}
  </button>
}
