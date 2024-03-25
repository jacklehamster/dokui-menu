import { renderHook, act } from "@testing-library/react-hooks";
import { useMenu } from "./useMenu";

const mockItems = [
  { id: 1, label: "Item 1" },
  { id: 2, label: "Item 2" },
];

describe("useMenu hook", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useMenu({ items: mockItems, onSelect: jest.fn(), onClose: jest.fn() }));

    expect(result.current.selectedItem).toBeUndefined();
    expect(result.current.disabled).toBeFalsy();
    expect(result.current.menuHoverEnabled).toBeFalsy();
  });

  it("should select an item", () => {
    const onSelect = jest.fn();
    const { result } = renderHook(() => useMenu({ items: mockItems, onSelect, onClose: jest.fn() }));

    act(() => {
      result.current.select(0);
    });

    expect(result.current.selectedItem).toEqual(mockItems[0]);
    expect(onSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it("should handle menu actions", () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const { result } = renderHook(() => useMenu({ items: mockItems, onSelect, onClose }));

    act(() => {
      result.current.onMenuAction(1);
    });

    expect(onSelect).toHaveBeenCalledWith(mockItems[1]);
    expect(onClose).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
