// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { KeyboardControl, openDialog } from "dokui-menu";
import { openMenu } from "dokui-menu"

const sampleSrc = "https://cdn.britannica.com/59/182359-050-C6F38CA3/Scarlett-Johansson-Natasha-Romanoff-Avengers-Age-of.jpg";
const pikaSrc = "https://media.tenor.com/rbx3ph5SLRUAAAAi/pikachu-pokemon.gif";
const byeSrc = "https://images.vexels.com/media/users/3/272491/isolated/preview/d6d58dbb207e59b46ab9e797b32ae014-bye-word-glossy-sign.png";

export function showMenu() {
  const { popupControl } = openMenu({
    dialog: {
      messages: [
        {
          text: "hello",
          pictures: [{
            layout: {
              position: [350,100],
              size: [200, 200],
              positionFromRight: true,
            },
            images: [{ src: pikaSrc }],
          }],    
        },
        "there!",
        {
          text: "bye",
          pictures: [{
            layout: {
              position: [350,100],
              size: [200, 200],
              positionFromRight: true,
            },
            images: [{ src:  byeSrc }],
          }],    
        },
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
            pictures: [{
              layout: {
                position: [350,350],
                size: [300, 300],
                positionFromBottom: true,
                positionFromRight: true,
              },
              images: [
                {
                  src: sampleSrc,
                },
              ],
            }],
        
            layout: {
              position: [150, 100],
              size: [200, 150],
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
            pictures: [{
              layout: {
                position: [350,350],
                size: [300, 300],
                positionFromBottom: true,
                positionFromRight: true,
              },
              images: [{ src: sampleSrc }],
            }],      
            layout: {
              name: "main",
              position: [150, 100],
              size: [400, 180],
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
              size: [300, 200],
            },
            messages: [
              "menu hidden",
            ],
          },
        },
        {
          label: "prompt",
          prompt: {
            layout: {
              position: [150, 100],
              size: [600, 300],
            },
            label: "What is your name?",
            defaultText: "Name",
            randomText: [
              "Alis",
              "Bryan",
              "Carlos",
              "David",
              "Emily",
            ],
            languages: ["english", "korean"],
          },
        },
        {
          label: "simpler prompt",
          prompt: {
          },
        },
      ],
    },
    onSelect(item) {
      console.log(item);
    },
  });
  return { keyboard: new KeyboardControl(popupControl) };
}
