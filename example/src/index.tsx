// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { KeyboardControl, openDialog } from "dokui-menu";
import { openMenu } from "dokui-menu"

export function showMenu() {
  const { popupControl } = openMenu({
    dialog: {
      messages: [
        "hello",
        "there",
      ],
    },
    menu: {
      disableBack: true,
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
        },
        {
          label: "dialog",
          dialog: {
            layout: {
              name: "main",
              position: [150, 100],
              size: [200, 200],
            },
            messages: [
              "Hello",
              {
                text: "How are you?",
                menu: {
                  layout: {
                    position: [150, 300],
                    size: [300, 200],
                  },
                  items: [
                    { label: "I don't know",
                      dialog: {
                        layout: {
                          position: [250, 200],
                          size: [300, 100],      
                        },
                        messages: ["you should know"],
                      } 
                    },
                    { label: "good", back: true,
                      dialog: {
                        layout: {
                          position: [250, 200],
                          size: [300, 100],      
                        },
                        messages: ["That's good to know."],
                      } 
                    },
                    { label: "bad", back: true },
                  ],
                },
              },
              "Bye",
            ],
          },
        },
        {
          label: "dialog without closing menu",
          dialog: {
            layout: {
              position: [150, 100],
              size: [200, 200],
            },
            messages: [
              "test dialog",
            ],
          },
        },
        {
          label: "hidden on select",
          hideOnSelect: true,
          dialog: {
            layout: {
              position: [150, 100],
              size: [200, 200],
            },
            messages: [
              "menu hidden",
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
