// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { KeyboardControl } from "dokui-menu";
import { openMenu } from "dokui-menu"

export function showMenu() {
  const { popupControl } = openMenu({
    menu: {
      layout: {
        name: "main",
      },
      items: [
        "first",
        "second",
        {
          label: "third",
          submenu: {
            maxRows: 3,
            layout: {
              position: [150, 100],
              size: [200, 130],
            },
            items: [
              "3.1",
              "3.2",
              "3.3",
              "3.4",
              "------",
              {
                label: "exit",
                back: true,
              },
            ],
          },
        },
        {
          label: "fourth",
          submenu: {
            layout: {
              name: "main",
              position: [150, 100],
              size: [200, 200],
            },
            items: [
              "a",
              "b",
              "c",
              {
                label: "exit",
                back: true,
              },
            ],
          },
        }
      ],
    },
    onSelect(item) {
      console.log(item);
    },
  });
  return { keyboard: new KeyboardControl(popupControl) };
}
